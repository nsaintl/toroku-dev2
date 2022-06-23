import PropTypes from 'prop-types';
import React from "react";
import {t} from "i18next";
import TextInput from "./TextInput";

export default function Bottom(props) {

    const { element } = props;
    const translate = t("Global", { returnObjects: true});

    if (element === undefined || element === null) return null;
    return (
        <>
            <TextInput
                disabled={true}
                label={translate["Submitter"]}
                initialValue={element.submitter === null ? "" : element.submitter}/>
            {
                element.validator === null ? null :
                    <TextInput
                        disabled={true}
                        label={translate["Validator"]}
                        initialValue={element.validator}/>
            }
        </>
    );
}

Bottom.propTypes = {
    element: PropTypes.object,
};

Bottom.defaultProps = {
    element: null,
}