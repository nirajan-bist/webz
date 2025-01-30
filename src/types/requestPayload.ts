export type CreateUsersPayload = {
  email: string;
  password: string;
  username: string;
  fullName: string;
  role: string;
  department: string;
  designation: string;
  country: string;
  contact: string;
};

export type UpdateUserPayload = {
  id: number;
  email?: string;
  password?: string;
  username?: string;
  fullName?: string;
  role?: string;
  department?: string;
  designation?: string;
  country?: string;
  contact?: string;
  managerUsername?: string;
};
