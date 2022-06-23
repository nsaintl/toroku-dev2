import PropTypes from 'prop-types';
import React from "react";

export default function Color(props) {

    const { label, initialValue, onChange } = props;

    const [color, setColor] = React.useState(initialValue);

    return (
        <div className={"inputContainer"}>
            <div className={"row"}>
                <a className={"textLabel"}>{label}</a>
            </div>
            <input
                type={"color"}
                value={color}
                onChange={(event) => {
                    onChange(event.target.value);
                    setColor(event.target.value);
                }}/>
        </div>
    );
}

Color.propTypes = {
    label: PropTypes.string.isRequired,
    initialValue: PropTypes.string,
    onChange: PropTypes.func,
};

Color.defaultProps = {
    onChange: () => {},
    initialValue: "#FFFFFF",
}