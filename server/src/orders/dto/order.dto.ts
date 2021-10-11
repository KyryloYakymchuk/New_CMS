import {IsNotEmpty} from "class-validator";

export class AddOrderDTO {
    userID?: string;
    products: Array<any>;
    discount: string;
    moduleName: string;
    payment: string;
    shipping: string;
    totalPrice: number;
    firstName: string;
    lastName: string;
    address: string;
    number: string;
    email: string;
    shippingFirstName: string;
    shippingLastName: string;
    shippingEmail: string;
    shippingAddress: string;
    shippingPhone: string;
    shippingVatNo:string;
}

export class EditOrderDTO{
    @IsNotEmpty()
    orderId: number;
    products?: Array<any>;
    address?: string;
    discount?: string;
    moduleName: string;
    payment?: string;
    status?: string;
}

export class AllOrdersDTO{
    offset?: number;
    limit?: number;
    sortField?: string;
    sortParameter?:string;
    search?: string;
    searchId?: number;
    createDate: {
        before: Date;
        after: Date;
    }
    from: Date;
    to: Date;
}

export class DeleteOrderDTO{
    @IsNotEmpty()
    orderId: number;
}

export class ResponseOrdersDTO{
    constructor(orders: Record<string, any>) {
        this.orderId = orders.orderId;
        this.products = orders.products;
        this.status = orders.status ;
        this.totalPrice = orders.totalPrice ;
        this.payment = orders.payment ;
        this.shipping = orders.shipping ;
        this.shippingFirstName = orders.shippingInfo.clientFirstName ;
        this.shippingLastName = orders.shippingInfo.clientLastName ;
        this.shippingEmail = orders.shippingInfo.clientEmail ;
        this.shippingAddress = orders.shippingInfo.clientAddress ;
        this.shippingPhone = orders.shippingInfo.clientPhone ;
    }

    orderId: number;
    products: Array<any>;
    status: string;
    totalPrice: string;
    payment: string;
    shipping: string;
    shippingFirstName: string;
    shippingLastName: string;
    shippingEmail: string;
    shippingAddress: string;
    shippingPhone: string;

}

export class ResponseAllOrdersDTO{
    constructor(orders: Record<string, any>) {
        this.orderId = orders.orderId;
        this.products = orders.products;
        this.status = orders.status ;
        this.totalPrice = orders.totalPrice ;
        this.payment = orders.payment ;
        this.shipping = orders.shipping ;
        this.shippingInfo = orders.shippingInfo ;
        this.client = orders.client ;
        this.createDate = orders.createDate ;
        this.discount = orders.discount ;
    }

    orderId: number;
    products: Array<any>;
    status: string;
    totalPrice: number;
    payment: string;
    shipping: string;
    discount: string;
    client: {
        clientId: string;
        clientFirstName: string;
        clientLastName: string;
        clientEmail: string;
        clientNumber: string;
        clientAddress: string;
    }
    shippingInfo: {
        clientFirstName: string;
        clientLastName: string;
        clientEmail: string;
        clientAddress: string;
        clientPhone: string;
        clientVatNo: string;
    };
    createDate: Date;

}

export class CancelOrderDTO{
    @IsNotEmpty()
    orderID: number;
}

export class PaginationDTO{
    offset?: number;
    limit?: number;
}

export class AddProblemDTO{
    orderID: number;
    problem: string;
}