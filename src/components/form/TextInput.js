import PropTypes from 'prop-types';
import React from "react";
import LanguageButton from "./LanguageButton";
import {tabsLanguages} from "../../Constant";

export default function TextInput(props) {

    const { initialValue, placeholder, onChange, label, password, hasTabs, tabs } = props;

    const [update, setUpdate] = React.useState(true);
    const [text, setText] = React.useState(initialValue);
    const [currentTab, setCurrentTab] = React.useState(tabs[0].key);

    return (
        <div className={"inputContainer"}>
            <div className={"row"}>
                <a className={"textLabel"}>{label}</a>
                {
                    hasTabs ? (
                        <div className={"languages"}>
                            {
                                tabs.map((e) => {
                                    return (
                                        <LanguageButton key={e.displayName} name={e.displayName} active={e.key === currentTab} onPress={() => setCurrentTab(e.key)}/>
                                    );
                                })
                            }
                        </div>
                    ) : null
                }
            </div>
            <input
                type={password ? "password" : "text"}
                placeholder={placeholder}
                value={hasTabs ? text[currentTab] : text}
                onChange={(event) => {
                    let result = event.target.value;
                    if(hasTabs) {
                        result = text;
                        result[currentTab] = event.target.value;
                    }
                    setText(result);
                    onChange(result);
                    setUpdate(!update);
                }}/>
        </div>
    );
}

TextInput.propTypes = {
    initialValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    placeholder: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    password: PropTypes.bool,
    hasTabs: PropTypes.bool,
    tabs: PropTypes.array,
};

TextInput.defaultProps = {
    initialValue: "",
    placeholder: "",
    label: "",
    onChange: () => {},
    password: false,
    hasTabs: false,
    tabs: tabsLanguages,
}