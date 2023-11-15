import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Role } from 'src/constants/role.enum';

@Injectable()
export class UserGuard implements CanActivate {

  private readonly logger = new Logger('UserGuard');

  canActivate(context: ExecutionContext): boolean {

    const { user } = context.switchToHttp().getRequest();
    this.logger.debug(user)

    if (user.role ===  Role.User) {
      this.logger.debug('User is normal user')
      return true;
    }

    return false

  }
}