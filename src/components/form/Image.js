/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import React from "react";

export default function Image(props) {

    const { label, aspectRatio, borderRadius, onChange, initialValue, hideImage, height, disabled, reset } = props;

    const [image, setImage] = React.useState(initialValue);
    const inputRef = React.useRef(null);

    const updateValue = (value) => {

        setImage(value === null ? null : URL.createObjectURL(value));
        onChange(value);
        if(value === null) inputRef.current.value = null;
    }

    React.useEffect(() => {
        setImage(initialValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reset]);

    return (
        <div className={"inputContainer"}>
            <div className={"row"}>
                {
                    !disabled ?
                        <label className={image === null ? "input button" : "input button startInput"}>
                            <input
                                ref={inputRef}
                                type={"file"}
                                onChange={(event) => {
                                    if(event.target.files[0] === undefined) return;
                                    updateValue(event.target.files[0]);
                                }}
                                accept={"image/png, image/jpeg, image/webp, image/svg+xml, image/avif, image/apng"}/>
                            <a>{label}</a>
                        </label> : null
                }
                {
                    image !== null && !disabled ?
                        <input
                            type={"button"}
                            className={"endInput"}
                            value={"Supprimer"}
                            onClick={() => {updateValue(null)}}/> : null
                }
            </div>
            {
                image === null || hideImage ? null :
                    <img src={image} alt={"label"} style={{aspectRatio: aspectRatio, borderRadius: borderRadius, height: height}}/>
            }
        </div>
    );
}

Image.propTypes = {
    initialValue: PropTypes.string,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    aspectRatio: PropTypes.number,
    borderRadius: PropTypes.number,
    hideImage: PropTypes.bool,
    height: PropTypes.number,
    disabled: PropTypes.bool,
    reset: PropTypes.bool,
};

Image.defaultProps = {
    initialValue: null,
    onChange: () => {},
    aspectRatio: 1,
    borderRadius: 0,
    hideImage: false,
    height: 150,
    disabled: false,
    reset: true,
}