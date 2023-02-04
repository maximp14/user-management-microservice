import { Request } from "express";
import { User } from "../../user/entity/user.entity";

interface RequestUser extends Request {
  user: User;
}

export default RequestUser;
