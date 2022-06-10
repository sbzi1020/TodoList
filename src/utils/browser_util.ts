/** **/
const isBrowser = (): boolean => Boolean(typeof window !== 'undefined')

/** **/
const isLocalHost = (): boolean => {
    if (!isBrowser()) {
        return false
    }

    return Boolean(
        window.location.hostname === 'localhost' ||
            window.location.hostname === '127.0.0.1',
    )
}

/** **/
export const BrowserUtil = {
    isBrowser,
    isLocalHost,
}
