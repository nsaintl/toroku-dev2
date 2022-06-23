/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import React from "react";

function isValidId(url) {
    if(url.length === 11) return url;
    let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    let match = url.match(regExp);
    return (match && match[7].length === 11)? match[7] : null;
}

export default function YoutubeInput(props) {

    let { initialValue, placeholder, onChange, label, disabled, reset } = props;

    const [text, setText] = React.useState(initialValue === null ? "" : initialValue);
    const [videosId, setVideoId] = React.useState(null);
    placeholder = disabled && text === "" ? "" : placeholder;
    label = disabled && text === "" ? "" : label;

    const refresh = (url) => {
        setVideoId(url);
    }

    React.useEffect(() => {
        setText(initialValue === null ? "" : initialValue);
        refresh(initialValue === null ? "" : initialValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reset]);

    return (
        <div className={"inputContainer"}>
            <div className={"row"}>
                <a className={"textLabel"}>{label}</a>
            </div>
            {
                disabled && videosId ? null :
                    <input
                        disabled={disabled}
                        type={"text"}
                        placeholder={placeholder}
                        value={text}
                        onChange={(event) => {
                            let result = event.target.value;
                            setText(result);
                            result = isValidId(result);
                            refresh(result);
                            onChange(result);
                        }}/>
            }
            {
                videosId ?
                    <iframe
                        width="355"
                        height="200"
                        src={"https://www.youtube.com/embed/" + videosId}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen/> : null
            }
        </div>
    );
}

YoutubeInput.propTypes = {
    initialValue: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    reset: PropTypes.bool,
};

YoutubeInput.defaultProps = {
    initialValue: "",
    placeholder: "",
    label: "",
    onChange: () => {},
    disabled: false,
    reset: true,
}