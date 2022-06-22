import { faker } from '@faker-js/faker';
import { createUser } from '../handlers/user';

describe('createUser', () => {
  test('should be able to insert user in db', async () => {
    const user = {
      request_id: faker.datatype.uuid(),
      user_id: faker.datatype.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const { isSuccess, message } = await createUser(user);
    expect(isSuccess).toBeTruthy();
    expect(message).toBe('User created successfully');
  });
});
