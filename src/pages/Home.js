import React from 'react';
import TextInput from "../components/form/TextInput";
import Button from "../components/form/Button";
import {useTranslation} from "react-i18next";

export default function Home() {

    const { t } = useTranslation();

    const translate = t("Sign", { returnObjects: true});

    const username = React.useRef("");
    const password = React.useRef("");

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("username : " + username.current + "\npassword : " + password.current)
    };

    return (
        <div className="background">
            <form onSubmit={handleSubmit}>
                <TextInput placeholder={"toroku.contact@gmail.com"} onChange={(text) => username.current = text} label={translate["Username"]}/>
                <TextInput password placeholder={"••••••••••••"} onChange={(text) => password.current = text} label={translate["Password"]}/>
                <Button name={translate["Connect"]} onPress={handleSubmit}/>
            </form>
        </div>
    );
}