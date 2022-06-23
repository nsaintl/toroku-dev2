import PropTypes from 'prop-types';
import {t} from "i18next";

export default function Submit(props) {

    const { name, disabled, canDelete, onDelete } = props;
    const translate = t("Global", { returnObjects: true});
    if(disabled) return null;
    if(canDelete) {
        return (
            <div className={"inputContainer row"}>
                <input
                    disabled={disabled}
                    type={"submit"}
                    value={name}
                    className={"startInput"}/>
                <input
                    disabled={disabled}
                    type={"button"}
                    value={translate["Delete"]}
                    className={"endInput"}
                    onClick={onDelete}
                    style={{backgroundColor: "#F20732", color: "#FFFFFF", flex: 0}}/>
            </div>
        );
    } else {
        return (
            <div className={"inputContainer"}>
                <input
                    disabled={disabled}
                    type={"submit"}
                    value={name}/>
            </div>
        );
    }
}

Submit.propTypes = {
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    canDelete: PropTypes.bool,
    onDelete: PropTypes.func,
};

Submit.defaultProps = {
    onPress: () => {},
    disabled: false,
    canDelete: false,
}