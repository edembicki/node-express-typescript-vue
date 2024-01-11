import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: LoginView,
		},
		{
			path: '/login',
			name: 'login',
			component: LoginView,
		},
    {
			path: '/register',
			name: 'register',
			component: RegisterView,
		},
		{
			path: '/todo',
			name: 'todo',
			component: () => import('../views/ToDoView.vue'),
		},
	],
});

export default router;
