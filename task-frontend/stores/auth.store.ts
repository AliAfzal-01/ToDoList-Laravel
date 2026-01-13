import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useApi, useCookie, navigateTo } from '#imports'

export const useAuthStore = defineStore('auth', () => {
    const token = useCookie<string | null>('token')
    const isAuthenticated = computed(() => !!token.value)

    const login = async (email: string, password: string) => {
        const { request } = useApi()
        const res: any = await request('/login', {
            method: 'POST',
            body: { email, password }
        })
        token.value = res.token
    }

    const logout = () => {
        token.value = null
        navigateTo('/login')
    }

    return { token, isAuthenticated, login, logout }
})
