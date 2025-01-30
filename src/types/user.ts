export type User = {
  id: number;
  email: string;
  username: string;
  fullName: string;
  role: string;
  department: string;
  designation: string;
  country: string;
  contact: string;
  createdAt: string;
  updatedAt: string;
};

export type UserWithoutId = Omit<User, "id">;

export type UserWithPassword = User & { password: string };

export type UserWithPermissions = User & { permissions: Record<string, string> };

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type TokenData = UserWithPermissions;
