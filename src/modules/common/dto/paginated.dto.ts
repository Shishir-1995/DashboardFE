export interface PaginatedResDto<T> {
    items: T[],
    page: number,
    totalPages: number
}

export interface PaginatedQueryDto {
    page?: number;

    limit?: number;
}
