const entrySet = {};

module.exports = {
    put: (key, data) => {
        entrySet[key] = data;
    },

    get: (key) => {
        return entrySet[key];
    },

    getAll: () => {
        return entrySet;
    }
};