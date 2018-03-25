export function capitalize (str = '') {
    return typeof str !== 'string'
        ? ''
        : str[0].toUpperCase() + str.slice(1)
}

export function uuidGenerator() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        ((c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & 15)) >> c / 4).toString(16)
    )
}