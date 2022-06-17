import React from 'react';
import TextInput from "../components/form/TextInput";
import Submit from "../components/form/Submit";
import {useTranslation} from "react-i18next";
import i18next from "i18next";
import TextArea from "../components/form/TextArea";
import {tabsLanguages, initTabsObject} from "../Constant";

export default function Tag() {

    const { t } = useTranslation();

    const translate = i18next.t("Tag", { returnObjects: true});

    const name = React.useRef(initTabsObject(tabsLanguages));
    const description = React.useRef(initTabsObject(tabsLanguages));

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("name : " + JSON.stringify(name.current) + "\ndescription : " + JSON.stringify(description.current));
    };

    return (
        <div className="background">
            <form onSubmit={handleSubmit}>
                <TextInput hasTabs initialValue={name.current} placeholder={translate["ExampleName"]} label={translate["Name"]} onChange={(text) => name.current = text}/>
                <TextArea hasTabs initialValue={description.current} placeholder={translate["ExampleDescription"]} label={translate["Description"]} onChange={(text) => description.current = text}/>
                <Submit name={translate["Submit"]}/>
            </form>
        </div>
    );
}