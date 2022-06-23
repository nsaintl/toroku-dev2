import React from 'react';
import TextInput from "../components/form/TextInput";
import Submit from "../components/form/Submit";
import TextArea from "../components/form/TextArea";
import {tabsLanguages, initTabsObject} from "../Constant";
import {t} from "i18next";
import {useNavigate} from "react-router-dom";
import {
    getGroupList,
    getPermissions,
    goToSignIn,
    removeModal,
    submitModal
} from "../App";
import TagItem from "../components/items/TagItem";
import SideBar from "../components/SideBar";
import {searchTags} from "../graphql/queries";
import {createTag, deleteTag, updateTag} from "../graphql/mutations";
import Bottom from "../components/form/Bottom";
import CheckBox from "../components/form/CheckBox";
import {LoadElements, RemoveElement, submitVerification} from "../controller/FormController";

export default function Tag() {

    const tag = React.useRef(null);
    const name = React.useRef(initTabsObject(tabsLanguages));
    const description = React.useRef(initTabsObject(tabsLanguages));

    const translate = t("Tag", { returnObjects: true});
    const navigate = useNavigate();

    const groupList = React.useRef([]);
    const user = React.useRef({});

    React.useEffect(() => {

        getGroupList().then((r) => {
            groupList.current = r["groupList"];
            user.current = r["user"];
            if(groupList.current === undefined) {
                goToSignIn(navigate).then(() => {});
            } else {
                setUpdate(!update);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const refSideBar = React.useRef();

    const searchElement = async () => {
        refSideBar.current.setNextToken(undefined);
        await loadElements([]);
    }

    const loadElements = async (content) => {

        const search = refSideBar.current.getSearch();
        const isDeployed = refSideBar.current.getIsDeployed();
        await LoadElements(
            content,
            refSideBar.current,
            {
                or: search === "" ? undefined : [
                    {nameFrench: {matchPhrasePrefix: search}},
                    {nameEnglish: {matchPhrasePrefix: search}}
                ],
                isDeployed: {eq: isDeployed},
            },
            {
                direction: "asc",
                field: "nameFrench"
            },
            searchTags,
            "searchTags");
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if(name.current["french"] === "" && name.current["english"] === "") return;
        submitModal(async () => {

            await submitVerification(
                user.current,
                groupList.current,
                tag.current,
                deployed.current,
                navigate,
                {
                    nameFrench: name.current["french"],
                    nameEnglish: name.current["english"],
                    descriptionFrench: description.current["french"],
                    descriptionEnglish: description.current["english"],
                },
                createTag,
                updateTag,
                "createTag",
                "updateTag");
        });
        loadElement(null);
    };

    const removeElement = () => {
        removeModal(async () => {
            await RemoveElement(tag.current, loadElement, deleteTag);
        });
    }

    const loadElement = (newElement) => {
        if(newElement === null || (tag.current !== null && tag.current.id === newElement.id)) {
            tag.current = null;
            deployed.current = false;
            name.current = initTabsObject(tabsLanguages);
            description.current = initTabsObject(tabsLanguages);
        } else {
            tag.current = newElement;
            deployed.current = newElement.isDeployed;
            name.current = initTabsObject(tabsLanguages);
            name.current["french"] = newElement.nameFrench;
            name.current["english"] = newElement.nameEnglish;
            description.current = initTabsObject(tabsLanguages);
            description.current["french"] = newElement.descriptionFrench;
            description.current["english"] = newElement.descriptionEnglish;
        }
        setUpdate(!update);
    }

    const render = (props) => {
        return (
            <TagItem
                key={props.key}
                element={props.element}
                onClick={props.onClick}
                selectedElement={props.selectedElement}/>
        );
    }

    const deployed = React.useRef(false);
    const [update, setUpdate] = React.useState(true);

    const permissions = getPermissions(groupList.current, tag.current);

    return (
        <div className={"page"}>
            <SideBar
                ref={refSideBar}
                onSearch={searchElement}
                loadMore={loadElements}
                onClick={loadElement}
                selectedElement={tag.current}
                renderItem={render}/>
            <div className="background">
                <form onSubmit={handleSubmit}>
                    <TextInput
                        disabled={!permissions["canEdit"]}
                        reset={update}
                        hasTabs
                        initialValue={name.current}
                        placeholder={translate["ExampleName"]}
                        label={translate["Name"]}
                        onChange={(text) => name.current = text}/>
                    <TextArea
                        disabled={!permissions["canEdit"]}
                        reset={update}
                        hasTabs
                        initialValue={description.current}
                        placeholder={translate["ExampleDescription"]}
                        label={translate["Description"]}
                        onChange={(text) => description.current = text}/>
                    {
                        permissions["isLeader"] ?
                            <CheckBox
                                reset={update}
                                label={translate["Deployed"]}
                                initialValue={deployed.current}
                                onChange={(value) => deployed.current = value}/> : null
                    }
                    <Submit
                        disabled={!permissions["canEdit"]}
                        name={translate["Submit"]}
                        onDelete={removeElement}
                        canDelete={permissions["isLeader"] && tag.current !== null}/>
                </form>
                <Bottom element={tag.current}/>
            </div>
        </div>
    );
}