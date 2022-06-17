import PropTypes from 'prop-types';

export default function Button(props) {

    const { name } = props;
    return (
        <div className={"inputContainer"}>
            <input
                type={"submit"}
                value={name}/>
        </div>
    );
}

Button.propTypes = {
    name: PropTypes.string.isRequired,
    onPress: PropTypes.func,
};

Button.defaultProps = {
    onPress: () => {},
}