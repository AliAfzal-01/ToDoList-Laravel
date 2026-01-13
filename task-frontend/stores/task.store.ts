import { defineStore } from 'pinia'
import { ref, computed } from 'vue'



export const useTaskStore = defineStore('tasks', () => {
    const tasks = ref<any[]>([])
    const filter = ref<'all' | 'completed' | 'pending'>('all')

    const filteredTasks = computed(() => {
        if (filter.value === 'completed') return tasks.value.filter(t => t.completed)
        if (filter.value === 'pending') return tasks.value.filter(t => !t.completed)
        return tasks.value
    })

    const { request } = useApi()

    const fetchTasks = async () => {
        tasks.value = await request('/tasks')
    }

    const addTask = async (title: string) => {
        const task = await request('/tasks', { method: 'POST', body: { title } })
        tasks.value.push(task)
    }

    const toggleTask = async (id: number) => {
        const updated = await request(`/tasks/${id}`, { method: 'PATCH' })
        const index = tasks.value.findIndex(t => t.id === id)
        tasks.value[index] = updated
    }

    const deleteTask = async (id: number) => {
        await request(`/tasks/${id}`, { method: 'DELETE' })
        tasks.value = tasks.value.filter(t => t.id !== id)
    }

    return { tasks, filter, filteredTasks, fetchTasks, addTask, toggleTask, deleteTask }
})
