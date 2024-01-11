import { defineStore } from 'pinia';

export const useUserData = defineStore({
	id: 'user',
	state: () => ({
		userData: JSON.parse(localStorage.getItem('userData')),
	}),
	actions: {
		changeUser(name) {
			this.userData = JSON.parse(localStorage.getItem('userData'));
		},
	},
});
