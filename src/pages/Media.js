import React from 'react';
import TextInput from "../components/form/TextInput";
import Submit from "../components/form/Submit";
import TextArea from "../components/form/TextArea";
import {
    tabsLanguages,
    initTabsObject,
    mediaType,
    seasonalAiring,
    isValidDate,
    tabsLanguagesTitle
} from "../Constant";
import Image from "../components/form/Image";
import NumericInput from "../components/form/NumericInput";
import ComboBox from "../components/form/ComboBox";
import DateInput from "../components/form/DateInput";
import YoutubeInput from "../components/form/YoutubeInput";
import CheckBox from "../components/form/CheckBox";
import {useNavigate} from "react-router-dom";
import {getGroupList, getPermissions, goToSignIn, isUrl, removeModal, submitModal} from "../App";
import {LoadElements, RemoveElement, submitVerification} from "../controller/FormController";
import {searchMedia} from "../graphql/queries";
import {
    createMedia,
    deleteMedia,
    updateMedia
} from "../graphql/mutations";
import {deleteImage, getImage, uploadImage} from "../controller/ImageController";
import {t} from "i18next";
import SideBar from "../components/SideBar";
import Bottom from "../components/form/Bottom";
import MediaItem from "../components/items/MediaItem";

export default function Media() {

    const media = React.useRef(null);
    const title = React.useRef(initTabsObject(tabsLanguagesTitle));
    const type = React.useRef(mediaType[0].key);
    const isAdult = React.useRef(false);
    const episode = React.useRef(24);
    const episodeDuration = React.useRef(24);
    const description = React.useRef(initTabsObject(tabsLanguages));
    const seasonal = React.useRef({month: seasonalAiring[0].key, year: null});
    const startDate = React.useRef(null);
    const endDate = React.useRef(null);
    const trailer = React.useRef(null);
    const cover = React.useRef(null);
    const banner = React.useRef(null);

    const translate = t("Media", { returnObjects: true});
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
                    {titleFrench: {matchPhrasePrefix: search}},
                    {titleEnglish: {matchPhrasePrefix: search}},
                    {titleRomaji: {matchPhrasePrefix: search}}
                ],
                isDeployed: {eq: isDeployed}
            },
            {
                direction: "asc",
                field: "titleFrench"
            },
            searchMedia,
            "searchMedia");
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if(title.current["french"] === "" && title.current["english"] === "" && title.current["romaji"] === "") return;
        submitModal(async () => {

            const id = await submitVerification(
                user.current,
                groupList.current,
                media.current,
                deployed.current,
                navigate,
                {
                    titleFrench: title.current["french"],
                    titleEnglish: title.current["english"],
                    titleRomaji: title.current["romaji"],
                    descriptionFrench: description.current["french"],
                    descriptionEnglish: description.current["english"],
                    type: type.current,
                    isAdult: isAdult.current,
                    episode: episode.current,
                    episodeDuration: episodeDuration.current,
                    trendMonth: seasonal.current["month"] === "UNDEFINED" ? null : seasonal.current["month"],
                    trendYear: seasonal.current["year"],
                    startDate: startDate.current,
                    endDate: endDate.current,
                    trailer: trailer.current,
                    hasCover: cover.current !== null || isUrl(cover.current),
                    hasBanner: banner.current !== null || isUrl(banner.current),
                },
                createMedia,
                updateMedia,
                "createMedia",
                "updateMedia");

            if(id !== null && !isUrl(cover.current)) {
                if(cover.current === null) {
                    if(media.current !== null)
                        await removeImages("cover");
                } else {

                    await uploadImage(cover.current, "media/" + id + "/cover-low.webp", 150, 225);
                    await uploadImage(cover.current, "media/" + id + "/cover-medium.webp", 300, 450);
                    await uploadImage(cover.current, "media/" + id + "/cover-high.webp", 600, 900);
                }
            }
            if(id !== null && !isUrl(banner.current)) {
                if(banner.current === null) {
                    if(media.current !== null)
                        await removeImages("banner");
                } else {

                    await uploadImage(banner.current, "media/" + id + "/banner-low.webp", 475, 100);
                    await uploadImage(banner.current, "media/" + id + "/banner-medium.webp", 950, 200);
                    await uploadImage(banner.current, "media/" + id + "/banner-high.webp", 1900, 400);
                }
            }
            loadElement(null).then(() => {});
        });
    };

    const removeImages = async (name) => {
        await deleteImage("media/" + media.current.id + "/" + name + "-low.webp");
        await deleteImage("media/" + media.current.id + "/" + name + "-medium.webp");
        await deleteImage("media/" + media.current.id + "/" + name + "-high.webp");
        await deleteImage("media/" + media.current.id);
    }

    const removeElement = async () => {
        await removeImages("cover");
        await removeImages("banner");
        removeModal(async () => {
            await RemoveElement(media.current, loadElement, deleteMedia);
        });
    }

    const loadElement = async (newElement) => {
        if(newElement === null || (media.current !== null && media.current.id === newElement.id)) {
            media.current = null;
            deployed.current = false;
            title.current = initTabsObject(tabsLanguagesTitle);
            type.current = mediaType[0].key;
            isAdult.current = false;
            episode.current = 24;
            episodeDuration.current = 24;
            description.current = initTabsObject(tabsLanguages);
            seasonal.current = {month: seasonalAiring[0].key, year: null};
            startDate.current = null;
            endDate.current = null;
            trailer.current = null;
            cover.current = null;
            banner.current = null;
        } else {
            media.current = newElement;
            deployed.current = newElement.isDeployed;
            title.current = initTabsObject(tabsLanguagesTitle);
            title.current["french"] = newElement.titleFrench;
            title.current["english"] = newElement.titleEnglish;
            title.current["romaji"] = newElement.titleRomaji;
            type.current = newElement.type;
            isAdult.current = newElement.isAdult;
            episode.current = newElement.episode;
            episodeDuration.current = newElement.episodeDuration;
            seasonal.current = {month: newElement.trendMonth === null ? "UNDEFINED" : newElement.trendMonth, year: newElement.trendYear};
            startDate.current = newElement.startDate === null ? null : new Date(newElement.startDate);
            endDate.current = newElement.endDate === null ? null : new Date(newElement.endDate);
            trailer.current = newElement.trailer;
            description.current = initTabsObject(tabsLanguages);
            description.current["french"] = newElement.descriptionFrench;
            description.current["english"] = newElement.descriptionEnglish;
            cover.current = newElement.hasCover ? await getImage("media/" + newElement.id + "/cover-high.webp") : null;
            banner.current = newElement.hasBanner ? await getImage("media/" + newElement.id + "/banner-high.webp") : null;
        }
        setUpdate(!update);
    }

    const renderElement = (props) => {
        return (
            <MediaItem
                key={props.key}
                element={props.element}
                onClick={props.onClick}
                selectedElement={props.selectedElement}/>
        );
    }

    const deployed = React.useRef(false);
    const [update, setUpdate] = React.useState(true);

    const permissions = getPermissions(groupList.current, media.current);

    return (
        <div className={"page"}>
            <SideBar
                ref={refSideBar}
                onSearch={searchElement}
                loadMore={loadElements}
                onClick={loadElement}
                selectedElement={media.current}
                renderItem={renderElement}/>
            <div className="background">
                <form onSubmit={handleSubmit}>
                    <TextInput
                        disabled={!permissions["canEdit"]}
                        reset={update}
                        hasTabs
                        tabs={tabsLanguagesTitle}
                        initialValue={title.current}
                        placeholder={"Attack on Titan"}
                        label={translate["Title"]}
                        onChange={(text) => title.current = text}/>
                    <ComboBox
                        disabled={!permissions["canEdit"]}
                        reset={update}
                        label={translate["Type"]}
                        choices={mediaType}
                        initialValue={type.current}
                        onChange={(text) => type.current = text}/>
                    <CheckBox
                        disabled={!permissions["canEdit"]}
                        reset={update}
                        initialValue={isAdult.current}
                        label={translate["IsAdult"]}
                        onChange={(value) => isAdult.current = value}/>
                    <NumericInput
                        disabled={!permissions["canEdit"]}
                        reset={update}
                        canNull
                        min={0}
                        max={10000}
                        initialValue={episode.current}
                        label={translate["Episode"]}
                        onChange={(value) => episode.current = value}/>
                    <NumericInput
                        disabled={!permissions["canEdit"]}
                        reset={update}
                        canNull
                        min={1}
                        max={500}
                        initialValue={episodeDuration.current}
                        label={translate["EpisodeDuration"]}
                        onChange={(value) => episodeDuration.current = value}/>
                    <TextArea
                        disabled={!permissions["canEdit"]}
                        reset={update}
                        hasTabs
                        initialValue={description.current}
                        placeholder={translate["ExampleDescription"]}
                        label={translate["Description"]}
                        onChange={(text) => description.current = text}/>
                    <div className={"row inputContainer"}>
                        <ComboBox
                            disabled={!permissions["canEdit"]}
                            reset={update}
                            start
                            label={translate["Seasonal"]}
                            choices={seasonalAiring}
                            initialValue={seasonal.current["month"]}
                            onChange={(text) => seasonal.current["month"] = text}/>
                        <NumericInput
                            disabled={!permissions["canEdit"]}
                            reset={update}
                            end
                            canNull
                            label={translate["SeasonalYear"]}
                            min={1900}
                            max={2050}
                            initialValue={seasonal.current["year"]}
                            onChange={(value) => seasonal.current["year"] = value}/>
                    </div>
                    <DateInput
                        disabled={!permissions["canEdit"]}
                        reset={update}
                        onlyDate
                        initialValue={startDate.current}
                        label={translate["StartDate"]}
                        onChange={(text) => startDate.current = isValidDate(new Date(text)) ? new Date(text) : null}/>
                    <DateInput
                        disabled={!permissions["canEdit"]}
                        reset={update}
                        onlyDate
                        initialValue={endDate.current}
                        label={translate["EndDate"]}
                        onChange={(text) => endDate.current = isValidDate(new Date(text)) ? new Date(text) : null}/>
                    <YoutubeInput
                        disabled={!permissions["canEdit"]}
                        reset={update}
                        initialValue={trailer.current}
                        placeholder={"https://www.youtube.com/watch?v=MGRm4IzK1SQ&ab_channel=NIHONOMARU"}
                        label={translate["Trailer"]}
                        onChange={(text) => trailer.current = text}/>
                    <Image
                        disabled={!permissions["canEdit"]}
                        reset={update}
                        initialValue={cover.current}
                        label={translate["Cover"]}
                        aspectRatio={2/3}
                        borderRadius={10}
                        onChange={(value) => cover.current = value}/>
                    <Image
                        disabled={!permissions["canEdit"]}
                        reset={update}
                        initialValue={banner.current}
                        label={translate["Banner"]}
                        aspectRatio={4.75}
                        height={100}
                        borderRadius={0}
                        onChange={(value) => banner.current = value}/>
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
                        canDelete={permissions["isLeader"] && media.current !== null}/>
                </form>
                <Bottom element={media.current}/>
            </div>
        </div>
    );
}