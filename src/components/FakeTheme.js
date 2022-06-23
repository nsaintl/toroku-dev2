import React from 'react';

import {MdAdd} from "@react-icons/all-files/md/MdAdd";

const statusBarLight = require("../../src/assets/images/fake-theme/StatusBarLight.png");
const statusBarDark = require("../../src/assets/images/fake-theme/StatusBarDark.png");
const navigationBarLight = require("../../src/assets/images/fake-theme/NavigationBarLight.png");
const navigationBarDark = require("../../src/assets/images/fake-theme/NavigationBarDark.png");

const banner1 = require("../../src/assets/images/fake-theme/Banner1.jpg");
const banner2 = require("../../src/assets/images/fake-theme/Banner2.jpg");
const banner3 = require("../../src/assets/images/fake-theme/Banner3.jpg");

export default class FakeTheme extends React.Component {

    state = {
        foregroundColor: this.props.foregroundColor,
        image: this.props.image,
        isFullheight: this.props.isFullheight,
        backgroundColor: this.props.backgroundColor,
        opacity: this.props.opacity,
        calendarColor: this.props.calendarColor,
        statusBarStyle: this.props.statusBarStyle,
        navigationBarStyle: this.props.navigationBarStyle,
    }
    constructor(props) {
        super(props);
    }

    foregroundColor = (value) => this.setState({foregroundColor: value})
    image = (value) => this.setState({image: value})
    isFullheight = (value) => this.setState({isFullheight: value})
    backgroundColor = (value) => this.setState({backgroundColor: value})
    opacity = (value) => this.setState({opacity: value})
    calendarColor = (value) => this.setState({calendarColor: value})
    statusBarStyle = (value) => this.setState({statusBarStyle: value})
    navigationBarStyle = (value) => this.setState({navigationBarStyle: value})

    render() {

        let { foregroundColor, image, isFullheight, backgroundColor, opacity, calendarColor, statusBarStyle, navigationBarStyle } = this.state;

        return (
            <div className={"fake-phone-container"}>
                <div
                    className={"fake-phone"}>
                    <div
                        style={{
                            backgroundColor: foregroundColor
                        }}
                        className={"image-background"}>

                    </div>
                    {
                        image === "" || image === null ? null :
                            <img
                                style={{
                                    aspectRatio: isFullheight ? 0.5 : 0.9,
                                }}
                                src={image}
                                className={"image-background"}
                                alt={""}/>
                    }
                    <div
                        style={{
                            backgroundColor: backgroundColor + opacity,
                        }}
                        className={"bottom"}>
                        <div
                            className={"banner1-container"}>
                            <img
                                src={banner1}
                                className={"banner1"}
                                alt={""}/>
                        </div>
                        <div
                            className={"banner2-container"}>
                            <img
                                src={banner2}
                                className={"banner2"}
                                alt={""}/>
                        </div>
                        <div
                            className={"banner3-container"}>
                            <img
                                src={banner3}
                                className={"banner3"}
                                alt={""}/>
                        </div>

                        <div
                            className={"event-text-container1"}>
                            <div
                                className={"event-text-container2"}>

                                <div
                                    style={{
                                        backgroundColor: foregroundColor,
                                    }}
                                    className={"event-text"}>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className={"calendar-container"}>
                        <div
                            className={"calendar"}>
                            <div
                                style={{
                                    backgroundColor: calendarColor,
                                }}
                                className={"calendar-text"}>
                            </div>
                            <div
                                style={{
                                    backgroundColor: foregroundColor,
                                }}
                                className={"calendar-text-selected"}>
                            </div>
                            <div
                                style={{
                                    backgroundColor: foregroundColor,
                                }}
                                className={"calendar-text-event"}>
                            </div>
                            <div
                                style={{
                                    backgroundColor: backgroundColor,
                                }}
                                className={"calendar-text-event-background"}>
                            </div>
                            <div
                                style={{
                                    backgroundColor: calendarColor,
                                }}
                                className={"calendar-text-extra"}>
                            </div>
                        </div>
                    </div>
                    <div
                        className={"top-icon-container"}>
                        <div
                            style={{
                                justifyContent: "start",
                                alignItems: "end"
                            }}
                            className={"top-icon-sub-container"}>
                            <div
                                className={"back-button-container"}>
                                <div
                                    style={{
                                        backgroundColor: calendarColor
                                    }}
                                    className={"back-button"}/>
                            </div>
                        </div>
                        <div
                            style={{
                                justifyContent: "center",
                                alignItems: "end",
                                height: "75%",
                                fontSize:"1.1vw",
                                fontWeight:"bold",
                                color: calendarColor
                            }}
                            className={"top-icon-sub-container"}>
                            {"12 Décembre "}
                            <a
                                style={{
                                    opacity: 0.7,
                                    whiteSpace: "pre-wrap"
                                }}>{" 2022"}</a>
                        </div>
                        <div
                            style={{
                                justifyContent: "end",
                                alignItems: "end"
                            }}
                            className={"top-icon-sub-container"}>
                            <div
                                className={"theme-button-container"}>
                                <div
                                    style={{
                                        backgroundColor: calendarColor
                                    }}
                                    className={"theme-button"}/>
                            </div>
                        </div>
                    </div>
                    <div
                        className={"middle-button-background-container"}>
                        <div
                            style={{
                                backgroundColor: backgroundColor + opacity,
                            }}
                            className={"middle-button-background"}>
                        </div>
                    </div>
                    <div
                        className={"middle-button"}>
                        <MdAdd
                            className={"add-button"}
                            color={foregroundColor}/>
                    </div>
                    <img
                        src={statusBarStyle ? statusBarLight : statusBarDark}
                        className={"status-bar"}
                        alt={""}/>
                    <img
                        src={navigationBarStyle ? navigationBarLight : navigationBarDark}
                        className={"navigation-bar"}
                        alt={""}/>
                </div>
            </div>
        );
    }
}