import userController from './controllers';
export default function(route) {
    route.post('/signup', userController.signup);
}
