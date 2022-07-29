export function isInputBlank(str) {
    const isWhiteSpacesOnlyRegex = /^\s*$/;
    return (!str || isWhiteSpacesOnlyRegex.test(str));
}
export function isNotNumber(value){
    return isNaN(Number(value))
}