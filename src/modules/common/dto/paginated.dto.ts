export interface PaginatedResDto<T> {
    items: T,
    page: number,
    totalPages: number
}