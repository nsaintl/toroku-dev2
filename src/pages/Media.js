import React from 'react';
import TextInput from "../components/form/TextInput";
import Submit from "../components/form/Submit";
import {useTranslation} from "react-i18next";
import i18next from "i18next";
import TextArea from "../components/form/TextArea";
import {tabsLanguages, initTabsObject, mediaType, seasonalAiring} from "../Constant";
import Image from "../components/form/Image";
import NumericInput from "../components/form/NumericInput";
import ComboBox from "../components/form/ComboBox";
import DateInput from "../components/form/DateInput";
import YoutubeInput from "../components/form/YoutubeInput";
import CheckBox from "../components/form/CheckBox";

export default function Media() {

    const { t } = useTranslation();

    const translate = i18next.t("Media", { returnObjects: true});

    const title = React.useRef(initTabsObject(tabsLanguages));
    const type = React.useRef(mediaType[1].key);
    const isAdult = React.useRef(false);
    const episode = React.useRef(24);
    const description = React.useRef(initTabsObject(tabsLanguages));
    const seasonal = React.useRef({month: seasonalAiring[0].key, year: 2022});
    const startDate = React.useRef(new Date());
    const endDate = React.useRef(new Date());
    const trailer = React.useRef("");
    const cover = React.useRef(null);
    const banner = React.useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("title : " + JSON.stringify(title.current) + "\n" +
            "type : " + type.current + "\n" +
            "isAdult : " + isAdult.current + "\n" +
            "episode : " + episode.current + "\n" +
            "description : " + JSON.stringify(description.current) + "\n" +
            "seasonal : " + JSON.stringify(seasonal.current) + "\n" +
            "startDate : " + startDate.current + "\n" +
            "endDate : " + endDate.current + "\n" +
            "trailer : " + trailer.current + "\n" +
            "cover : " + JSON.stringify(cover.current) + "\n" +
            "banner : " + JSON.stringify(banner.current));
    };

    return (
        <div className="background">
            <form onSubmit={handleSubmit}>
                <TextInput
                    hasTabs
                    initialValue={title.current}
                    placeholder={"Attack on Titan"}
                    label={translate["Title"]}
                    onChange={(text) => title.current = text}/>
                <ComboBox
                    label={translate["Type"]}
                    choices={mediaType}
                    initialValue={type.current}
                    onChange={(text) => type.current = text}/>
                <CheckBox
                    initialValue={isAdult.current}
                    label={translate["IsAdult"]}
                    onChange={(value) => isAdult.current = value}/>
                <NumericInput
                    canNull
                    min={0}
                    max={10000}
                    initialValue={episode.current}
                    label={translate["Episode"]}
                    onChange={(value) => episode.current = value}/>
                <TextArea
                    hasTabs
                    initialValue={description.current}
                    placeholder={translate["ExampleDescription"]}
                    label={translate["Description"]}
                    onChange={(text) => description.current = text}/>
                <div className={"row inputContainer"}>
                    <ComboBox
                        start
                        label={translate["Seasonal"]}
                        choices={seasonalAiring}
                        initialValue={seasonal.current["month"]}
                        onChange={(text) => seasonal.current["month"] = text}/>
                    <NumericInput
                        end
                        canNull
                        label={translate["SeasonalYear"]}
                        min={1900}
                        max={2050}
                        initialValue={seasonal.current["year"]}
                        onChange={(value) => seasonal.current["year"] = value}/>
                </div>
                <DateInput
                    onlyDate
                    initialValue={startDate.current}
                    label={translate["StartDate"]}
                    onChange={(text) => startDate.current = new Date(text)}/>
                <DateInput
                    onlyDate
                    initialValue={endDate.current}
                    label={translate["EndDate"]}
                    onChange={(text) => endDate.current = new Date(text)}/>
                <YoutubeInput
                    initialValue={trailer.current}
                    placeholder={"https://www.youtube.com/watch?v=MGRm4IzK1SQ&ab_channel=NIHONOMARU"}
                    label={translate["Trailer"]}
                    onChange={(text) => trailer.current = text}/>
                <Image
                    initialValue={cover.current}
                    label={translate["Cover"]}
                    aspectRatio={8/10}
                    borderRadius={20}
                    onChange={(value) => cover.current = value}/>
                <Image
                    initialValue={banner.current}
                    label={translate["Banner"]}
                    aspectRatio={3}
                    borderRadius={0}
                    onChange={(value) => banner.current = value}/>
                <Submit name={translate["Submit"]}/>
            </form>
        </div>
    );
}