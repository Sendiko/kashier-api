import { Request, Response } from "express";
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

      const user = await User.create({ id: req.body.name, name: req.body.name })
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
  }
}

export default UserController;