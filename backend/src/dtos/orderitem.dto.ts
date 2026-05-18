export interface CreateOrderItemDto {
    productId: number,
    quantity: number,
    price: number
}

export interface UpdateOrderItemDto {
    id: number,
    productId?: number,
    quantity?: number,
    price?: number
}

export interface DeleteOrderItemDto {
    id: number
}