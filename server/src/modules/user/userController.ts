import { Request, Response } from "express";
import { catchAsync } from "../../core/utils/catchAsync";
import * as userRepository from "./userRepository";

export const getUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await userRepository.getAllUsers();
  res.status(200).json({
    success: true,
    data: users,
  });
});
