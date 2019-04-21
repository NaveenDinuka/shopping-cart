import userController from './controllers';
import { signup, signin } from './middlewares/apiDataValidator';

export default function(route) {
    route.post('/signup', signup, userController.signup);
    route.post('/signin', signin, userController.signin);
}
