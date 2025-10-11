import { Request, Response } from "express";
import Item from '../models/item.js';

const ItemController = {
  index: async (req: Request, res: Response) => {
    try {
      const items = await Item.findAll();

      if (items.length === 0) {
        return res.status(404).json({
          status: 404,
          message: "Items are empty."
        });
      }

      return res.status(200).json({
        status: 200,
        message: "Items retrieved successfully.",
        items: items
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
          status: 404,
          message: "Parameter userId required."
        });
      }

      const items = await Item.findAll({ where: { userId: req.params.userId } });

      if (items.length === 0) {
        return res.status(404).json({
          status: 404,
          message: "Items not found."
        });
      }

      return res.status(200).json({
        status: 200,
        message: "Items retrieved successfully.",
        items: items
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
      if (!req.body.name || !req.body.price || !req.body.userId) {
        return res.status(400).json({
          status: 400,
          message: "Name, Price, and User ID are required."
        });
      }

      const item = await Item.create(req.body);
      return res.status(201).json({
        status: 201,
        message: "Item created successfully.",
        item: item
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
      const item = await Item.findByPk(req.params.id);
      if (!item) {
        return res.status(404).json({
          status: 404,
          message: "Item not found."
        });
      }

      await item.update(req.body);

      return res.status(200).json({
        status: 200,
        message: "Item updated successfully.",
        item: item
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
      const item = await Item.findByPk(req.params.id);
      if (!item) {
        return res.status(404).json({
          status: 404,
          message: "Item not found."
        });
      }

      await item.destroy();

      return res.status(200).json({
        status: 200,
        message: "Item deleted successfully.",
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }
}

export default ItemController;