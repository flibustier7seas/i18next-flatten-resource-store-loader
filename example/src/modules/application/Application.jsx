import React from "react";
import messages from "../../../locales";
import { IntlProvider, FormattedMessage } from "react-intl";

export default function Application() {
    return (
        <IntlProvider locale="en" messages={messages["en"]}>
            <div>
                <FormattedMessage id='application.helloWorld' />
            </div>
        </IntlProvider>
    );
}
