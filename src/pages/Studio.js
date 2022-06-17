import React from 'react';
import TextInput from "../components/form/TextInput";
import Submit from "../components/form/Submit";
import {useTranslation} from "react-i18next";

export default function Studio() {

    const { t } = useTranslation();

    const translate = t("Studio", { returnObjects: true});

    const name = React.useRef("");

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("name : " + name.current);
    };

    return (
        <div className="background">
            <form onSubmit={handleSubmit}>
                <TextInput initialValue={name.current} placeholder={"MAPPA"} label={translate["Name"]} onChange={(text) => name.current = text}/>
                <Submit name={translate["Submit"]}/>
            </form>
        </div>
    );
}