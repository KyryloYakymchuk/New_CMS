import { Document } from 'mongoose';

export interface Variant extends Document {
    name: string,
    quantity: number,
    wereHouse: number,
    price: number,
    discount: number,
    tax: number,
}
