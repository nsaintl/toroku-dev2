import PropTypes from 'prop-types';
import React from "react";

const UniverseItem = (props) => {

    const { element, onClick, selectedElement } = props;

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

    const [selected, setSelected] = React.useState(false);

    return (
        <div
            className={"item " + (selected ? "selected" : "")}
            onClick={() => {
                onClick(element);
            }}>
            <a className={"no-select"}>{element.name}</a>
        </div>
    );
}

UniverseItem.propTypes = {
    element: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    selectedElement: PropTypes.object,
};

UniverseItem.defaultProps = {
    onClick: () => {},
    selectedElement: null,
}

export default React.memo(UniverseItem);