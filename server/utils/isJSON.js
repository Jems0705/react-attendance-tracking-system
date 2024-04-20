const isJSON = (str) => {
    try {
        JSON.parse(str);
    } catch (err) {
        return false;
    }

    return true;
};

export default isJSON;
