import { Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/config.js';
import User from "../models/user.js";

const UserController = {
  index: async (req: Request, res: Response) => {
    try {
      const users = await User.findAll();

      if (users.length === 0) {
        return res.status(404).json({
          status: 404,
          message: "Users are empty."
        });
      }

      return res.status(200).json({
        status: 200,
        message: "Users retrieved successfully.",
        users: users
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  },
  show: async (req: Request, res: Response) => {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({
          status: 404,
          message: "User not found."
        });
      }
      if (user.token === null || user.refreshToken === null) {
        const token = jwt.sign({ name: user.name }, `${config.JWTAUTHKEY}`, { expiresIn: '3h' });
        const refreshToken = jwt.sign({ name: user.name }, `${config.JWTAUTHKEY}_refresh`, { expiresIn: '7d' });
        await user.update({ token, refreshToken });
      }

      return res.status(200).json({
        status: 200,
        message: "User retrieved successfully.",
        user: user
      })
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  },
  store: async (req: Request, res: Response) => {
    try {
      if (!req.body.name) {
        return res.status(400).json({
          status: 400,
          message: "Name is required"
        })
      }

      const isExist = await User.findAll({ where: { name: req.body.name } });
      if (isExist.length > 0) {
        return res.status(401).json({
          status: 401,
          message: "User already exists."
        })
      }

      const token = jwt.sign({ name: req.body.name }, `${config.JWTAUTHKEY}`);
      const refreshToken = jwt.sign({ name: req.body.name }, `${config.JWTAUTHKEY}_refresh`, { expiresIn: '7d' });
      const user = await User.create({ id: req.body.name, name: req.body.name, token: token, refreshToken: refreshToken })
      return res.status(201).json({
        status: 201,
        message: "User successfully created.",
        user: user
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({
          status: 404,
          message: "User not found."
        })
      }

      await user.update({ name: req.body.name }, { where: { id: req.params.id } })

      return res.status(200).json({
        status: 200,
        message: "User successfully updated.",
        user: user
      })
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({
          status: 404,
          message: "User not found."
        })
      }

      await user.destroy();

      return res.status(200).json({
        status: 200,
        message: "User is successfully deleted."
      })
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  },
  refreshToken: async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({
          status: 400,
          message: "Refresh token is required.",
        });
      }

      let decoded: any;
      try {
        decoded = jwt.verify(refreshToken, `${config.JWTAUTHKEY}_refresh`);
      } catch (err: any) {
        return res.status(401).json({
          status: 401,
          message: "Invalid or expired refresh token.",
        });
      }

      const user = await User.findOne({ where: { name: decoded.name } });
      if (!user || user.refreshToken !== refreshToken) {
        return res.status(401).json({
          status: 401,
          message: "Invalid refresh token.",
        });
      }

      const token = jwt.sign({ name: user.name }, `${config.JWTAUTHKEY}`, { expiresIn: '3h' });
      const newRefreshToken = jwt.sign({ name: user.name }, `${config.JWTAUTHKEY}_refresh`, { expiresIn: '7d' });

      await user.update({ token, refreshToken: newRefreshToken });

      return res.status(200).json({
        status: 200,
        message: "Token successfully refreshed.",
        token: token,
        refreshToken: newRefreshToken,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }
}

export default UserController;