export const useApi = () => {
    const config = useRuntimeConfig()
    const token = useCookie('token')

    const request = async (url: string, options: any = {}) => {
        return await $fetch(config.public.apiBase + url, {
            ...options,
            headers: {
                Authorization: token.value ? `Bearer ${token.value}` : '',
                Accept: 'application/json',
                ...options.headers
            }
        })
    }

    return { request }
}
