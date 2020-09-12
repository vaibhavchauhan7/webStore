export interface Customer {
    customerId: number;
    name: string;
    email: string;
    phone: string;
    password: string;
}

export interface Product {
    productId: number;
    name: string;
    description: string;
    imagePath: string;
    price: number;
    category: string;
}

export interface Contact {
    contactId: number;
    name: string;
    email: string;
    subject: string;
    message: string;
}

export interface SignUp {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

export interface Login {
    name: string;
    password: string;
}

export interface Toast {
    classname: string;
    delay: number;
    options: {};
    toastMessage: string;
}
