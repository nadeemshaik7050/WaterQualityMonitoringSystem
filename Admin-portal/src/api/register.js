import axios from "axios";

// Keycloak server info
const KEYCLOAK_BASE = "http://localhost:8080";
const REALM = "WaterQualityMonitoring";
const CLIENT_ID = "admin-portal";
const CLIENT_SECRET = ""


// 1️ GET ADMIN TOKEN
async function getAdminToken() {
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("client_id", CLIENT_ID);
  params.append("client_secret", CLIENT_SECRET);

  const res = await axios.post(
    `${KEYCLOAK_BASE}/realms/${REALM}/protocol/openid-connect/token`,
    params,
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );

  return res.data.access_token;
}


// 2️ REGISTER USER WITH ROLE
export async function registerUserWithRole(userData, roleName) {
  const adminToken = await getAdminToken();

  // STEP 1: Create user
  const createUserRes = await axios.post(
    `${KEYCLOAK_BASE}/admin/realms/${REALM}/users`,
    {
      username: userData.username,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      enabled: true,
      emailVerified: false,
    },
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  // Keycloak returns Location header containing the new user ID
  const locationHeader = createUserRes.headers.location;
  const userId = locationHeader.split("/").pop();

  // STEP 3: Assign role
const roleRes = await axios.get(
  `${KEYCLOAK_BASE}/admin/realms/${REALM}/roles`,
  {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  }
);

//  Find matching role
const matchedRole = roleRes.data.find((r) => r.name === roleName);

if (!matchedRole) {
  console.error("Role not found in Keycloak:", roleName);
  console.error("Available roles:", roleRes.data);
  throw new Error("Role not found");
}

//  Prepare correct payload
const roleRepresentation = [
  {
    id: matchedRole.id,
    name: matchedRole.name,
  },
];

//  Assign to user
await axios.post(
  `${KEYCLOAK_BASE}/admin/realms/${REALM}/users/${userId}/role-mappings/realm`,
  roleRepresentation,
  {
    headers: {
      Authorization: `Bearer ${adminToken}`,
      "Content-Type": "application/json",
    },
  }
);

return { success: true, userId };
}