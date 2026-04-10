import { OrderType, OrderStatus } from '../interfaces/order.interfaces';

export interface CreateOrderItemDto {
    productId: number,
    quantity: number,
    price: number
}

export interface CreateOrderDto {
    userId: number,
    type: OrderType,
    items: CreateOrderItemDto[],
    total: number,
    status: OrderStatus
}

export interface UpdateOrderDto {
    id: number,
    userId?: number,
    type?: OrderType,
    items?: CreateOrderItemDto[],
    total?: number,
    status?: OrderStatus
}

export interface DeleteOrderDto {
    id: number
}