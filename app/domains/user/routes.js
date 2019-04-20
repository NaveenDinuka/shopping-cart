import userController from './controllers';
import { signup } from './middlewares/apiDataValidator';

export default function(route) {
    route.post('/signup', signup, userController.signup);
}
