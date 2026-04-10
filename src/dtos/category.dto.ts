export interface CreateCategoryDto {
    name: string,
    description: string
}

export interface UpdateCategoryDto {
    id: number,
    name?: string,
    description?: string
}

export interface DeleteCategoryDto {
    id: number
}