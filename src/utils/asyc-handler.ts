import { Request, Response, NextFunction } from "express";

// This is a utility function to handle async errors in Express controllers
type Controller = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any> | void;
export default function asyncHandler(controller: Controller) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
