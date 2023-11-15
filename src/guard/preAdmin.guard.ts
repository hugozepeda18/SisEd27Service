import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Role } from 'src/constants/role.enum';

@Injectable()
export class PreAdminGuard implements CanActivate {

  private readonly logger = new Logger('PreAdminGuard');

  canActivate(context: ExecutionContext): boolean {

    const { user } = context.switchToHttp().getRequest();
    this.logger.debug(user)

    if (user.role ===  Role.PreAdmin) {
      this.logger.debug('User is preAdmin')
      return true;
    }

    return false

  }
}