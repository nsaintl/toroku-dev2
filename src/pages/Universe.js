import React from 'react';
import TextInput from "../components/form/TextInput";
import Submit from "../components/form/Submit";
import {
    getGroupList, getPermissions,
    goToSignIn,
    removeModal,
    submitModal
} from "../App";
import {searchUniverses} from "../graphql/queries";
import {createUniverse, deleteUniverse, updateUniverse} from "../graphql/mutations";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";
import CheckBox from "../components/form/CheckBox";
import {t} from "i18next";
import Bottom from "../components/form/Bottom";
import UniverseItem from "../components/items/UniverseItem";
import {LoadElements, RemoveElement, submitVerification} from "../controller/FormController";

export default function Universe() {

    const universe = React.useRef(null);
    const name = React.useRef("");

    const translate = t("Universe", { returnObjects: true});
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
                name: search === "" ? undefined : {matchPhrasePrefix: search},
                isDeployed: {eq: isDeployed}
            },
            {
                direction: "asc",
                field: "name"
            },
            searchUniverses,
            "searchUniverses");
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if(name.current === "") return;
        submitModal(async () => {

            await submitVerification(
                user.current,
                groupList.current,
                universe.current,
                deployed.current,
                navigate,
                {
                    name: name.current
                },
                createUniverse,
                updateUniverse,
                "createUniverse",
                "updateUniverse");
            loadElement(null);
        });
    };

    const removeElement = () => {
        removeModal(async () => {
            await RemoveElement(universe.current, loadElement, deleteUniverse);
        });
    }

    const loadElement = (newElement) => {
        if(newElement === null || (universe.current !== null && universe.current.id === newElement.id)) {
            universe.current = null;
            deployed.current = false;
            name.current = "";
        } else {
            universe.current = newElement;
            deployed.current = newElement.isDeployed;
            name.current = newElement.name;
        }
        setUpdate(!update);
    }

    const renderElement = (props) => {
        return (
            <UniverseItem
                key={props.key}
                element={props.element}
                onClick={props.onClick}
                selectedElement={props.selectedElement}/>
        );
    }

    const deployed = React.useRef(false);
    const [update, setUpdate] = React.useState(true);

    const permissions = getPermissions(groupList.current, universe.current);

    return (
        <div className={"page"}>
            <SideBar
                ref={refSideBar}
                onSearch={searchElement}
                loadMore={loadElements}
                onClick={loadElement}
                selectedElement={universe.current}
                renderItem={renderElement}/>
            <div className="background">
                <form onSubmit={handleSubmit}>
                    <TextInput
                        disabled={!permissions["canEdit"]}
                        reset={update}
                        initialValue={name.current}
                        placeholder={"Shingeki no Kyojin"}
                        label={translate["Name"]}
                        onChange={(text) => name.current = text}/>
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
                        canDelete={permissions["isLeader"] && universe.current !== null}/>
                </form>
                <Bottom element={universe.current}/>
            </div>
        </div>
    );
}