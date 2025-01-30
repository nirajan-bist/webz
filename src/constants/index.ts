/**
 * TOKEN CONSTANTS
 */
export const ACCESS_TOKEN = "access token";
export const REFRESH_TOKEN = "refresh token";

export const TOKEN_TYPES = {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
};

export const TOKEN_SECRETS = {
  [ACCESS_TOKEN]: process.env.ACCESS_TOKEN_SECRET,
  [REFRESH_TOKEN]: process.env.REFRESH_TOKEN_SECRET,
};

export const ACCESS_TOKEN_EXPIRY = "1d";
export const REFRESH_TOKEN_EXPIRY = "7d";

//============================================================
/**
 * ERROR CONSTANTS
 */
export const AUTHENTICATION_ERROR = "Authentication Error";
export const INVALID_TOKEN = "Invalid Token Error";

export const ERROR_TYPES = {
  AUTHENTICATION_ERROR,
  INVALID_TOKEN,
};

export const ERROR_MESSAGES = {
  [AUTHENTICATION_ERROR]: AUTHENTICATION_ERROR,
  [INVALID_TOKEN]: INVALID_TOKEN,
};

export const PERMISSIONS_ENUM = ["READ_USERS", "CREATE_USERS", "UPDATE_USER", "DELETE_USERS", "MANAGE_PERMISSIONS"];

export const PERMISSIONS = {
  READ_USERS: "READ_USERS",
  CREATE_USERS: "CREATE_USERS",
  UPDATE_USER: "UPDATE_USER",
  DELETE_USERS: "DELETE_USERS",
  MANAGE_PERMISSIONS: "MANAGE_PERMISSIONS",
};

export const PERMISSION_MESSAGES = {
  [PERMISSIONS.READ_USERS]: "You do not have permission to read the users",
  [PERMISSIONS.CREATE_USERS]: "You do not have permission to create the users",
  [PERMISSIONS.UPDATE_USER]: "You do not have permission to update the user",
  [PERMISSIONS.DELETE_USERS]: "You do not have permission to delete the users",
  [PERMISSIONS.MANAGE_PERMISSIONS]: "You do not have permission to manage permissions",
};
