import PropTypes from 'prop-types';
import React from "react";

export default function LanguageButton(props) {

    const { name, active, onPress } = props;

    return (
        <input type={"button"} value={name} className={active ? "active" : "inactive"} onClick={onPress}/>
    );
}

LanguageButton.propTypes = {
    name: PropTypes.string.isRequired,
    active: PropTypes.bool,
    onPress: PropTypes.func,
};

LanguageButton.defaultProps = {
    active: false,
    onPress: () => {},
}