import PropTypes from 'prop-types';
import React from "react";

const icon_refresh = require("../../assets/images/icons/icon_refresh.png")

export default function SearchBar(props) {

    const { placeholder, initialValue, onChange } = props;

    const [text, setText] = React.useState(initialValue);

    return (
        <div
            className={"row"}
            style={{
                justifyContent: "flex-end",
            }}>
            <input
                className={"search-bar"}
                type={"text"}
                placeholder={placeholder}
                value={text}
                onChange={(event) => {
                    onChange(event.target.value);
                    setText(event.target.value);
                }}/>
            <div
                className={"side-bar-button"}
                onClick={() => {
                    onChange(text);
                }}>
                <div
                    style={{padding: 7}}
                    className={"side-bar-icon-container"}>
                    <img
                        className={"side-bar-icon"}
                        src={icon_refresh}
                        alt={""}/>
                </div>
            </div>
        </div>
    );
}

SearchBar.propTypes = {
    placeholder: PropTypes.string,
    initialValue: PropTypes.string,
    onChange: PropTypes.func,
};

SearchBar.defaultProps = {
    placeholder: "",
    onChange: () => {},
    initialValue: "",
}