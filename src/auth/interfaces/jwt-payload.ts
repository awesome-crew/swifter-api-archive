import { JwtPayload as AwesomeJwtPayload } from '@awesome-dev/server-auth';

export interface JwtPayload extends AwesomeJwtPayload {
  companyId: number;
}
