/* eslint-disable no-unused-vars */
import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    user: {
      id: string;
      email: string;
      name: string;
      image: string;
    };
  }
}
