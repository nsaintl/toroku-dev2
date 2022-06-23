import React from 'react';
import TextInput from "../components/form/TextInput";
import Submit from "../components/form/Submit";
import {t} from "i18next";
import {tabsLanguages, initTabsObject, isValidDate} from "../Constant";
import NumericInput from "../components/form/NumericInput";
import DateInput from "../components/form/DateInput";

export default function Episode() {

    const translate = t("Episode", { returnObjects: true});

    const episode = React.useRef(1);
    const title = React.useRef(initTabsObject(tabsLanguages));
    const link = React.useRef("");
    const date = React.useRef(new Date());

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("episode : " + episode.current + "\n" +
            "title : " + JSON.stringify(title.current) + "\n" +
            "link : " + link.current + "\n" +
            "date : " + date.current);
    };

    return (
        <div className="background">
            <form onSubmit={handleSubmit}>
                <TextInput
                    hasTabs
                    initialValue={title.current}
                    placeholder={translate["ExampleTitle"]}
                    label={translate["Title"]}
                    onChange={(text) => title.current = text}/>
                <NumericInput
                    min={0}
                    max={10000}
                    initialValue={episode.current}
                    label={translate["Episode"]}
                    onChange={(value) => episode.current = value}/>
                <TextInput
                    initialValue={link.current}
                    placeholder={"https://www.crunchyroll.com/fr/attack-on-titan/episode-1-to-you-2000-years-in-the-future-the-fall-of-zhiganshina-1-623251"}
                    label={translate["Link"]}
                    onChange={(text) => link.current = text}/>
                <DateInput
                    initialValue={date.current}
                    label={translate["Date"]}
                    onChange={(text) => date.current = isValidDate(new Date(text)) ? new Date(text) : null}/>
                <Submit name={translate["Submit"]}/>
            </form>
        </div>
    );
}