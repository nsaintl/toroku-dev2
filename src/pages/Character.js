import React from 'react';
import TextInput from "../components/form/TextInput";
import Submit from "../components/form/Submit";
import {useTranslation} from "react-i18next";
import {genderList, initTabsObject, isValid, tabsLanguages} from "../Constant";
import ComboBox from "../components/form/ComboBox";
import DateInput from "../components/form/DateInput";
import TextArea from "../components/form/TextArea";
import Image from "../components/form/Image";

export default function Character() {

    const { t } = useTranslation();

    const translate = t("Character", { returnObjects: true});

    const name = React.useRef("");
    const gender = React.useRef(genderList[0].key);
    const age = React.useRef(initTabsObject(tabsLanguages));
    const description = React.useRef(initTabsObject(tabsLanguages));
    const image = React.useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(
            "name : " + name.current + "\n" +
            "gender : " + gender.current + "\n" +
            "age : " + JSON.stringify(age.current) + "\n" +
            "description : " + JSON.stringify(description.current) + "\n" +
            "image : " + JSON.stringify(image.current));
    };

    return (
        <div className="background">
            <form onSubmit={handleSubmit}>
                <TextInput
                    initialValue={name.current}
                    placeholder={"Faye Valentine"}
                    label={translate["Name"]}
                    onChange={(text) => name.current = text}/>
                <ComboBox
                    initialValue={gender.current}
                    label={translate["Gender"]}
                    onChange={(text) => gender.current = text}
                    choices={genderList}/>
                <TextArea
                    hasTabs
                    initialValue={age.current}
                    placeholder={translate["ExampleAge"]}
                    label={translate["Age"]}
                    onChange={(text) => age.current = text}/>
                <TextArea
                    hasTabs
                    initialValue={description.current}
                    placeholder={translate["ExampleDescription"]}
                    label={translate["Description"]}
                    onChange={(text) => description.current = text}/>
                <Image
                    initialValue={image.current}
                    label={translate["Image"]}
                    aspectRatio={1}
                    borderRadius={20}
                    onChange={(value) => image.current = value}/>
                <Submit name={translate["Submit"]}/>
            </form>
        </div>
    );
}