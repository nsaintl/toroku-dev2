import React from 'react';
import SearchBar from "./form/SearchBar";
import {t} from "i18next";

import Dots from "react-activity/dist/Dots";

const icon_burger = require("../assets/images/icons/icon_burger.png");
const icon_ok = require("../assets/images/icons/icon_ok.png");

export default class SideBar extends React.Component {

    state = {
        expanded: localStorage.getItem('side-bar-expanded') !== "expanded" ? "" : "expanded",
        content: [],
    }

    constructor(props) {
        super(props);
        this.lockSearch = false;
        this.search = "";
        this.nextToken = undefined;
        this.isDeployed = localStorage.getItem('side-bar-is-deployed') !== "false";
        this.scrollItems = React.createRef();

        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        this.onSearch("");
        this.scrollItems.current.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        this.scrollItems.current.removeEventListener("scroll", this.handleScroll);
    }

    toggleIsDeployed = () => {
        localStorage.setItem('side-bar-is-deployed', (!this.isDeployed).toString());
        this.isDeployed = !this.isDeployed;
        //this.props.onClick(null);
    }

    toggleExpanded = () => {
        const newExpanded = this.state.expanded === "" ? "expanded" : "";
        localStorage.setItem('side-bar-expanded', newExpanded);
        this.setState({
            expanded: newExpanded
        });
    }

    getIsDeployed = () => {
        return this.isDeployed;
    }

    getSearch = () => {
        return this.search;
    }

    getContent = () => {
        return this.state.content;
    }

    setContent = (content) => {
        this.setState({
            content: content
        });
    }

    getNextToken = () => {
        return this.nextToken;
    }

    setNextToken = (nextToken) => {
        if(nextToken === undefined) {
            this.scrollItems.current.scrollTop = 0;
        }
        this.nextToken = nextToken;
    }

    onSearch = (text) => {
        if(this.lockSearch) return
        this.search = text;
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(async () => {
            this.lockSearch = true;
            await this.props.onSearch();
            this.lockSearch = false;
        }, 200);
    }

    handleScroll = (event) => {
        const node = event.target;
        const bottom = node.scrollHeight - node.scrollTop === node.clientHeight;
        if (bottom) {
            this.props.loadMore();
        }
    };

    render() {

        const { expanded, content } = this.state;
        const translate = t("SideBar", { returnObjects: true});

        return (
            <div className={"side-bar-background no-select"}>
                <div className={"side-bar-container " + expanded}>
                    <div className={"side-bar-button"} onClick={this.toggleExpanded}>
                        <div className={"side-bar-icon-container"}>
                            <img
                                className={"side-bar-icon"}
                                src={icon_burger}
                                alt={""}/>
                        </div>
                    </div>
                    <div
                        className={"side-bar-button " + (this.isDeployed ? "selected" : "")}
                        style={{marginTop: 37}}
                        onClick={() => {
                            this.toggleIsDeployed();
                            this.props.onSearch();
                        }}>
                        <div className={"side-bar-icon-container"}>
                            <img
                                className={"side-bar-icon"}
                                src={icon_ok}
                                alt={""}/>
                        </div>
                    </div>
                    <div className={"side-bar-content"}>
                        <SearchBar
                            onChange={this.onSearch}
                            placeholder={translate["Search"]}/>
                        <div
                            ref={this.scrollItems}
                            className={"side-bar-items"}>
                            <ul>
                                {
                                    content.map((e) => {
                                        return this.props.renderItem({
                                            key: "side-bar-content : " + e.id,
                                            element: e,
                                            onClick: this.props.onClick,
                                            selectedElement: this.props.selectedElement
                                        });
                                    })
                                }
                            </ul>
                            {
                                this.nextToken !== null ?
                                    <Dots className={"dots"}/> : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SideBar.propTypes = {
};

SideBar.defaultProps = {
}