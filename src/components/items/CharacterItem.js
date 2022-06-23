/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import React from "react";
import {getImage} from "../../controller/ImageController";

const CharacterItem = (props) => {

    const { element, onClick, selectedElement } = props;

    const label = element.name;
    const hasImage = element.hasImage;

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
            getImage("character/" + element.id + "/image-low.webp").then((r) => {
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
                    <img src={image} className={"tag-item-icon-character"} alt={""}/> : null
            }
            <div style={{flex: 1}}>
                <a className={"no-select"}>{label}</a>
            </div>
        </div>
    );
}

CharacterItem.propTypes = {
    element: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    selectedElement: PropTypes.object,
};

CharacterItem.defaultProps = {
    onClick: () => {},
    selectedElement: null,
}

export default React.memo(CharacterItem);