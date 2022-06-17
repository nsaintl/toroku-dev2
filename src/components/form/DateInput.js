import PropTypes from 'prop-types';
import React from "react";
import LanguageButton from "./LanguageButton";
import {tabsLanguages} from "../../Constant";
import moment from "moment";

export default function DateInput(props) {

    const { initialValue, placeholder, onChange, label, min, max, onlyDate } = props;

    const [text, setText] = React.useState(onlyDate ? moment(initialValue).format("YYYY-MM-DD") : moment(initialValue).format("YYYY-MM-DDTHH:mm"));

    return (
        <div className={"inputContainer"}>
            <div className={"row"}>
                <a className={"textLabel"}>{label}</a>
            </div>
            <input
                type={onlyDate? "date" : "datetime-local"}
                placeholder={placeholder}
                value={text}
                onChange={(event) => {
                    let result = event.target.value;
                    setText(result);
                    onChange(result);
                }}
                min={min}
                max={max}/>
        </div>
    );
}

DateInput.propTypes = {
    initialValue: PropTypes.object,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    min: PropTypes.string,
    max: PropTypes.string,
    onlyDate: PropTypes.bool,
};

DateInput.defaultProps = {
    initialValue: "",
    placeholder: "",
    label: "",
    onChange: () => {},
    onlyDate: false,
}