type payloadType = {
  email: string;
  sub: number;
};

export type loginType = {
  user: payloadType;
  token: string;
};
