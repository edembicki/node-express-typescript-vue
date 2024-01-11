<script>
import { mapActions } from 'pinia';
import { useUserData } from '@/stores/user';
import { createUser } from '../helpers';

export default {
	data() {
		return {
			name: '',
			username: '',
			pass: '',
			error: false,
		};
	},

	methods: {
		...mapActions(useUserData, ['changeUser']),

		async submitAuth() {
			try {
				const registered = await createUser(
					this.name,
					this.username,
					this.pass
				);
				if (registered) {
					this.$router.push({ name: 'login' });
				} else {
					this.error = true;
				}
			} catch (err) {
				console.error(err);
			}
		},

		clearError() {
			if (this.error === true) this.error = false;
		},
	},

	watch: {
		username() {
			this.clearError();
		},

		pass() {
			this.clearError();
		},
	},
};
</script>

<template>
	<form name="login-form" id="login-form" @submit.prevent="submitAuth">
		<div class="input-container">
			<input
				type="text"
				name="name"
				form="login-form"
				v-model="name"
				required
				:class="{
					error: error === true,
				}"
			/>
			<label for="name">Nome</label>
		</div>
		<div class="input-container">
			<input
				type="text"
				name="email"
				form="login-form"
				v-model="username"
				required
				:class="{
					error: error === true,
				}"
			/>
			<label for="email">Email</label>
		</div>
		<div class="input-container">
			<input
				type="password"
				name="password"
				form="login-form"
				v-model="pass"
				required
				:class="{
					error: error === true,
				}"
			/>
			<label for="password">Password</label>
			<p
				class="error-text"
				:class="{
					error: error === true,
				}"
			>
				Algo errado, tente novamente!
			</p>
		</div>
		<button class="btn" form="login-form" type="submit">registrar</button>
	</form>
</template>

<style scoped>
form {
	width: 480px;
	padding: 40px 30px 23px 30px;
	display: flex;
	flex-direction: column;
}

@media screen and (max-width: 640px) {
	form {
		width: 100%;
	}
}

.input-container {
	display: flex;
	flex-direction: column-reverse;
	margin-bottom: 40px;
}

@media screen and (max-width: 640px) {
	.input-container {
		margin-bottom: 20px;
	}
}

.input-container input {
	order: 2;
	font-family: 'Roboto-Light';
	font-size: 1.125rem;
	padding: 0 10px;
	height: 53px;
}

@media screen and (max-width: 640px) {
	.input-container input {
		font-size: 0.875rem;
		height: 40px;
	}
}

.input-container label {
	order: 3;
	font-family: 'Roboto-Light';
	font-size: 1.125rem;
	margin-bottom: 4px;
}

@media screen and (max-width: 640px) {
	.input-container label {
		font-size: 0.875rem;
	}
}

.error-text {
	height: 0;
	opacity: 0;
	overflow: hidden;
	color: var(--red);
	order: 1;
	line-height: 19px;
	transition: height 0.1s linear, opacity 0.1s linear 0.1s;
}

.error-text.error {
	opacity: 1;
	height: 26px;
	padding-top: 6px;
}

@media screen and (max-width: 640px) {
	.error-text {
		font-size: 0.875rem;
	}
}

.error-text::before {
	content: url('@/assets/icons/cross.svg');
	margin-right: 10px;
	color: var(--red);
}

.forgot-btn {
	display: block;
	margin: 20px 0;
	text-align: center;
	line-height: 23px;
	font-size: 1.25rem;
}

@media screen and (max-width: 640px) {
	.forgot-btn {
		font-size: 1rem;
	}
}

.register-btn {
	display: block;
	background-color: var(--gray2);
	color: var(--dark);
	padding: 17px;
	text-align: center;
	font-size: 1.563rem;
	line-height: 29px;
	transition: color 0.1s linear;
}

@media screen and (max-width: 640px) {
	.register-btn {
		font-size: 1rem;
		padding: 10px;
	}
}

.register-btn:hover {
	color: var(--blue);
}
</style>
