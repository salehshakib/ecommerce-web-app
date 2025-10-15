import jwt from 'jsonwebtoken';

import { IUser } from '@/types/user.type';
import type { JwtPayload } from '@/types/auth.type';

import { jwtConfig } from '@/config/index';

export class TokenService {
  static generate(user: IUser): string {
    const payload: JwtPayload = {
      id: (user._id as any).toString(),
      email: user.email,
      role: user.role,
    };

    return jwt.sign(payload, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    } as jwt.SignOptions);
  }

  static verify(token: string): JwtPayload {
    return jwt.verify(token, jwtConfig.secret) as JwtPayload;
  }

  static decode(token: string): JwtPayload | null {
    return jwt.decode(token) as JwtPayload | null;
  }
}
