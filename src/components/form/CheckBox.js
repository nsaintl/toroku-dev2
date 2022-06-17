import PropTypes from 'prop-types';
import React from "react";

export default function CheckBox(props) {

    const { label, initialValue, onChange } = props;

    const [enable, setEnable] = React.useState(initialValue);

    return (
        <div className={"inputContainer"}>
            <input
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
    onPress: PropTypes.func,
};

CheckBox.defaultProps = {
    onPress: () => {},
    initialValue: false,
}