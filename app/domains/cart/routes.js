import cartController from './controllers';

export default function(route) {
    route.get(null, cartController.getCartInfo);
    route.post(null, cartController.addToCart);
    route.put(null, cartController.removeFromCart);
}
