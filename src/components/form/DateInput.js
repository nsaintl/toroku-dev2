/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import React from "react";
import moment from "moment";
import {isValidDate} from "../../Constant";

export default function DateInput(props) {

    const { initialValue, placeholder, onChange, label, min, max, onlyDate, disabled, reset } = props;

    const initialDate = initialValue === null ? null : new Date(initialValue);
    const init = !isValidDate(initialDate) ? "" : (onlyDate ? moment(initialValue).format("YYYY-MM-DD") : moment(initialValue).format("YYYY-MM-DDTHH:mm"));
    const [text, setText] = React.useState(init);
    React.useEffect(() => {
        const initialDate = initialValue === null ? null : new Date(initialValue);
        const init = !isValidDate(initialDate) ? "" : (onlyDate ? moment(initialValue).format("YYYY-MM-DD") : moment(initialValue).format("YYYY-MM-DDTHH:mm"));
        setText(init);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reset]);

    return (
        <div className={"inputContainer"}>
            <div className={"row"}>
                <a className={"textLabel"}>{label}</a>
            </div>
            <input
                disabled={disabled}
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
    disabled: PropTypes.bool,
    reset: PropTypes.bool,
};

DateInput.defaultProps = {
    initialValue: "",
    placeholder: "",
    label: "",
    onChange: () => {},
    onlyDate: false,
    disabled: false,
    reset: true,
}