export type Style = {
    backgroundColor: string,
    strokeColor: string,
    strokeWidth: number,
}

function createStyle() {
    return {
        backgroundColor: '#ffffff',
        strokeColor: '#000000',
        strokeWidth: 2,
    }
}

export {createStyle}
