import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

const notFound = async (req: Request, res: Response): Promise<void> => {
  res.status(StatusCodes.NOT_FOUND).json({ error: "The Route does not exist" });
};

export default notFound;
