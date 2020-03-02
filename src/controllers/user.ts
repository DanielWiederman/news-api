import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Req,
  Res,
  JsonController,
  UseBefore
} from "routing-controllers";
import { Request, Response } from "express";
import { User } from "../entity/User";
import { isLoggedIn } from "../middlewares/isLoggedIn";

@JsonController("/users")
export class UserController {
  @Get("/get")
  async getAll(@Req() request: Request, @Res() response: Response) {
    try {
      const users: Array<User> = await User.find();
      return response.send(users);
    } catch {
      return response.status(402).send("/user ERROR");
    }
  }

  @Get("/:id")
  async getOne(@Param("id") id: number, @Res() res: Response) {
    try {
      const user: User = await User.findOne(id);
      return user ? res.send(user) : res.send({});
    } catch {
      return res.status(402).send("/user/id ERROR");
    }
  }

  @Post("/create")
  async createUser(@Req() req: Request, @Res() res: Response) {
    try {
      const { first_name, last_name, age } = req.body;

      const newUser: User = await User.create({
        first_name,
        last_name,
        age
      }).save();

      return res.send(newUser);
    } catch {
      return res.status(402).send("/user/create ERROR");
    }
  }
}
