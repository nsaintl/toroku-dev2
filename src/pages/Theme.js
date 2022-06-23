import React from 'react';
import Submit from "../components/form/Submit";
import {useTranslation} from "react-i18next";
import {submitModal} from "../App";
import FakeTheme from "../components/FakeTheme";
import CheckBox from "../components/form/CheckBox";
import Image from "../components/form/Image";
import Color from "../components/form/Color";
/*

        foregroundColor: this.props.foregroundColor,
        backgroundUrl: this.props.backgroundUrl,
        isFullheight: this.props.isFullheight,
        backgroundColor: this.props.backgroundColor,
        opacity: this.props.opacity,
        calendarColor: this.props.calendarColor,
        statusBarStyle: this.props.statusBarStyle,
        navigationBarStyle: this.props.navigationBarStyle,
*/
export default function Theme() {

    const { t } = useTranslation();

    const translate = t("Theme", { returnObjects: true});

    const refFakeTheme = React.useRef();

    const foregroundColor = React.useRef("#FF0000");
    const image = React.useRef(null);
    const isFullheight = React.useRef(false);
    const backgroundColor = React.useRef("#FFFF00");
    const opacity = React.useRef("FF");
    const calendarColor = React.useRef("#0033ff");
    const statusBarStyle = React.useRef(true);
    const navigationBarStyle = React.useRef(true);

    const handleSubmit = (event) => {
        event.preventDefault();

        submitModal(() => {

            console.log(
                "foregroundColor : " + foregroundColor.current + "\n" +
                "image : " + image.current + "\n" +
                "isFullheight : " + isFullheight.current + "\n" +
                "backgroundColor : " + backgroundColor.current + "\n" +
                "opacity : " + opacity.current + "\n" +
                "calendarColor : " + calendarColor.current + "\n" +
                "statusBarStyle : " + statusBarStyle.current + "\n" +
                "navigationBarStyle : " + navigationBarStyle.current);
        });
    };

    return (
        <div className="background no-scroll">
            <form onSubmit={handleSubmit}>
                <div style={{display: "flex", flex: 1}}>
                    <FakeTheme
                        ref={refFakeTheme}
                        foregroundColor={foregroundColor.current}
                        image={image.current}
                        isFullheight={isFullheight.current}
                        backgroundColor={backgroundColor.current}
                        opacity={opacity.current}
                        calendarColor={calendarColor.current}
                        statusBarStyle={statusBarStyle.current}
                        navigationBarStyle={navigationBarStyle.current}/>
                    <div className={"flex background"}>
                        <Image
                            hideImage
                            initialValue={image.current}
                            label={translate["Image"]}
                            onChange={(value) => {
                                image.current = value;
                                refFakeTheme.current.image(value);
                            }}/>
                        <Color
                            initialValue={backgroundColor.current}
                            label={translate["BackgroundColor"]}
                            onChange={(value) => {
                                backgroundColor.current = value;
                                refFakeTheme.current.backgroundColor(value);
                            }}/>
                        <Color
                            initialValue={foregroundColor.current}
                            label={translate["ForegroundColor"]}
                            onChange={(value) => {
                                foregroundColor.current = value;
                                refFakeTheme.current.foregroundColor(value);
                            }}/>
                        <Color
                            initialValue={calendarColor.current}
                            label={translate["CalendarColor"]}
                            onChange={(value) => {
                                calendarColor.current = value;
                                refFakeTheme.current.calendarColor(value);
                            }}/>
                        <CheckBox
                            initialValue={isFullheight.current}
                            label={translate["IsFullheight"]}
                            onChange={(value) => {
                                isFullheight.current = value;
                                refFakeTheme.current.isFullheight(value);
                            }}/>
                        <CheckBox
                            initialValue={statusBarStyle.current}
                            label={translate["StatusBarStyle"]}
                            onChange={(value) => {
                                statusBarStyle.current = value;
                                refFakeTheme.current.statusBarStyle(value);
                            }}/>
                        <CheckBox
                            initialValue={navigationBarStyle.current}
                            label={translate["NavigationBarStyle"]}
                            onChange={(value) => {
                                navigationBarStyle.current = value;
                                refFakeTheme.current.navigationBarStyle(value);
                            }}/>
                        <Submit name={translate["Submit"]}/>
                    </div>
                </div>
            </form>
        </div>
    );
}