const routes = {
    home: '/',
    cart: 'cart',
    user: {
        profile: '/user/account/profile',
        address: '/user/account/address',
        password: '/user/account/password',
        email: '/user/account/email',
        phone: '/user/account/phone',
        purchase: '/user/purchase',
    },
    search: 'search',
    product_detail: 'product/:id',
    confirm_email: 'confirm-email',
    category_detail: 'category_detail',
    checkout: 'checkout',
};

export default routes;
