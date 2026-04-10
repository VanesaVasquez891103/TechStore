export interface CreateProductDto {
    name: string,
    price: number,
    stock: number,
    categoryId: number  
}

export interface UpdateProductDto {
    id: number,
    name?: string,
    price?: number,
    stock?: number,
    categoryId?: number  
}   
export interface DeleteProductDto {     
    id: number
}
