/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import React from "react";

export default function NumericInput(props) {

    const { initialValue, placeholder, onChange, label, min, max, canNull, start, end, disabled, reset } = props;

    const [text, setText] = React.useState(initialValue);

    const updateValue = (value) => {

        setText(value);
        onChange(value === "" ? null : value);
    }

    React.useEffect(() => {
        setText(initialValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reset]);

    return (
        <div className={start || end ? (start ? "flex" : "flex") : "inputContainer"}>
            <div className={"row"}>
                <a className={"textLabel"}>{label}</a>
            </div>
            <div className={"row"}>
                <input
                    disabled={disabled}
                    type={"number"}
                    placeholder={placeholder}
                    className={(canNull && text !== null) || start ? (end ? "startInput endInput" : "startInput") : (end ? "endInput" : undefined)}
                    value={text === null ? "" : text}
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
                    canNull && text !== null && !disabled ?
                        <input
                            type={"button"}
                            className={"endInput"}
                            value={"Supprimer"}
                            onClick={() => {updateValue(null)}}/> : null
                }
            </div>
        </div>
    );
}

NumericInput.propTypes = {
    initialValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    placeholder: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    min: PropTypes.number,
    max: PropTypes.number,
    canNull: PropTypes.bool,
    start: PropTypes.bool,
    end: PropTypes.bool,
    disabled: PropTypes.bool,
    reset: PropTypes.bool,
};

NumericInput.defaultProps = {
    initialValue: null,
    placeholder: "",
    label: "",
    onChange: () => {},
    min: 0,
    max: 10,
    canNull: false,
    start: false,
    end: false,
    disabled: false,
    reset: true,
}