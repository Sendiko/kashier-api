import { Request, Response } from "express";
import History from "../models/history.js";

const HistoryController = {
  index: async (req: Request, res: Response) => {
    try {
      const histories = await History.findAll();
      if (histories.length === 0) {
        return res.status(404).json({
          status: 404,
          message: "Histories are empty."
        });
      }

      return res.status(200).json({
        status: 200,
        message: "Histories retrieved successfully.",
        histories: histories
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
      if (!req.params.userId) {
        return res.status(400).json({
          status: 400,
          message: "Parameter userId required."
        });
      }

      const histories = await History.findAll({ where: { userId: req.params.userId } });

      if (histories.length === 0) {
        return res.status(404).json({
          status: 404,
          message: "Histories are empty."
        });
      }

      return res.status(200).json({
        status: 200,
        message: "History successfully retrieved.",
        histories: histories
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  },
  store: async (req: Request, res: Response) => {
    try {
      if (!req.body.userId || !req.body.total || !req.body.items) {
        return res.status(400).json({
          status: 400,
          message: "userId, total and items are required."
        });
      }

      const history = await History.create(req.body);
      return res.status(201).json({
        status: 201,
        message: "History created successfully.",
        history: history
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
      if (!req.params.id) {
        return res.status(400).json({
          status: 400,
          message: "Parameter id required."
        })
      }

      const history = await History.findByPk(req.params.id);

      if (!history) {
        return res.status(404).json({
          status: 404,
          message: "History not found."
        });
      }

      await history.update(req.body);

      return res.status(200).json({
        status: 200,
        message: "History successfully updated.",
        history: history
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          status: 400,
          message: "Parameter id required."
        })
      }

      const history = await History.findByPk(req.params.id);

      if (!history) {
        return res.status(404).json({
          status: 404,
          message: "History not found."
        });
      }

      await history.destroy();
      return res.status(200).json({
        status: 200,
        message: "History successfully deleted."
      })
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }
}

export default HistoryController;