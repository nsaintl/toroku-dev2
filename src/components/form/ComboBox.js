import PropTypes from 'prop-types';
import React from "react";
import LanguageButton from "./LanguageButton";
import {tabsLanguages} from "../../Constant";
import i18next from "i18next";

export default function ComboBox(props) {

    const { initialValue, onChange, label, choices, start, end, disabled, reset } = props;

    const translate = i18next.t("MediaType", { returnObjects: true});

    const [currentSelection, setCurrentSelection] = React.useState(initialValue);

    React.useEffect(() => {
        setCurrentSelection(initialValue);
    }, [reset]);

    return (
        <div className={start || end ? (start ? "flex" : "flex") : "inputContainer"}>
            <div className={"row"}>
                <a className={"textLabel"}>{label}</a>
            </div>
            <select
                disabled={disabled}
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
    disabled: PropTypes.bool,
    reset: PropTypes.bool,
};

ComboBox.defaultProps = {
    initialValue: "",
    label: "",
    onChange: () => {},
    choices: [],
    start: false,
    end: false,
    disabled: false,
    reset: true,
}