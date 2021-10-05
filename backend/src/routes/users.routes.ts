import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

interface userSent {
  id: string;
  name: string;
  email: string;
  password?: string;
  created_at: Date;
  updated_at: Date;
}

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({ name, email, password });

  const newUser: userSent = user;

  delete newUser.password;

  return response.json(newUser);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatarService = new UpdateUserAvatarService();

    let avatarFileName: string;

    if (request.file?.filename) {
      avatarFileName = request.file?.filename;
    } else {
      avatarFileName = '';
    }

    const user = await updateUserAvatarService.execute({
      user_id: request.user.id,
      avatarFileName,
    });

    const userDataSent: userSent = user;
    delete userDataSent.password;

    return response.json(user);
  },
);

export default usersRouter;
