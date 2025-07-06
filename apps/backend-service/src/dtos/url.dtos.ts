export interface CreateUrlResponseDto {
    id: string
    longUrl: string
    owner: string
    visitedCount: number
    createdAt: Date
    updatedAt: Date
}

export interface CreateUrlDetailsDto {
    longUrl: string
    owner: string
}

export interface URLResponseDto {
    id: string
    longUrl: string
    shortUrl: string
    owner: string
    visitedCount: number
    createdAt: Date
    updatedAt: Date
}

export interface UpdateLongUrlDetailsDto {
    id: string
    longUrl: string
}
