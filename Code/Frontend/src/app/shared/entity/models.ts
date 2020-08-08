export interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    password: string;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    imagePath: string;
    price: number;
    category: string;
}

export interface Toast {
    classname: string;
    delay: number;
    options: {};
    toastMessage: string;
}
