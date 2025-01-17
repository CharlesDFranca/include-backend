export type GeneratedAuthKey = {
  access_token: string;
};

export type VerifyAuthKey = {
  id: string;
};

export interface IAuthProvider {
  generateToken(id: string): GeneratedAuthKey;
  verify(token: string): VerifyAuthKey;
}
