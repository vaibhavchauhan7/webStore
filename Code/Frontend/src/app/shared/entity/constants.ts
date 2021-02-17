export enum WSApi {
    AUTHENTICATION = 'authentication',
    BASE_URL = 'webStoreAPI',
    CHECKOUT = 'checkout',
    CLEAR = 'clear',
    CONFIRM = 'confirm',
    CONTACT = 'contact',
    CUSTOMER = 'customer',
    DETAILS = 'details',
    FORGOT = 'forgot',
    LOGIN = 'login',
    LOGOUT = 'logout',
    ORDERS = 'orders',
    PRODUCT = 'product',
    PRODUCTS = 'products',
    PROFILE = 'profile',
    SIGN_UP = 'sign-up',
    UPDATE = 'update'
}

export enum WSRouting {
    ACCOUNT = 'account',
    CART = 'cart',
    CONTACT = 'contact',
    FORGOT = 'forgot',
    LOGIN = 'login',
    ORDERS = 'orders',
    PAGE_NOT_FOUND = 'page-not-found',
    PATH_DOES_NOT_EXIST = '**',
    PRODUCT = 'product',
    PROFILE = 'profile',
    SIGN_UP = 'sign-up',
    WISHLIST = 'wishlist'
}

export enum WSTitle {
    CART = 'webStore : Cart',
    CONTACT = 'webStore : Contact',
    FORGOT = 'webStore : Forgot Password',
    HOME = 'webStore : Home',
    LOGIN = 'webStore : Login',
    ORDERS = 'webStore : Orders',
    PAGE_NOT_FOUND = 'webStore : Page Not Found',
    PROFILE = 'webStore : Profile',
    SIGN_UP = 'webStore : Sign Up',
    WISHLIST = 'webStore : Wishlist'
}

export enum WSCart {
    ADDED_TO_CART = 'Added to Cart',
    ALREADY_IN_CART = 'Already in Cart',
    CLASS_ADDED_TO_CART = 'btn-green-active',
    DEFAULT_TITLE = 'Add to Cart',
    DEFAULT_CLASS = 'btn-green'
}

export enum WSWishlist {
    ADDED_TO_WISHLIST = 'Added to Wishlist',
    ALREADY_IN_WISHLIST = 'Already in Wishlist',
    CLASS_ADDED_TO_WISHLIST = 'btn-red-active',
    DEFAULT_TITLE = 'Add to Wishlist',
    DEFAULT_CLASS = 'btn-red'
}
