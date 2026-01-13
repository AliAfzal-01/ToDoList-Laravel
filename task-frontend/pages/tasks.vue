<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useTaskStore } from '~/stores/task.store'
import { useAuthStore } from '~/stores/auth.store'
import { definePageMeta } from '#imports'

definePageMeta({
  middleware: 'auth'
})

const taskStore = useTaskStore()
const { filteredTasks, filter } = storeToRefs(taskStore)
const newTaskTitle = ref('')

onMounted(() => {
  taskStore.fetchTasks()
})

const handleAddTask = async () => {
  if (!newTaskTitle.value.trim()) return
  
  await taskStore.addTask(newTaskTitle.value)
  newTaskTitle.value = ''
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<template>
  <div class="tasks-container">
    <div class="tasks-card">
      <header class="header">
        <div>
          <h1 class="title">My Tasks</h1>
          <p class="subtitle">Stay organized and productive</p>
        </div>
        <button @click="useAuthStore().logout()" class="btn-logout">
          Logout
        </button>
      </header>

      <div class="add-task-section">
        <form @submit.prevent="handleAddTask" class="add-task-form">
          <input 
            v-model="newTaskTitle"
            type="text" 
            placeholder="What needs to be done?" 
            class="input-field task-input"
          />
          <button type="submit" class="btn btn-primary check-btn">
            Add
          </button>
        </form>
      </div>

      <div class="filters">
        <button 
          v-for="f in ['all', 'pending', 'completed']" 
          :key="f"
          @click="filter = f as any"
          :class="['filter-btn', { active: filter === f }]"
        >
          {{ f.charAt(0).toUpperCase() + f.slice(1) }}
        </button>
      </div>

      <div class="task-list">
        <div v-if="filteredTasks.length === 0" class="empty-state">
          No tasks found
        </div>
        
        <TransitionGroup name="list">
          <div 
            v-for="task in filteredTasks" 
            :key="task.id" 
            class="task-item"
            :class="{ completed: task.completed }"
          >
            <div class="task-content">
              <label class="checkbox-container">
                <input 
                  type="checkbox" 
                  :checked="task.completed"
                  @change="taskStore.toggleTask(task.id)"
                >
                <span class="checkmark"></span>
              </label>
              <div class="task-text">
                <span class="task-title">{{ task.title }}</span>
                <span class="task-date">{{ formatDate(task.created_at) }}</span>
              </div>
            </div>
            
            <button @click="taskStore.deleteTask(task.id)" class="delete-btn" aria-label="Delete task">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tasks-container {
  min-height: 100vh;
  padding: 2rem;
  background-color: var(--bg-color);
  display: flex;
  justify-content: center;
}

.tasks-card {
  background-color: var(--card-bg);
  border-radius: 1rem;
  width: 100%;
  max-width: 600px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-color);
  height: fit-content;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.title {
  color: var(--text-color);
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.subtitle {
  color: var(--text-muted);
  font-size: 0.875rem;
}

.btn-logout {
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-muted);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-logout:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-color);
}

.add-task-form {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.task-input {
  flex: 1;
}

.filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.filter-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover {
  color: var(--text-color);
  background: rgba(255, 255, 255, 0.05);
}

.filter-btn.active {
  background-color: var(--primary);
  color: white;
}

.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 0.75rem;
  margin-bottom: 0.75rem;
  border: 1px solid transparent;
  transition: all 0.2s;
}

.task-item:hover {
  border-color: var(--border-color);
  background: rgba(255, 255, 255, 0.04);
}

.task-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.task-text {
  display: flex;
  flex-direction: column;
}

.task-title {
  color: var(--text-color);
  font-weight: 500;
  transition: color 0.2s;
}

.task-date {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 0.25rem;
}

.completed .task-title {
  color: var(--text-muted);
  text-decoration: line-through;
}

.checkbox-container {
  display: block;
  position: relative;
  cursor: pointer;
  width: 20px;
  height: 20px;
}

.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: transparent;
  border: 2px solid var(--text-muted);
  border-radius: 6px;
  transition: all 0.2s;
}

.checkbox-container:hover input ~ .checkmark {
  border-color: var(--primary);
}

.checkbox-container input:checked ~ .checkmark {
  background-color: var(--success);
  border-color: var(--success);
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

.checkbox-container .checkmark:after {
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.delete-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s;
  opacity: 0;
}

.task-item:hover .delete-btn {
  opacity: 1;
}

.delete-btn:hover {
  color: var(--danger);
  background: rgba(239, 68, 68, 0.1);
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--text-muted);
}

/* List Transitions */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
