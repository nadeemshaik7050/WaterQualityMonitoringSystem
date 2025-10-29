export const keycloakConfig = {
  url: import.meta.env.VITE_KEYCLOAK_URL || 'https://keycloak-demo.com/auth',
  realm: import.meta.env.VITE_KEYCLOAK_REALM || 'water-quality',
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'admin-portal',
};
