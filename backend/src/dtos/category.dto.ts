export interface CreateCategoryDto {
    name: string,
    type?: string,
    description: string
}

export interface UpdateCategoryDto {
    id: number,
    name?: string,
    type?: string,
    description?: string
}

export interface DeleteCategoryDto {
    id: number
}