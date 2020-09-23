function isDef(value: any) {
    return value !== void 0;
}

function isBoolean(value: any) {
    return typeof value == 'boolean';
}

function isNumber(value: any) {
    return typeof value == 'number';
}

function isString(value: any) {
    return typeof value == 'string';
}

class Asserts {
    static assert<T>(condition: T, message: string = ""): T {
        message = message || `Assert '${condition}' is failure!`;

        if (!condition)
        {
            throw new Error(message);
        }

        return condition;
    }
    static assertInstanceof<T>(value: any, type: ((newObj: T, ...args: []) => any), message: string = "") {
        if (!(value instanceof type))
        {
            throw new Error(`Expected instanceof ${Asserts._getType(type)} but got ${Asserts._getType(value)}! ${message || ''}`);
        }

        return value;
    }

    static assertBoolean(value: any, message: string = ""): boolean {
        if (!isBoolean(value))
        {
            throw new Error(`Expected boolean but got ${Asserts._getType(value)}! ${message || ''}`);
        }

        return value;
    }

    static assertNumber(value: any, message: string = ""): number {
        if (!isNumber(value))
        {
            throw new Error(`Expected number but got ${Asserts._getType(value)}! ${message || ''}`);
        }

        return value;
    }

    static assertString(value: any, message: string = ""): string {
        if (!isString(value))
        {
            throw new Error(`Expected string but got ${Asserts._getType(value)}! ${message || ''}`);
        }

        return value;
    }

    private static _getType(value: any): string {
        if (value instanceof Function)
        {
            return value.displayName || value.name || 'unknown type name';
        }
        else if (value instanceof Object)
        {
            return value.constructor.displayName || value.constructor.name || Object.prototype.toString.call(value);
        }
        else
        {
            return value === null ? 'null' : typeof value;
        }
    }
}

function verify<T>(condition: T, message: string = ""): T {
    return Asserts.assert(condition, message);
}



export {Asserts, isDef, isBoolean, isString, verify};