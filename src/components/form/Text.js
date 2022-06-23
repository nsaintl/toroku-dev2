import PropTypes from 'prop-types';

export default function Text(props) {

    const { content } = props;
    if (content === "") return null;
    return (
        <div className={"inputContainer"}>
            <a className={"text"}>{content}</a>
        </div>
    );
}

Text.propTypes = {
    content: PropTypes.string.isRequired,
};

Text.defaultProps = {
}