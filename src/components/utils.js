
const renameJsonArrayItemKeys = (jsonArray, translations) => {
    const renameKeys = (obj, keysMap) => Object
        .keys(obj)
        .reduce((acc, key) => ({
            ...acc,
            ...{ [keysMap[key] || key]: obj[key] }
        }), {});

    return jsonArray.map(item => renameKeys(item, translations));
}

const matchPhoneOrEmail = (value) => {
    const pattern = {
        type: undefined, // phone, or email
        confidence: undefined, // confidence of match
        message: undefined // message if confidence < some threshold
    }

    /* Strategy 1:
    match phone, if confidence > threshold, return, else set pattern type, confidence and hint as message.
    match email, update pattern if confidence > threshold or if confidence > phone confidence.
    return */

    /* Strategy 2:
    fuzzy match patern as the user continues typing....?
    */

    return pattern;
}

export {
    renameJsonArrayItemKeys,
    matchPhoneOrEmail
}
