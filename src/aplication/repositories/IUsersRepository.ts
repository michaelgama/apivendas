import { User } from 'domain/entities/User';
import { ICreateUser } from 'domain/models/ICreateUser';

export interface IUsersRepository {
  create(data: ICreateUser): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}
