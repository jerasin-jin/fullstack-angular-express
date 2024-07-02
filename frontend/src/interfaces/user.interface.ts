export interface User {
  id: number;
  firstName: string;
  lastName: string;
  matchName?: string;
  email: string;
  img?: string;
  status?: boolean;
  password: string;
  salt?: string;
  role?: string;
  address?: string;
  createBy: string;
  updateBy: string;
  updatedAt?: string;
  createdAt?: string;
}

export interface SessionUser {
  id: number;
  email: string;
  role: string;
}
