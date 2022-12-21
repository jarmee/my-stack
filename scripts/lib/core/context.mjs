const GLOBAL_CONTEXT = {};

function __addToContext(key, stepCallback) {
  return (value, parentValue) => {
    const result = stepCallback(value, parentValue);
    GLOBAL_CONTEXT[key] = result;
    return result;
  };
}

function __getFromContext(keys, stepCallback) {
  return (value, parentValue) => {
    if (Array.isArray(keys)) {
      const values = keys.map((key) => GLOBAL_CONTEXT[key]);
      return stepCallback(...[...values, value, parentValue]);
    } else {
      return stepCallback(GLOBAL_CONTEXT[keys], value, parentValue);
    }
  };
}

export { __addToContext as addToContext, __getFromContext as getFromContext };
