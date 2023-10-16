export class Api {
  static baseUrl: string = import.meta.env.VITE_BACKEND_URL

  static async post(endpoint: string, data?: any): Promise<any> {
    const request = await fetch(`${Api.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      credentials: 'include',
      mode: 'cors'
    })
    return await request.json()
  }

  static async register(userData: any): Promise<any> {
    return await this.post('/api/auth/register', userData)
  }

  static async login(credentials: any): Promise<any> {
    return await this.post('/api/auth/login', credentials)
  }

  static async logout(): Promise<any> {
    return await this.post('/api/auth/logout')
  }

  static async getPrivateData(token: string): Promise<any> {
    const response = await fetch(Api.baseUrl + '/api/private', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      },
      credentials: 'include',
      mode: 'cors'
    })
    return await response.json()
  }

  static async getCurrentUser(): Promise<any> {
    const response = await fetch(Api.baseUrl + '/api/auth/current', { method: 'GET', credentials: 'include' })
    return await response.json()
  }
}
