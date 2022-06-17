import PropTypes from 'prop-types';
import React from "react";

export default function Image(props) {

    const { label, aspectRatio, borderRadius, onChange, initialValue } = props;

    const [image, setImage] = React.useState(initialValue);

    const updateValue = (value) => {

        setImage(value);
        onChange(value);
    }

    return (
        <div className={"inputContainer"}>
            <div className={"row"}>

                <label className={image === null ? "input button" : "input button startInput"}>
                    <input
                        type={"file"}
                        onChange={(event) => {

                            if(event.target.files[0] === undefined) return;
                            updateValue(URL.createObjectURL(event.target.files[0]));
                        }}
                        accept={"image/*"}/>
                    <a>{label}</a>
                </label>
                {
                    image !== null ?
                        <input
                            type={"button"}
                            className={"endInput"}
                            value={"Supprimer"}
                            onClick={() => {updateValue(null)}}/> : null
                }
            </div>
            {
                image === null ? null :
                    <img src={image} alt={"label"} style={{aspectRatio: aspectRatio, borderRadius: borderRadius}}/>
            }
        </div>
    );
}

Image.propTypes = {
    initialValue: PropTypes.object,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    aspectRatio: PropTypes.number,
    borderRadius: PropTypes.number,
};

Image.defaultProps = {
    initialValue: null,
    onChange: () => {},
    aspectRatio: 1,
    borderRadius: 0,
}