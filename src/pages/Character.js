import React from 'react';
import TextInput from "../components/form/TextInput";
import Submit from "../components/form/Submit";
import {genderList, initTabsObject, tabsLanguages} from "../Constant";
import ComboBox from "../components/form/ComboBox";
import TextArea from "../components/form/TextArea";
import Image from "../components/form/Image";
import {useNavigate} from "react-router-dom";
import {
    getGroupList, getPermissions,
    goToSignIn, isUrl,
    removeModal,
    submitModal
} from "../App";
import {t} from "i18next";
import {searchCharacters} from "../graphql/queries";
import {createCharacter, deleteCharacter, updateCharacter} from "../graphql/mutations";
import SideBar from "../components/SideBar";
import CheckBox from "../components/form/CheckBox";
import Bottom from "../components/form/Bottom";
import {LoadElements, RemoveElement, submitVerification} from "../controller/FormController";
import {deleteImage, getImage, uploadImage} from "../controller/ImageController";
import CharacterItem from "../components/items/CharacterItem";

export default function Character() {

    const character = React.useRef(null);
    const name = React.useRef("");
    const gender = React.useRef(genderList[0].key);
    const age = React.useRef(initTabsObject(tabsLanguages));
    const description = React.useRef(initTabsObject(tabsLanguages));
    const image = React.useRef(null);

    const translate = t("Character", { returnObjects: true});
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
            searchCharacters,
            "searchCharacters");
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if(name.current === "") return;
        submitModal(async () => {

            const id = await submitVerification(
                user.current,
                groupList.current,
                character.current,
                deployed.current,
                navigate,
                {
                    name: name.current,
                    ageFrench: age.current["french"],
                    ageEnglish: age.current["english"],
                    descriptionFrench: description.current["french"],
                    descriptionEnglish: description.current["english"],
                    gender: gender.current === "UNDEFINED" ? null : gender.current,
                    hasImage: image.current !== null || isUrl(image.current),
                },
                createCharacter,
                updateCharacter,
                "createCharacter",
                "updateCharacter");
            if(id !== null && !isUrl(image.current)) {
                if(image.current === null) {

                    if(character.current !== null)
                        await removeImages();
                } else {

                    await uploadImage(image.current, "character/" + id + "/image-low.webp", 100, 100);
                    await uploadImage(image.current, "character/" + id + "/image-medium.webp", 300, 300);
                    await uploadImage(image.current, "character/" + id + "/image-high.webp", 800, 800);
                }
            }
            loadElement(null).then(() => {});
        });
    };

    const removeImages = async () => {
        await deleteImage("character/" + character.current.id + "/image-low.webp");
        await deleteImage("character/" + character.current.id + "/image-medium.webp");
        await deleteImage("character/" + character.current.id + "/image-high.webp");
        await deleteImage("character/" + character.current.id);
    }

    const removeElement = async () => {
        await removeImages();
        removeModal(async () => {
            await RemoveElement(character.current, loadElement, deleteCharacter);
        });
    }

    const loadElement = async (newElement) => {
        if(newElement === null || (character.current !== null && character.current.id === newElement.id)) {
            character.current = null;
            deployed.current = false;
            name.current = "";
            gender.current = genderList[0].key;
            age.current = initTabsObject(tabsLanguages);
            description.current = initTabsObject(tabsLanguages);
            image.current = null;
        } else {
            character.current = newElement;
            deployed.current = newElement.isDeployed;
            name.current = newElement.name;
            gender.current = newElement.gender === null ? "UNDEFINED" : newElement.gender;
            age.current = initTabsObject(tabsLanguages);
            age.current["french"] = newElement.ageFrench;
            age.current["english"] = newElement.ageEnglish;
            description.current = initTabsObject(tabsLanguages);
            description.current["french"] = newElement.descriptionFrench;
            description.current["english"] = newElement.descriptionEnglish;
            image.current = newElement.hasImage ? await getImage("character/" + newElement.id + "/image-medium.webp") : null;
        }
        setUpdate(!update);
    }

    const renderElement = (props) => {
        return (
            <CharacterItem
                key={props.key}
                element={props.element}
                onClick={props.onClick}
                selectedElement={props.selectedElement}/>
        );
    }

    const deployed = React.useRef(false);
    const [update, setUpdate] = React.useState(true);

    const permissions = getPermissions(groupList.current, character.current);

    return (
        <div className={"page"}>
            <SideBar
                ref={refSideBar}
                onSearch={searchElement}
                loadMore={loadElements}
                onClick={loadElement}
                selectedElement={character.current}
                renderItem={renderElement}/>
            <div className="background">
                <form onSubmit={handleSubmit}>
                    <TextInput
                        disabled={!permissions["canEdit"]}
                        reset={update}
                        initialValue={name.current}
                        placeholder={"Faye Valentine"}
                        label={translate["Name"]}
                        onChange={(text) => name.current = text}/>
                    <ComboBox
                        disabled={!permissions["canEdit"]}
                        reset={update}
                        initialValue={gender.current}
                        label={translate["Gender"]}
                        onChange={(text) => {
                            gender.current = text
                        }}
                        choices={genderList}/>
                    <TextArea
                        disabled={!permissions["canEdit"]}
                        reset={update}
                        hasTabs
                        initialValue={age.current}
                        placeholder={translate["ExampleAge"]}
                        label={translate["Age"]}
                        onChange={(text) => age.current = text}/>
                    <TextArea
                        disabled={!permissions["canEdit"]}
                        reset={update}
                        hasTabs
                        initialValue={description.current}
                        placeholder={translate["ExampleDescription"]}
                        label={translate["Description"]}
                        onChange={(text) => description.current = text}/>
                    <Image
                        disabled={!permissions["canEdit"]}
                        reset={update}
                        initialValue={image.current}
                        label={translate["Image"]}
                        aspectRatio={1}
                        borderRadius={20}
                        onChange={(value) => image.current = value}/>
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
                        canDelete={permissions["isLeader"] && character.current !== null}/>
                </form>
                <Bottom element={character.current}/>
            </div>
        </div>
    );
}