import PropTypes from 'prop-types';
import React from "react";

export default function Slider(props) {

    const { label, initialValue, onChange } = props;

    const [color, setColor] = React.useState(initialValue);

    return (
        <div className={"inputContainer"}>
            <div className={"row"}>
                <a className={"textLabel"}>{label}</a>
            </div>
            <input
                type={"range"}
                value={color}
                onChange={(event) => {
                    onChange(event.target.value);
                    setColor(event.target.value);
                }}/>
        </div>
    );
}

Slider.propTypes = {
    label: PropTypes.string.isRequired,
    initialValue: PropTypes.string,
    onChange: PropTypes.func,
};

Slider.defaultProps = {
    onChange: () => {},
    initialValue: "#FFFFFF",
}