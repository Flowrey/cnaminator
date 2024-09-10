export const browser = {
  storage: {
    local: {
      get: jest.fn(),
      set: jest.fn().mockImplementation(() => Promise.resolve()),
      remove: jest.fn().mockImplementation(() => Promise.resolve()),
    },
  },
};

export default browser;
