import userController from './controllers';
import { signup, signin, updateUser } from './middlewares/apiDataValidator';
import authMiddleware from './middlewares/authMiddleware';

export default function(route) {
    route.post('/signup', signup, userController.signup);
    route.post('/signin', signin, userController.signin);

    route.group('/auth', [authMiddleware.userAuth], authRoute => {
        authRoute.post('/signout', userController.signout);
        authRoute.put(null, updateUser, userController.updateUser);
    });
}
