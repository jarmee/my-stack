import fetch from "node-fetch";

function __fetch() {
  return (url) => {
    return fetch(url);
  };
}

function __responseToJSON() {
  return (response) => {
    return response.json();
  };
}

export { __fetch as fetch, __responseToJSON as responseToJSON };
