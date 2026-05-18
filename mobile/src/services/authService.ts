import { api } from './api';

export async function loginUser(
  email: string,
  password: string
) {

  return await api.login(
    email,
    password
  );
}

export async function registerUser(
  name: string,
  email: string,
  password: string
) {

  return await api.register(
    name,
    email,
    password
  );
}

