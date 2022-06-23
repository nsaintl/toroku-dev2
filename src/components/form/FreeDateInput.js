import PropTypes from 'prop-types';
import React from "react";
import NumericInput from "./NumericInput";
import {t} from "i18next";

export default function FreeDateInput(props) {

    const { initialValue, onChange, disabled, reset } = props;

    const [date, setDate] = React.useState(initialValue);

    const translate = t("Global", { returnObjects: true});

    React.useEffect(() => {
        setDate(initialValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reset]);

    return (
        <div className={"inputContainer"}>
            <div className={"row"}>
                <NumericInput
                    reset={reset}
                    disabled={disabled}
                    start
                    label={translate["Day"]}
                    placeholder={"1"}
                    min={1}
                    max={31}
                    initialValue={date["Day"]}
                    onChange={(value) => {
                        let newDate = date;
                        newDate["day"] = value;
                        setDate(newDate);
                        onChange(newDate);
                    }}/>
                <NumericInput
                    reset={reset}
                    disabled={disabled}
                    end
                    start
                    label={translate["Month"]}
                    placeholder={"1"}
                    min={1}
                    max={12}
                    initialValue={date["day"]}
                    onChange={(value) => {
                        let newDate = date;
                        newDate["day"] = value;
                        setDate(newDate);
                        onChange(newDate);
                    }}/>
                <NumericInput
                    reset={reset}
                    disabled={disabled}
                    end
                    label={translate["Year"]}
                    placeholder={"2000"}
                    min={-100000}
                    max={100000}
                    initialValue={date["day"]}
                    onChange={(value) => {
                        let newDate = date;
                        newDate["day"] = value;
                        setDate(newDate);
                        onChange(newDate);
                    }}/>
            </div>
        </div>
    );
}

FreeDateInput.propTypes = {
    initialValue: PropTypes.object,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    reset: PropTypes.bool,
};

FreeDateInput.defaultProps = {
    initialValue: {day: 1, month: 1, year: 2000},
    onChange: () => {},
    disabled: false,
    reset: true,
}