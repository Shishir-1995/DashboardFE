export interface PaginatedResDto<T> {
    items: T[],
    page: number,
    totalPages?: number,
    total?: number
}

export interface PaginatedQueryDto {
    page?: number;

    limit?: number;
}
