import PropTypes from 'prop-types';
import React from "react";
import {t} from "i18next";

const icon_warning = require("../../assets/images/icons/icon_warning.png");

const TagItem = (props) => {

    const { element, onClick, selectedElement } = props;

    const translate = t("Global", { returnObjects: true});

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
    }, [selectedElement]);

    const [selected, setSelected] = React.useState(selectedElement !== null && selectedElement.id === element.id);

    let label = translate["Error"] + " : " + translate["Undefined"];
    if(element.nameFrench !== "") {
        label = element.nameFrench;
    } else if(element.nameEnglish !== "") {
        label = element.nameEnglish;
    }

    const isNotFilled = element.nameFrench === "" || element.nameEnglish === "";

    return (
        <div
            className={"item " + (selected ? "selected " : "") + (isNotFilled ? "row" : "")}
            onClick={() => {
                onClick(element);
            }}>
            {
                isNotFilled ?
                    <img src={icon_warning} className={"tag-item-icon-warning"} alt={""}/> : null
            }
            <div style={{flex: 1}}>
                <a className={"no-select"}>{label}</a>
            </div>
        </div>
    );
}

TagItem.propTypes = {
    element: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    selectedElement: PropTypes.object,
};

TagItem.defaultProps = {
    onClick: () => {},
    selectedElement: null,
}

export default React.memo(TagItem);