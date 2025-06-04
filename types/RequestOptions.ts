export interface IRequestOptions extends RequestInit {
  params?: Record<string, string>
  withAuth?: boolean
}
