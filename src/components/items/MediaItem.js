/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import React from "react";
import {getImage} from "../../controller/ImageController";
import {t} from "i18next";

const MediaItem = (props) => {

    const { element, onClick, selectedElement } = props;

    const translate = t("Global", { returnObjects: true});

    let label = translate["Error"] + " : " + translate["Undefined"];
    if(element.titleFrench !== "") {
        label = element.titleFrench;
    } else if(element.titleEnglish !== "") {
        label = element.titleEnglish;
    } else if(element.titleRomaji !== "") {
        label = element.titleRomaji;
    }
    const hasImage = element.hasCover;

    const [image, setImage] = React.useState(null);
    const [selected, setSelected] = React.useState(selectedElement !== null && selectedElement.id === element.id);


    React.useEffect(() => {
        if(selectedElement !== null && selectedElement.id === element.id) {
            if(selected !== true) {
                setSelected(true);
            }
        } else {
            if(selected !== false) {
                setSelected(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedElement]);

    React.useEffect(() => {
        if(hasImage) {
            getImage("media/" + element.id + "/cover-low.webp").then((r) => {
                setImage(r);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            className={"item " + (selected ? "selected " : "") + (hasImage ? "row" : "")}
            onClick={() => {
                onClick(element);
            }}>
            {
                hasImage ?
                    <img src={image} className={"tag-item-icon-media"} alt={""}/> : null
            }
            <div style={{flex: 1}}>
                <a className={"no-select"}>{label}</a>
            </div>
        </div>
    );
}

MediaItem.propTypes = {
    element: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    selectedElement: PropTypes.object,
};

MediaItem.defaultProps = {
    onClick: () => {},
    selectedElement: null,
}

export default React.memo(MediaItem);