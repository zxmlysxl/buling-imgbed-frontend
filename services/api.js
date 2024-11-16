const useApi = () => {
  const config = useRuntimeConfig()
  const { token } = useAuth()
  
  const baseHeaders = {
    'Content-Type': 'application/json',
  }

  const getAuthHeaders = () => ({
    ...baseHeaders,
    'Authorization': `Bearer ${token.value}`
  })


  return {
    // 认证相关
    async login(credentials) {
      const response = await fetch(`${config.public.apiBase}/auth/login`, {
        method: 'POST',
        headers: baseHeaders,
        body: JSON.stringify(credentials)
      })
      return response.json()
    },

    // 列出所有图片
    async getImages(body) {
      const response = await fetch(`${config.public.apiBase}/image/list`, {
        headers: getAuthHeaders(),
        method: 'POST',
        body: JSON.stringify(body)
      })
      const data = await response.json()
      return data
    },

    async deleteImage(files) {

      const response = await fetch(`${config.public.apiBase}/image/delete`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        body: JSON.stringify({ files })
      })
      return response.ok
    },

    async uploadImage(formData) {
      const response = await fetch(`${config.public.apiBase}/image/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token.value}`
        },
        body: formData
      })
      return response.json()
    },

    // 个人资料相关
    async getProfile() {
      const response = await fetch(`${config.public.apiBase}/user/profile`, {
        headers: getAuthHeaders()
      })
      const data = await response.json()
      console.log('api----'+data)
      return data
    },

    async updateProfile(profileData) {
     
      const response = await fetch(`${config.public.apiBase}/user/update`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(profileData)
      })
      return response.json()
    }
  }
}

export default useApi 