import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import config from '../config/config.js';
import User from '../models/user.js';

interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

async function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      status: 401,
      message: 'Unauthorized: Missing token',
    });
  }

  try {
    const decoded = jwt.verify(token, `${config.JWTAUTHKEY}`);
    req.user = decoded;
    next();
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      try {
        const user = await User.findOne({ where: { token } });
        if (user) {
          await user.update({ token: null });
        }
      } catch (dbErr) {
        console.error('Error updating user token to null:', dbErr);
      }

      return res.status(401).json({
        status: 401,
        message: 'Token expired',
      });
    }

    return res.status(401).json({
      status: 401,
      message: 'Unauthorized: Invalid token',
    });
  }
}

export default authenticateToken;