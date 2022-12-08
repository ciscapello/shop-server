declare namespace Express {
  export interface Request {
    user?: Document<unknown, any, User> &
      User & {
        _id: Types.ObjectId;
      } & UserMethods;
  }
}

declare module 'xss-clean' {
  const value: Function;

  export default value;
}
