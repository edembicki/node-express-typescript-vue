<script>
import { mapState, mapActions } from 'pinia';
import { useToDoStore } from '@/stores/todo';
import { useUserData } from '@/stores/user';
export default {
	data() {
		return { taskValue: '' };
	},

	computed: {
		...mapState(useToDoStore, ['task', 'editedTask', 'statuses', 'tasks']),
		...mapState(useUserData, ['userData']),
	},

	mounted() {
		if (
			!sessionStorage.getItem('isLogin') ||
			sessionStorage.getItem('isLogin') == false
		) {
			try {
				this.$router.push({ name: 'login' });
			} catch (err) {
				console.error(err);
			}
		}
	},

	methods: {
		...mapActions(useToDoStore, [
			'changeStatus',
			'deleteTask',
			'editTask',
			'logout',
			'submitTask',
			'changeTaskValue',
		]),

		capitalizeFirstChar(str) {
			return str.charAt(0).toUpperCase() + str.slice(1);
		},

		focusInput() {
			this.$nextTick(() => this.$refs.taskInput.focus());
		},
	},

	watch: {
		taskValue() {
			this.changeTaskValue(this.taskValue);
		},

		task() {
			this.taskValue = this.task;
		},

		tasks: {
			handler: function (val) {
				localStorage.setItem('tasks', JSON.stringify(val));
			},
			deep: true,
		},
	},
};
</script>

<template>
	<section>
		<div class="todo-bg-top"></div>
		<div class="todo-bg-bottom"></div>
	</section>
	<section class="todo-wrapper">
		<div class="container">
			<div class="todo-container">
				<div class="todo-app">
					<h2 class="todo-title">Lista de Tarefas de {{ userData.name }}!</h2>
					<form id="todo-form" class="todo-form" @submit.prevent="submitTask">
						<input
							form="todo-form"
							type="text"
							v-model="taskValue"
							ref="taskInput"
							placeholder="Enter task "
							class="w-100 form-control"
						/>
						<button
							type="submit"
							form="todo-form"
							class="btn btn-warning rounded-0"
						>
							novo +
						</button>
					</form>

					<table>
						<thead>
							<tr>
								<th scope="col">Task</th>
								<th scope="col" class="status-title">Status</th>
								<th scope="col" class="action-title">Excluir</th>
								<th scope="col" class="action-title">Editar</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(task, index) in tasks" :key="index">
								<td>
									<span
										class="task"
										:class="{
											finished: task.status === 'finished',
											'in-progress': task.status === 'in-progress',
										}"
									>
										{{ task.description }}
									</span>
								</td>
								<td class="status-container">
									<span
										class="status"
										@click="changeStatus(index)"
										:class="{
											'text-danger': task.status === 'to-do',
											'text-success': task.status === 'finished',
											'text-warning': task.status === 'in-progress',
										}"
									>
										{{ capitalizeFirstChar(task.status) }}
									</span>
								</td>
								<td>
									<div
										class="action-item"
										title="delete task"
										@click="deleteTask(index)"
									>
										<span>👎</span>
									</div>
								</td>
								<td>
									<div
										class="action-item"
										title="edit task"
										@click="
											editTask(index);
											focusInput();
										"
									>
										<span>✍️</span>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
					<button
						type="button"
						class="btn logout-btn btn-warning rounded-0"
						@click="logout()"
					>
						Logout
					</button>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
table {
	width: 100%;
	margin-top: 30px;
	font-size: 1.125rem;
}

@media screen and (max-width: 640px) {
	table {
		font-size: 0.875rem;
	}
}

th {
	font-size: 1.25rem;
	padding-bottom: 15px;
	color: var(--dark2);
	font-family: 'Roboto-Bold';
}

@media screen and (max-width: 640px) {
	th {
		font-size: 1rem;
		padding-bottom: 10px;
	}
}

.action-item {
	text-align: center;
}

.action-item span {
	cursor: pointer;
}

.text-success {
	color: var(--green);
}

.text-danger {
	color: var(--red);
}

.text-warning {
	color: var(--yellow);
}

.task {
	font-family: 'Roboto-Light';
}

.status-title {
	width: 120px;
	text-align: center;
}

.action-title {
	text-align: center;
}

.status {
	cursor: pointer;
	user-select: none;
	transition: color 0.15s linear;
}

.status-container {
	text-align: center;
}

.status:hover {
	color: initial;
}

.in-progress {
	text-decoration: underline;
	font-family: 'Roboto-Medium';
}

.finished {
	text-decoration: line-through;
	color: var(--gray);
}

.todo-bg-top {
	background: linear-gradient(
		0deg,
		rgb(0 0 0 / 67%) 0%,
		rgb(20 100 122 / 77%) 100%
	);
	width: 100%;
	height: 100vh;
}

.logout-btn {
	margin-top: 10rem;
}
.todo-img {
	width: 186px;
	height: 119px;
	margin: 65px 0;
}

@media screen and (max-width: 768px) {
	.todo-img {
		width: 125px;
		height: 82px;
		margin: 35px 0;
	}
}

@media screen and (max-width: 640px) {
	.todo-img {
		width: 85px;
		height: 55px;
		margin: 30px 0;
	}
}

.todo-img > img {
	width: 100%;
	height: 100%;
	object-fit: contain;
	object-position: center;
}

.todo-wrapper {
	position: absolute;
	z-index: 1;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	height: 100%;
}

.todo-wrapper > .container {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.todo-container {
	background: #ffffff70;
	border-radius: 14px;
	box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.1);
	width: 100%;
	padding: 32px;
	min-height: 660px;
	margin-top: 5rem;
}

.todo-title {
	font-size: 3.75rem;
	font-family: 'Roboto-Bold';
	margin-bottom: 60px;
	text-align: center;
}

@media screen and (max-width: 768px) {
	.todo-title {
		font-size: 3rem;
		margin-bottom: 30px;
	}
}

@media screen and (max-width: 640px) {
	.todo-title {
		font-size: 1.5rem;
	}
}

.todo-form {
	display: flex;
	width: 100%;
}

.todo-form input {
	margin-right: 20px;
	width: 70%;
	font-family: 'Roboto-Light';
	font-size: 1.125rem;
	padding: 0 10px;
	height: 53px;
}

@media screen and (max-width: 640px) {
	.todo-form input {
		font-size: 0.875rem;
		height: 40px;
	}
}

.todo-form button {
	width: 30%;
}

.todo-app {
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: 768px;
	margin: 0 auto;
	width: 100%;
	padding: 0 32px;
}

@media screen and (max-width: 768px) {
	.todo-app {
		padding: 0;
	}
}

@media screen and (max-width: 640px) {
	.btn {
		padding: 4px;
	}
}
</style>
