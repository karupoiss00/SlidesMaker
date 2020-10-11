export type Id = string;

function generateId(): Id {
    return `f${(+new Date()).toString(16)}`;
}

export { generateId };