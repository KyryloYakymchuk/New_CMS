import { Document } from 'mongoose';

export interface Order extends Document {

    createDate: Date;

    client:{
        clientId: string;
        clientFirstName: string;
        clientLastName: string;
        clientEmail: string;
        clientNumber: string;
    }

    shipping:{
        address1: string;
        address2: string;
    }

    discount:{
        name: string;
        count: string;
    }

    products: Array<any>;

    totalPrice: number;

    payment: string;

    status: string;

    quantity: number;
}