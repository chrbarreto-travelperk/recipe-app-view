import React, {createContext, useState} from "react";

export const ErrorsContext = createContext();

export function ErrorsProvider(props) {
    const [errorMessage, setErrorMessage] = useState("");
    const clearErrorMessage = () => {
        setErrorMessage("");
    };
    return(
        <ErrorsContext.Provider value={{ errorMessage, setErrorMessage, clearErrorMessage }}>
            {props.children}
        </ErrorsContext.Provider>
    )
}