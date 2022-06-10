/** **/
export const LogTheme = {
    NORMAL: '',
    TESTING: 'color: darkcyan; font-size: 0.7rem; font-style: italic;',
    IMPORTANT:
        'color: green; font-size: 0.7rem; font-style: normal; font-weight: bold;',
    ERROR: 'color: red; font-size: 0.7rem; font-style: normal; font-weight: bold;',
}

/**
 * @param {(Object | string)} objRef
 * @param {string} methodName
 * @param {string} msg
 * @param {string} consoleTheme
 * @param {*} [extraData]
 * @memberof LoggerService
 */
const debug = (
    objRef: object | string,
    methodName: string,
    msg: string,
    displayFormat: string,
    extraData?: any,
) => {
    const className =
        objRef instanceof Object ? objRef.constructor.name : objRef
    // console.log(`enableDebug: ${enableDebug}`)
    const messageToPrint = displayFormat
        ? `%c[${className} - ${methodName}] ${msg}`
        : `[${className} - ${methodName}] ${msg}`

    // console.log(`className: ${className}, enableDebug: ${enableDebug}`)
    // if (!enableDebug) {
    //     return
    // }

    if (displayFormat) {
        if (extraData) {
            console.log(messageToPrint, displayFormat, extraData) // tslint:disable-line no-console
        } else {
            console.log(messageToPrint, displayFormat) // tslint:disable-line no-console
        }
    } else {
        if (extraData) {
            console.log(messageToPrint, extraData) // tslint:disable-line no-console
        } else {
            console.log(messageToPrint) // tslint:disable-line no-console
        }
    }
}

/** **/
export const LogUtil = { debug }
