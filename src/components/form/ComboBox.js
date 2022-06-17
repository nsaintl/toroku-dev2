import PropTypes from 'prop-types';
import React from "react";
import LanguageButton from "./LanguageButton";
import {tabsLanguages} from "../../Constant";
import i18next from "i18next";

export default function ComboBox(props) {

    const { initialValue, onChange, label, choices, start, end } = props;

    const translate = i18next.t("MediaType", { returnObjects: true});

    const [currentSelection, setCurrentSelection] = React.useState(initialValue);

    return (
        <div className={start || end ? (start ? "flex padding-right" : "flex padding-left") : "inputContainer"}>
            <div className={"row"}>
                <a className={"textLabel"}>{label}</a>
            </div>
            <select
                className={start ? (end ? "startInput endInput" : "startInput") : (end ? "endInput" : undefined)}
                value={currentSelection}
                onChange={(event) => {
                    setCurrentSelection(event.target.value);
                    onChange(event.target.value)
                }}>
                {
                    choices.map((e) => {
                        return (
                            <option key={e.key} value={e.key}>{translate[e.displayName]}</option>
                        );
                    })
                }
            </select>
        </div>
    );
}

ComboBox.propTypes = {
    initialValue: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    choices: PropTypes.array,
    start: PropTypes.bool,
    end: PropTypes.bool,
};

ComboBox.defaultProps = {
    initialValue: "",
    label: "",
    onChange: () => {},
    choices: [],
    start: false,
    end: false,
}