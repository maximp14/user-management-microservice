import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  mixin,
  Type,
} from "@nestjs/common";
import { Role } from "../../user/role.enun";
import RequestUser from "../types/user-request";
import { JwtAuthGuard } from "./jwt-auth.guard";

const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest<RequestUser>();
      const user = request.user;

      if (!user.role.includes(role)) {
        throw new ForbiddenException(
          `User doesn't have the required role (${role})`
        );
      }

      return true;
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;
