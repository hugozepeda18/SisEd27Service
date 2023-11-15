import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Role } from 'src/constants/role.enum';

@Injectable()
export class AdminGuard implements CanActivate {

  private readonly logger = new Logger('AdminGuard');

  canActivate(context: ExecutionContext): boolean {

    const { user } = context.switchToHttp().getRequest();
    this.logger.debug(user)

    if (user.role ===  Role.Admin) {
      this.logger.debug('User is Admin')
      return true;
    }

    return false

  }
}