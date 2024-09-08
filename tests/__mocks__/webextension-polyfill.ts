declare global {
  // eslint-disable-next-line no-var
  var myLocalStorage: object;
}

export const browser = {
  storage: {
    local: {
      get: function (code: string) {
        if (globalThis.myLocalStorage == undefined) {
          globalThis.myLocalStorage = {};
        }
        if (code in globalThis.myLocalStorage) {
          return Promise.resolve(globalThis.myLocalStorage[code]);
        }
        return {};
      },
      set: function (obj: object) {
        if (globalThis.myLocalStorage == undefined) {
          globalThis.myLocalStorage = {};
        }
        const code = Object.keys(obj)[0];
        const state = Object.values(obj)[0];
        const record = {};
        record[code] = state;
        globalThis.myLocalStorage[code] = record;
        return Promise.resolve();
      },
      remove: function (code: string) {
        if (globalThis.myLocalStorage == undefined) {
          globalThis.myLocalStorage = {};
        }
        if (code in globalThis.myLocalStorage) {
          delete globalThis.myLocalStorage[code];
        }
        return Promise.resolve();
      },
    },
  },
};

export default browser;
