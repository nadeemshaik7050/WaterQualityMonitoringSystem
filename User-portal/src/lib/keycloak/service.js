import Keycloak from 'keycloak-js';
import { keycloakConfig } from './config';

let keycloakInstance = null;
let isInitialized = false;

const getKeycloak = () => {
  if (!keycloakInstance) {
    keycloakInstance = new Keycloak({
      url: keycloakConfig.url,
      realm: keycloakConfig.realm,
      clientId: keycloakConfig.clientId,
    });
  }
  return keycloakInstance;
};

export const initKeycloak = async (onAuthenticated) => {
  // 🚫 Prevent reinitialization
  if (isInitialized && keycloakInstance) {
    console.log('Keycloak already initialized');
    const authenticated = keycloakInstance.authenticated || false;
    onAuthenticated(authenticated);
    return authenticated;
  }

  const kc = getKeycloak();
  const initOptions = {
    onLoad: 'check-sso',
    pkceMethod: 'S256',
    checkLoginIframe: false,
  };

  try {
    const authenticated = await kc.init(initOptions);
    isInitialized = true;

    if (authenticated) {
      // Refresh token every 60s
      setInterval(() => {
        kc.updateToken(30).catch(() => {
          console.warn('Token refresh failed');
        });
      }, 60000);
    }

    onAuthenticated(authenticated);
    return authenticated;
  } catch (err) {
    console.error('Keycloak init failed', err);
    onAuthenticated(false);
    return false;
  }
};

const KeycloakService = {
  initKeycloak,
  getKeycloak,
  doLogin: () => getKeycloak().login(),
  doLogout: () => getKeycloak().logout(),
  getToken: () => getKeycloak().token,
  isLoggedIn: () => !!getKeycloak().token,
  getUsername: () => getKeycloak().tokenParsed?.preferred_username,
  getUserId: () => getKeycloak().tokenParsed?.sub || null,
};

export default KeycloakService;
