export interface Cart extends Product {
    customerId: number;
    quantity: number;
}

export interface Contact {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
}

export interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
}

export interface ForgotPassword {
    email: string;
    phone: string;
}

export interface Login {
    name: string;
    password: string;
}

export interface Order {
    orderID: number;
    orderNumber: number;
    customerID: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    productID: number;
    productName: string;
    productPrice: number;
    purchaseDate: string;
    purchaseTime: string;
    productImagePath: string;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    imagePath: string;
    price: string;
    category: string;
}

export interface SignUp {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

export interface Toast {
    classname: string;
    delay: number;
    options: {};
    toastMessage: string;
}

export interface UpdatePassword {
    email: string;
    password: string;
}

export interface Wishlist extends Product {
    customerId: number;
}
