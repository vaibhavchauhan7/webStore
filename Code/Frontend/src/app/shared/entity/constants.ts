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
    WEB_STORE = 'webStore',
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

export enum WSToast {
    CART_CLEARED = 'Cart Cleared!',
    CHANGES_SAVED = 'Changes Saved!',
    CHECKOUT_SUCCESSFUL = 'Checkout Successful!',
    CHECKOUT_FAILED = 'Checkout Failed!',
    CONFIRM_PASSWORD_DOES_NOT_MATCH = 'Confirm Password Does Not Match Password!',
    ERROR_ADDING_PRODUCT_WISHLIST = 'Error - Couldn\'t Add Product To Wishlist!',
    ERROR_ADDING_PRODUCT_CART = 'Error - Couldn\'t Add Product To Cart!',
    ERROR_CLEARING_WISHLIST = 'Error Clearing Wishlist!',
    ERROR_CLEARING_CART = 'Error Clearing Cart!',
    ERROR_RETRIEVING_WISHLIST = 'Error Retrieving Your Wishlist!',
    ERROR_RETRIEVING_CART = 'Error Retrieving Your Cart!',
    ERROR_RETRIEVING_ORDERS = 'Error Retrieving Your Orders!',
    FORM_SUBMITTED = 'Form Successfully Submitted!',
    FORM_NOT_SUBMITTED = 'Something Went Wrong - Form Not Submitted',
    INVALID_CREDENTIALS = 'Invalid Credentials!',
    INVALID_DATA = 'Invalid Data!',
    PASSWORD_UPDATED = 'Password Updated - Please Login!',
    PASSWORD_UPDATE_FAILED = 'Couldn\'t Update Password - Try Again Later!',
    PASSWORDS_DO_NOT_MATCH = 'Passwords Do Not Match!',
    PRODUCT_REMOVAL_FAILED = 'Couldn\'t Remove Product!',
    PROFILE_UPDATE_FAILED = 'Couldn\'t Update Profile!',
    SIGN_UP_FAILED = 'Something Went Wrong - Sign Up Failed!',
    SIGN_UP_SUCCESSFUL = 'Sign Up Successful!',
    TRY_AGAIN = 'Error Occurred - Please Try Again Later!',
    WISHLIST_CLEARED = 'Wishlist Cleared!',
    WRONG_CREDENTIALS = 'Wrong Credentials!'
}

export enum WSClass {
    REQUEST_FAILED = 'bg-red',
    REQUEST_SUCCESS = 'bg-success'
}

export enum WSId {
    BAR_CONTAINER = 'bar-container'
}

export enum ProductType {
    CART = 'Cart',
    WISHLIST = 'Wishlist'
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
