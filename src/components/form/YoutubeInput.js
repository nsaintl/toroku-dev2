import PropTypes from 'prop-types';
import React from "react";
import LanguageButton from "./LanguageButton";
import {tabsLanguages} from "../../Constant";

function isValidId(url) {
    if(url.length === 11) return url;
    let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    let match = url.match(regExp);
    return (match && match[7].length === 11)? match[7] : false;
}

export default function YoutubeInput(props) {

    const { initialValue, placeholder, onChange, label } = props;

    const [text, setText] = React.useState(initialValue);
    const [videosId, setVideoId] = React.useState(null);

    console.log(videosId)

    const refresh = (url) => {
        setVideoId(url);
    }

    return (
        <div className={"inputContainer"}>
            <div className={"row"}>
                <a className={"textLabel"}>{label}</a>
            </div>
            <input
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
};

YoutubeInput.defaultProps = {
    initialValue: "",
    placeholder: "",
    label: "",
    onChange: () => {},
}