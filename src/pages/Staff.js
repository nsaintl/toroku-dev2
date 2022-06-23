import React from 'react';
import TextInput from "../components/form/TextInput";
import Submit from "../components/form/Submit";
import {useTranslation} from "react-i18next";
import {genderList, isValidDate} from "../Constant";
import ComboBox from "../components/form/ComboBox";
import DateInput from "../components/form/DateInput";
import Image from "../components/form/Image";

export default function Staff() {

    const { t } = useTranslation();

    const translate = t("Staff", { returnObjects: true});

    const name = React.useRef("");
    const gender = React.useRef(genderList[0].key);
    const birthDate = React.useRef(null);
    const deathDate = React.useRef(null);
    const image = React.useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(
            "name : " + name.current + "\n" +
            "gender : " + gender.current + "\n" +
            "birthDate : " + birthDate.current + "\n" +
            "deathDate : " + deathDate.current + "\n" +
            "image : " + JSON.stringify(image.current));
    };

    return (
        <div className="background">
            <form onSubmit={handleSubmit}>
                <TextInput
                    initialValue={name.current}
                    placeholder={"Akira Toriyama"}
                    label={translate["Name"]}
                    onChange={(text) => name.current = text}/>
                <ComboBox
                    initialValue={gender.current}
                    label={translate["Gender"]}
                    onChange={(text) => gender.current = text}
                    choices={genderList}/>
                <DateInput
                    onlyDate
                    initialValue={birthDate.current}
                    label={translate["BirthDate"]}
                    onChange={(text) => birthDate.current = isValidDate(new Date(text)) ? new Date(text) : null}/>
                <DateInput
                    onlyDate
                    initialValue={deathDate.current}
                    label={translate["DeathDate"]}
                    onChange={(text) => deathDate.current = isValidDate(new Date(text)) ? new Date(text) : null}/>
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