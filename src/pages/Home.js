import React from 'react';
import TextInput from "../components/form/TextInput";
import Button from "../components/form/Button";
import {useTranslation} from "react-i18next";
import Submit from "../components/form/Submit";
import {Auth} from "aws-amplify";
import Error from "../components/form/Error";
import Text from "../components/form/Text";
import {signOut} from "../App";

const signIn = async (username, password) => {
    try {
        const result = await Auth.signIn(username, password);
        return [
            result["challengeName"],
            result
        ];
    } catch (error) {
        return [
            "ERROR",
            error.message
        ];
    }
}

const completeNewPassword = async (username, newPassword) => {
    try {
        const result = await Auth.completeNewPassword(username, newPassword);
        return [
            "SUCCESS",
            result
        ];
    } catch (error) {
        return [
            "ERROR",
            error.message
        ];
    }
}

export default function Home(props) {

    const { connected } = props;

    const { t } = useTranslation();

    const translate = t("Sign", { returnObjects: true});

    const [error, setError] = React.useState("");
    const [resetPassword, setResetPassword] = React.useState(false);

    const username = React.useRef("");
    const password = React.useRef("");
    const cognitoUser = React.useRef(null);
    const newPassword = React.useRef("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(
            "username : " + username.current + "\n" +
            "password : " + password.current
        );

        const result = await signIn(username.current, password.current);
        console.log(result);
        if(result[0] === "NEW_PASSWORD_REQUIRED") {
            cognitoUser.current = result[1];
            setError("");
            setResetPassword(true);
        } else if(result[0] === "ERROR") {
            setError(result[1]);
        } else if(result[0] === undefined) {
            window.location.reload();
        }
    };

    const handleSubmitPassword = async (event) => {
        event.preventDefault();

        console.log(
            "user : " + cognitoUser.current["username"] + "\n" +
            "newPassword : " + newPassword.current
        );

        const result = await completeNewPassword(cognitoUser.current, newPassword.current);
        console.log(result);
        if(result[0] === "SUCCESS") {
            await signIn(username.current, password.current);
            window.location.reload();
        } else if(result[0] === "ERROR") {
            setError(result[1]);
        }
    };

    const handleSignOut = async (event) => {
        event.preventDefault();

        const result = await signOut();
        if(result) {
            window.location.reload();
        }
    };

    if (connected === undefined) return null;

    return (
        <div className="background">
            {
                connected === null ?
                    <form onSubmit={handleSubmit}>
                        <TextInput
                            disabled={resetPassword}
                            placeholder={"toroku.contact@gmail.com"}
                            onChange={(text) => username.current = text}
                            label={translate["Username"]}/>
                        <TextInput
                            disabled={resetPassword}
                            password
                            placeholder={"••••••••••••"}
                            onChange={(text) => password.current = text}
                            label={translate["Password"]}/>
                        <Submit
                            disabled={resetPassword}
                            name={translate["Connect"]}
                            onPress={handleSubmit}/>
                        {
                            resetPassword ? null :
                                <Error name={error}/>
                        }
                    </form> :
                    <form onSubmit={handleSignOut}>
                        <Text content={"Connecté en tant que " + connected["attributes"]["email"]}/>
                        <Submit
                            disabled={resetPassword}
                            name={translate["Disconnect"]}
                            onPress={handleSignOut}/>
                    </form>
            }
            {
                resetPassword ?
                    <form onSubmit={handleSubmitPassword}>
                        <TextInput
                            password
                            placeholder={"••••••••••••"}
                            onChange={(text) => newPassword.current = text}
                            label={translate["NewPassword"]}/>
                        <Submit
                            name={translate["SubmitNewPassword"]}
                            onPress={handleSubmitPassword}/>
                        <Error name={error}/>
                    </form> : null
            }
        </div>
    );
}