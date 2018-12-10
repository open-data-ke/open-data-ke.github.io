
const showHiddenSection = () => {
    return {
        type: "SHOW_HIDDEN_SECTION"
    }
}

const listAvailableCountries = () => {
    return {
        type: "LIST_AVAILABLE_COUNTRIES"
    }
}

const selectAction = () => {
    return {
        type: "SELECT_ACTION"
    }
}

const inputPhoneOrEmail = () => {
    return {
        type: "INPUT_PHONE_EMAIL"
    }
}

const selectCountry = () => {
    return {
        type: "SELECT_COUNTRY"
    }
}

export {
    showHiddenSection,
    listAvailableCountries,
    selectAction,
    inputPhoneOrEmail,
    selectCountry
}
