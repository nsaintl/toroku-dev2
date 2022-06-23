import PropTypes from 'prop-types';

export default function Error(props) {

    const { name } = props;
    if (name === "") return null;
    return (
        <div className={"inputContainer"}>
            <a className={"error"}>{name}</a>
        </div>
    );
}

Error.propTypes = {
    name: PropTypes.string.isRequired,
};

Error.defaultProps = {
}