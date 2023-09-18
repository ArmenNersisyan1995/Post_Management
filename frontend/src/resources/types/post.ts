export interface PostBody {
  title: string,
  description: string,
}
export interface Post {
  title: string,
  description: string,
  id: number,
  userId: number,
  createdAt: Date
}

export interface Posts {
  count: number,
  rows: Post[]
}
export interface PostQueryParams {
  ownerId?: number | null,
  limit: number,
  offset: number,
}
