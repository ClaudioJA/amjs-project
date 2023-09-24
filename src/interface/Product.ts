export interface Products {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    rating: string;
}

export interface AddToCartAction {
    type: 'ADD_TO_CART';
    payload: Products;
}

export interface RemoveFromCartAction{
    type: 'REV_FRO_CART';
    payload: Products;
}

export interface State {
    products: Products[];
    count: number
}