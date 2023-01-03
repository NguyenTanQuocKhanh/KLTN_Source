import Index from '~/views/Index.js';
import Profile from '~/views/admin/Profile.js';
import Maps from '~/views/admin/Maps.js';
import { Login, Register } from '~/views/auth';
import { Banner, CreateBanner, EditBanner } from '~/views/admin/Banner';
import { Brand, CreateBrand, EditBrand } from './views/admin/Brand';
import { Category, CreateCategory, EditCategory } from './views/admin/Category';
import { CreateProduct, EditProduct, Product } from './views/admin/Product';
import { CreateOrder, EditOrder, Order } from './views/admin/Order';

var routes = [
    //index
    {
        path: '/index',
        name: 'Dashboard',
        icon: 'ni ni-tv-2 text-primary',
        component: Index,
        layout: '/admin',
        sideBar: true,
    },

    //user
    {
        path: '/user-profile',
        name: 'User Profile',
        icon: 'ni ni-single-02 text-yellow',
        component: Profile,
        layout: '/admin',
    },

    // banner
    {
        path: '/banners',
        name: 'Banners',
        icon: 'ni ni-bullet-list-67 text-red',
        component: Banner,
        layout: '/admin',
        sideBar: true,
    },
    {
        path: '/banner/create',
        name: 'Create Banner',
        icon: 'ni ni-bullet-list-67 text-red',
        component: CreateBanner,
        layout: '/admin',
    },
    {
        path: '/banner/edit/:id',
        name: 'Edit Banner',
        icon: 'ni ni-bullet-list-67 text-red',
        component: EditBanner,
        layout: '/admin',
    },

    // category
    {
        path: '/categories',
        name: 'Categories',
        icon: 'ni ni-bullet-list-67 text-red',
        component: Category,
        layout: '/admin',
        sideBar: true,
    },
    {
        path: '/category/create',
        name: 'Create Category',
        icon: 'ni ni-bullet-list-67 text-red',
        component: CreateCategory,
        layout: '/admin',
    },
    {
        path: '/category/edit/:id',
        name: 'Edit Category',
        icon: 'ni ni-bullet-list-67 text-red',
        component: EditCategory,
        layout: '/admin',
    },

    // brand
    {
        path: '/brands',
        name: 'Brands',
        icon: 'ni ni-bullet-list-67 text-red',
        component: Brand,
        layout: '/admin',
        sideBar: true,
    },
    {
        path: '/brand/create',
        name: 'Create Brand',
        icon: 'ni ni-bullet-list-67 text-red',
        component: CreateBrand,
        layout: '/admin',
    },
    {
        path: '/brand/edit/:id',
        name: 'Edit Brand',
        icon: 'ni ni-bullet-list-67 text-red',
        component: EditBrand,
        layout: '/admin',
    },

    // product
    {
        path: '/products',
        name: 'Products',
        icon: 'ni ni-bullet-list-67 text-red',
        component: Product,
        layout: '/admin',
        sideBar: true,
    },
    {
        path: '/product/create',
        name: 'Create Product',
        icon: 'ni ni-bullet-list-67 text-red',
        component: CreateProduct,
        layout: '/admin',
    },
    {
        path: '/product/edit/:id',
        name: 'Edit Product',
        icon: 'ni ni-bullet-list-67 text-red',
        component: EditProduct,
        layout: '/admin',
    },

    // orders
    {
        path: '/orders',
        name: 'Orders',
        icon: 'ni ni-bullet-list-67 text-red',
        component: Order,
        layout: '/admin',
        sideBar: true,
    },

    //login
    {
        path: '/login',
        name: 'Login',
        icon: 'ni ni-key-25 text-info',
        component: Login,
        layout: '/auth',
    },

    //logout
    {
        path: '/register',
        name: 'Register',
        icon: 'ni ni-circle-08 text-pink',
        component: Register,
        layout: '/auth',
    },
];
export default routes;
