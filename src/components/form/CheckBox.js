import PropTypes from 'prop-types';
import React from "react";

export default function CheckBox(props) {

    const { label, initialValue, onChange, disabled, reset } = props;

    const [enable, setEnable] = React.useState(initialValue);

    React.useEffect(() => {
        setEnable(initialValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reset]);

    return (
        <div className={"inputContainer"}>
            <input
                disabled={disabled}
                className={enable ? "check-box active" : "check-box inactive"}
                type={"button"}
                value={label}
                onClick={() => {
                    onChange(!enable);
                    setEnable(!enable);
                }}/>
        </div>
    );
}

CheckBox.propTypes = {
    label: PropTypes.string.isRequired,
    initialValue: PropTypes.bool,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    reset: PropTypes.bool,
};

CheckBox.defaultProps = {
    onChange: () => {},
    initialValue: false,
    disabled: false,
    reset: true,
}