// 📌 lib/api.ts
import axios from 'axios'
import { IComment } from '@/types/types'
const API_BASE_URL = 'https://jsonplaceholder.typicode.com' // URL de la API externa

// 🛠️ Configuración del cliente Axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 📌 Función genérica para obtener datos de la API
const fetchData = async (endpoint: string, params = {}) => {
  try {
    const response = await apiClient.get(endpoint, { params })
    return response.data
  } catch (error) {
    console.error(`❌ Error al obtener datos de ${endpoint}:`, error)
    throw new Error('No se pudieron cargar los datos.')
  }
}

// 🔹 Obtener todos los usuarios
export const getUsers = async () => fetchData('/users')

// 🔹 Obtener un usuario por ID
export const getUserById = async (id: number) => fetchData(`/users/${id}`)

// 🔹 Obtener publicaciones con paginación
export const getPosts = async (page: number, searchQuery?: string) => {
  const { data } = await apiClient.get('/posts', {
    params: {
      _limit: 10,
      _page: page,
      q: searchQuery || undefined, // Solo añade el filtro si existe
    },
  })
  return data
}

// 🔹 Obtener un post por ID
export const getPostById = async (id: number) => fetchData(`/posts/${id}`)

// ✅ Obtener comentarios de un post por ID
export const getCommentsByPostId = async (postId: string) => {
  const { data } = await apiClient.get(`/comments`, { params: { postId } })
  return data
}

// ✅ Agregar un nuevo comentario
export const addComment = async (
  newComment: Omit<IComment, 'id'>,
): Promise<IComment> => {
  const { data } = await apiClient.post<IComment>('/comments', newComment)
  return data
}
