import PropTypes from 'prop-types';

export default function Submit(props) {

    const { name } = props;
    return (
        <div className={"inputContainer"}>
            <input
                type={"submit"}
                value={name}/>
        </div>
    );
}

Submit.propTypes = {
    name: PropTypes.string.isRequired,
};

Submit.defaultProps = {
    onPress: () => {},
}