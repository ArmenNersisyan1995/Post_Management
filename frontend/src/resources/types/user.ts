export interface User {
  id: number,
  name: string,
  surname: string,
  email: string,
}
export interface SignInData {
  email: string;
  password: string;
}

export interface SignUpData {
  email: string;
  password: string;
  name: string;
  surname: string;
}

export interface ProfileData {
  name: string,
  surname: string,
  email: string,
}
