export type Id = string;

function generateId(): Id {
    return `f${(+new Date().getMilliseconds()).toString(16)}`;
}

export { generateId };