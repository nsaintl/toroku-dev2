import React  from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './App.css';
import "./styles/pages.css";
import "./styles/components.css";
import "./styles/items.css";
import "./styles/FakePhone.css";
import "./styles/NavBar.css";
import "./styles/SideBar.css";
import "react-activity/dist/Dots.css";

import {BrowserRouter, Route, Routes} from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Universe from "./pages/Universe";
import Studio from "./pages/Studio";
import Tag from "./pages/Tag";
import Episode from "./pages/Episode";
import Media from "./pages/Media";
import Staff from "./pages/Staff";
import Character from "./pages/Character";
import {confirmAlert} from "react-confirm-alert";
import {t} from "i18next";
import Theme from "./pages/Theme";
import {API, Auth} from "aws-amplify";

export const isUrl = (url) => {
    if(url === null || url.match === undefined) return false;
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    return url.match(regex);
}

export const goToSignIn = async (navigate) => {
    navigate("/");
    await signOut();
    window.location.reload();
}

export const getPermissions = (groupList, element) => {

    return {
        "canEdit": element === null || groupList.includes("ADMIN") || groupList.includes("VALIDATOR"),
        "isLeader": groupList.includes("ADMIN") || groupList.includes("VALIDATOR"),
    }
}

export const query = async (query, variables, isApiKey) => {
    try {
        const data = await API.graphql({
            query: query,
            variables: variables,
            authMode: isApiKey ? "API_KEY" : "AMAZON_COGNITO_USER_POOLS"
        });
        return [
            "SUCCESS",
            data
        ];
    } catch (error) {
        return [
            "ERROR",
            error
        ];
    }
}

export const getGroupList = async () => {
    try {
        const user = await Auth.currentAuthenticatedUser();
        return {
            "user": user,
            "groupList": user["signInUserSession"]["accessToken"]["payload"]["cognito:groups"]
        };
    } catch (error) {
        return [
            "ERROR",
            error.message
        ];
    }
}

export const isConnected = async () => {
    try {
        const result = await Auth.currentUserInfo();
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

export const signOut = async () => {
    try {
        await Auth.signOut();
        return true;
    } catch (error) {
        return false;
    }
}

export const submitModal = (accept, cancel) => {

    const translate = t("Modal", { returnObjects: true});

    confirmAlert({
        title: translate["ConfirmSubmitTitle"],
        message: translate["ConfirmSubmitMessage"],
        buttons: [
            {
                label: translate["Yes"],
                onClick: accept
            },
            {
                label: translate["No"],
                onClick: cancel
            }
        ],
        overlayClassName: "submit"
    });
}

export const removeModal = (accept, cancel) => {

    const translate = t("Modal", { returnObjects: true});

    confirmAlert({
        title: translate["ConfirmDeleteTitle"],
        message: translate["ConfirmDeleteMessage"],
        buttons: [
            {
                label: translate["Yes"],
                onClick: accept
            },
            {
                label: translate["No"],
                onClick: cancel
            }
        ],
        overlayClassName: "submit"
    });
}

function App() {

    const [connected, setConnected] = React.useState(undefined);

    React.useEffect(() => {

        isConnected().then((result) => {
            if(result[0] === "SUCCESS") {
                setConnected(result[1]);
            }
        });
    }, []);

    if (connected === undefined) return null;

    return (
        <BrowserRouter>
            <div className="App">
                <NavBar isConnected={connected !== null}/>
                <Routes>
                    <Route path='/' element={<Home connected={connected}/>}/>
                    {
                        connected !== null ?
                            <>
                                <Route path='/universe' element={<Universe/>}/>
                                <Route path='/tag' element={<Tag/>}/>
                                <Route path='/studio' element={<Studio/>}/>
                                <Route path='/episode' element={<Episode/>}/>
                                <Route path='/media' element={<Media/>}/>
                                <Route path='/character' element={<Character/>}/>
                                <Route path='/staff' element={<Staff/>}/>
                                <Route path='/theme' element={<Theme/>}/>
                            </> : null
                    }
                    {/*<Route path='/' element={<Home />} />
                    <Route path='/universe' element={<Universe />} />
                    <Route path='/tag' element={<Tag />} />
                    <Route path='/studio' element={<Studio />} />
                    <Route path='/episode' element={<Episode />} />
                    <Route path='/staff' element={<Staff />} />
                    <Route path='/media' element={<Media />} />
                    <Route path='/character' element={<Character />} />
                    <Route path='/theme' element={<Theme />} />
                    <Route path='/voice-actor' element={<VoiceActor />} />*/}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
