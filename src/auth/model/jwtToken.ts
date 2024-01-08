export type jwtToken = {
    payload: {
      idx: Number;
      username: string;
      sub: string
    };
    access_token: string;
    refresh_token: string;
  }