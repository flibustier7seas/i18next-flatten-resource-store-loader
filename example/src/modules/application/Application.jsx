import React from "react";
import { IntlProvider, FormattedMessage, addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";
import ru from "react-intl/locale-data/ru";
import messages from "../../../locales";

addLocaleData([...en, ...ru]);

export default function Application() {
    return (
        <IntlProvider locale="en" messages={messages["en"]}>
            <div>
                <FormattedMessage id='application.helloWorld' />
            </div>
        </IntlProvider>
    );
}
