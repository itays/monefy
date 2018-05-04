import { sign } from 'jsonwebtoken';

// tslint:disable-next-line:no-any
export const signToken = (user: any) => sign(
  {
    iss: 'monefy',
    sub: user._id,
    iat: Math.round(Date.now() / 1000)
  },
  process.env.SECRET,
  { expiresIn: '2m'}
);