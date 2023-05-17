export type Product = {
    id: number;
    colour: string;
    name: string;
    price: number;
    img: string;
};

export type BasketItem = Product & {
    qty: number;
};
