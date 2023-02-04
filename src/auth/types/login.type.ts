type payloadType = {
  email: string;
  id: number;
};

export type loginType = {
  user: payloadType;
  token: string;
};
