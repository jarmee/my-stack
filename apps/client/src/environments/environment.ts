export const environment = {
  production: false,
  apiUrl: 'http://localhost:3333',
  auth: {
    issuer: 'http://localhost:8081/realms/my-stack',
    redirectUri: window.location.origin,
    clientId: 'client',
    responseType: 'code',
    scope: 'openid profile email offline_access',
    showDebugInformation: true,
    timeoutFactor: 0.01,
  },
};
