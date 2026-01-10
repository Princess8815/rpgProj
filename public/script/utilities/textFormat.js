

export function capitalizeAfterSpaces(str) {
    return str.replace(/(^|\s)\S/g, c => c.toUpperCase());
}

export function parseStack(value) {
    if (!value || value === "empty" || typeof value !== "string") {
        return { key: null, qty: 0 };
    }

    const [key, qty] = value.split(" ");
    return {
        key,
        qty: qty ? parseInt(qty, 10) : 1
    };
}


