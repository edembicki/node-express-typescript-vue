import { defineStore } from 'pinia';
import axios from 'axios';

export const getDbTasks = async () => {

	let loading = true;

	axios
		.get('http://localhost:3000/api/tasks')
		.then((response) => {
			localStorage.setItem('tasks', JSON.stringify(response.data.data));
			location.reload();
		})
		.catch((error) => {
			return error.response.data.message;
		})
		.finally(() => (loading = false));

};

export const useToDoStore = defineStore({
	id: 'todo',
	state: () => ({
		task: '',
		userData: JSON.parse(localStorage.getItem('userData')),
		editedTask: null,
		statuses: ['in-progress', 'finished'],
		tasks: localStorage.getItem('tasks')
			? JSON.parse(localStorage.getItem('tasks'))
			: getDbTasks(),
	}),
	actions: {
		logout() {
			localStorage.clear();
			window.location.href = '/';
		},

		changeStatus(index) {
			let newIndex = this.statuses.indexOf(this.tasks[index].status);
			if (++newIndex > 2) newIndex = 0;
			this.tasks[index].status = this.statuses[newIndex];
		},

		deleteTask(index) {
			this.tasks.splice(index, 1);
		},

		editTask(index) {
			this.task = this.tasks[index].name;
			this.editedTask = index;
		},

		submitTask() {
			let repeated = false;
			if (this.task.length === 0) return;

			if (this.editedTask != null) {
				this.tasks[this.editedTask].name = this.task;
				this.editedTask = null;
			} else {
				if (this.tasks) {
					this.tasks.forEach((task) => {
						console.log(task);
						if (task.description === this.task) {
							alert('Tarefa já existe com essa descrição!');
							repeated = true;
						}
					});
				}

				if (!repeated) {
					const taskData = {
						title: this.task,
						description: this.task,
						status: 'in-progress',
						user_id: this.userData.id,
					};
					axios
						.post('http://localhost:3000/api/tasks', taskData)
						.then((response) => {
							console.log(response.data);
						})
						.catch((error) => {
							console.log(error);
							this.errored = true;
						})
						.finally(() => (this.loading = false));

					this.tasks.push(taskData);
				}
			}

			this.task = '';
		},

		changeTaskValue(value) {
			this.task = value;
		},
	},
});
