import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];
  constructor() {
    this.users = [
      {
        id: 1,
        account: 'test001',
        password: 'test001',
      },
      {
        id: 2,
        account: 'test002',
        password: 'test002',
      },
      {
        id: 3,
        account: 'test003',
        password: 'test003',
      },
    ];
  }

  async findOne(account: string): Promise<User | undefined> {
    return this.users.find((user) => user.account === account);
  }
}
