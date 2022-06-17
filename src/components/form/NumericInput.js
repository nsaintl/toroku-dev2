import PropTypes from 'prop-types';
import React from "react";
import LanguageButton from "./LanguageButton";
import {tabsLanguages} from "../../Constant";
import Button from "./Button";

export default function NumericInput(props) {

    const { initialValue, placeholder, onChange, label, min, max, canNull, start, end } = props;

    const [text, setText] = React.useState(initialValue);

    const updateValue = (value) => {

        setText(value);
        onChange(value === "" ? null : value);
    }

    return (
        <div className={start || end ? (start ? "flex padding-right" : "flex padding-left") : "inputContainer"}>
            <div className={"row"}>
                <a className={"textLabel"}>{label}</a>
            </div>
            <div className={"row"}>
                <input
                    type={"number"}
                    placeholder={placeholder}
                    className={(canNull && text !== "") || start ? (end ? "startInput endInput" : "startInput") : (end ? "endInput" : undefined)}
                    value={text}
                    onChange={(event) => {
                        let result = event.target.value;
                        const isValid = /^[0-9-]+$/.test(result);
                        if(!isValid) return;
                        if(result < min) {
                            result = min
                        } else if(result > max) {
                            result = max;
                        }
                        result = parseInt(result, 10);
                        updateValue(result);
                    }}/>
                {
                    canNull && text !== "" ?
                        <input
                            type={"button"}
                            className={"endInput"}
                            value={"Supprimer"}
                            onClick={() => {updateValue("")}}/> : null
                }
            </div>
        </div>
    );
}

NumericInput.propTypes = {
    initialValue: PropTypes.number,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    min: PropTypes.number,
    max: PropTypes.number,
    canNull: PropTypes.bool,
    start: PropTypes.bool,
    end: PropTypes.bool,
};

NumericInput.defaultProps = {
    initialValue: "",
    placeholder: "",
    label: "",
    onChange: () => {},
    min: 0,
    max: 10,
    canNull: false,
    start: false,
    end: false,
}