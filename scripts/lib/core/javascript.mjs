function __eval() {
  return (fileContents) => {
    return eval(fileContents);
  };
}

function __addSlashes(value) {
  return value.replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}

function __keyToString(key) {
  if (typeof key === 'string' && !new RegExp('^[a-zA-Z]+$').test(key)) {
    return `'${__addSlashes(key)}'`;
  }
  return key;
}

function __objectToString() {
  return (obj) => {
    if (typeof obj === 'object' && !Array.isArray(obj)) {
      const objectString = Object.entries(obj)
        .map(([key, value]) => `${__keyToString(key)}: ${__objectToString()(value)}`)
        .join(', ');
      return `{${objectString}}`;
    } else if (typeof obj === 'object' && Array.isArray(obj)) {
      const objectString = obj.map(__objectToString()).join(', ');
      return `[${objectString}]`;
    } else if (typeof obj === 'string') {
      return `'${__addSlashes(obj)}'`;
    } else {
      return obj;
    }
  };
}

function __getPropertyOf(propertyName) {
  return (obj) => obj[propertyName];
}

function __getKeys() {
  return (obj) => Object.keys(obj);
}

function __getValues() {
  return (obj) => Object.values(obj);
}

function __filterBy(regularExpression) {
  return (arr) => arr?.filter((elem) => new RegExp(regularExpression).test(elem));
}

function __map(callback) {
  return (value) => {
    if (Array.isArray(value)) {
      return value.map(callback);
    } else {
      return callback(value);
    }
  };
}

function __filter(callback) {
  return (value) => {
    if (Array.isArray(value)) {
      return value.filter(callback);
    } else {
      return callback(value);
    }
  };
}

export {
  __eval as executeJavascript,
  __objectToString as objectToString,
  __getPropertyOf as getPropertyOf,
  __getKeys as getKeys,
  __getValues as getValues,
  __filterBy as filterBy,
  __map as map,
  __filter as filter,
};
