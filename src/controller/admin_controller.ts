import { Request, Response } from "express";
import Admin from "models/admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "config/config.js";

const AdminController = {
  login: async (req: Request, res: Response) => {
    try {
      const admin = await Admin.findOne({
        where: {
          name: req.body.name,
        },
      });

      if (!admin) {
        return res.status(404).json({
          status: 404,
          message: "Admin not found.",
        });
      }

      const match = await bcrypt.compare(req.body.password, admin.password);
      if (!match) {
        return res.status(401).json({
          status: 401,
          message: "Password not matched.",
        });
      }

      const token = jwt.sign({ name: admin.name }, `${config.JWTAUTHKEY}`);

      return res.status(200).json({
        status: 200,
        message: "Admin successfully logged in.",
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  },
};

export default AdminController;