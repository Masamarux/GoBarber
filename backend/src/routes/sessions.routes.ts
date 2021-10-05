import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

interface UserDataSent {
  id: string;
  name: string;
  email: string;
  password?: string;
  created_at: Date;
  updated_at: Date;
}

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUserService = new AuthenticateUserService();

  const { user, token } = await authenticateUserService.execute({
    email,
    password,
  });

  const userDataSent: UserDataSent = user;

  delete userDataSent.password;

  return response.json({ userDataSent, token });
});

export default sessionsRouter;
