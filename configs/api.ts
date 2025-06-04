'use server'

import { IRequestOptions } from '@/types/RequestOptions'

// Define base API URL - can be configured based on environment
const BASE_URL = process.env.NEXT_API_URL || 'http://localhost:3000/api'

// Types for request options

// Utility function to build URL with query parameters

/**
 * Fetch API wrapper with standard error handling and authentication
 * @param endpoint - API endpoint path (will be appended to BASE_URL)
 * @param options - Request options including method, body, headers, etc.
 * @returns Promise with the response data
 */
export async function fetchApi<T = any>(
  endpoint: string,
  options: IRequestOptions = {},
): Promise<T | { status: number; error: any }> {
  const { params, ...fetchOptions } = options
  const buildUrl = (
    endpoint: string,
    params?: Record<string, string>,
  ): string => {
    const url = new URL(endpoint, BASE_URL)

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, value)
        }
      })
    }

    return url.toString()
  }

  const url = buildUrl(endpoint, params)

  // Configure headers with defaults
  const headers = new Headers(fetchOptions.headers || {})

  headers.set('Content-Type', 'application/json')

  const response = await fetch(url, {
    ...fetchOptions,
    headers,
  })

  // Handle HTTP errors
  if (!response.ok) {
    let errorData
    try {
      errorData = await response.json()
    } catch (e) {
      errorData = { message: response.statusText }
    }
    let error = {
      status: response.status,
      error: {
        ...errorData,
        message: errorData.detail?.[0]?.msg || 'An error occurred',
      },
    }
    return error
  }

  // Handle empty responses
  if (response.status === 204) {
    return {} as T
  }

  // Parse response based on content type
  const contentType = response.headers.get('content-type')
  if (contentType?.includes('application/json')) {
    return (await response.json()) as T
  }

  return (await response.text()) as unknown as T
}
