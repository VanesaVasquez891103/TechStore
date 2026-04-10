export enum OrderType {
    ONLINE = 'online',
    INSTORE = 'instore'
}

export enum OrderStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
    SHIPPED = 'shipped',
    DELIVERED = 'delivered' 

}

export interface IOrder {
    id: number,
    userId: number,
    type: OrderType,
    items: IOrderItem[],
    total: number
    status: OrderStatus,
    date: Date
}

export interface IOrderItem {
    id: number,
    productId: number,
    quantity: number,
    price: number
}