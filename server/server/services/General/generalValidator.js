function isInputBlank(str) {
    const isWhiteSpacesOnlyRegex = /^\s*$/;
    return (!str || isWhiteSpacesOnlyRegex.test(str));
}
function isNotNumber(value){
    return isNaN(Number(value))
}

module.exports ={isNotNumber, isInputBlank}