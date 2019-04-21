import userController from './controllers';
import { signup, signin } from './middlewares/apiDataValidator';
import authMiddleware from './middlewares/authMiddleware';

export default function(route) {
    route.post('/signup', signup, userController.signup);
    route.post('/signin', signin, userController.signin);
    route.post('/signout', authMiddleware.userAuth, userController.signout);
}
