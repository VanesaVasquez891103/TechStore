export interface CreateProductDto {
    name: string,
    price: number,
    stock: number,
    categoryId: number,
    description: string,
    image: string,
    brand?: string
}

export interface UpdateProductDto {
    id: number,
    name?: string,
    price?: number,
    stock?: number,
    categoryId?: number,
    description?: string,
    image?: string,
    brand?: string
}
export interface DeleteProductDto {
    id: number
}
