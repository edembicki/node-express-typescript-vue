import axios from 'axios';

export const getApiAuth = async (username, pass) => {
	const userAuth = {
		email: username,
		password: pass,
	};
	let loading = true;
	const userData = [];

	await axios
		.post('http://localhost:3000/auth/login', userAuth)
		.then((response) => {
			userData['name'] = response.data.user.name;
			localStorage.setItem('userData', JSON.stringify(response.data.user));
		})
		.catch((error) => {
			return error.response.data.message;
		})
		.finally(() => (loading = false));

	const fetch = new Promise((resolve, reject) => {
		setTimeout(
			resolve({
				data: { username: userData['name'] },
			}),
			Math.random() * 1000
		);
	});
	const res = await fetch;
	if (res.data.username) {
		return true;
	}

	return false;
};

export const createUser = async (name, username, pass) => {
	const userAuth = {
		name: name,
		email: username,
		password: pass,
		role: 'admin',
	};
	let loading = true;
	const userData = [];
	await axios
		.post('http://localhost:3000/auth/signup', userAuth)
		.then((response) => {
			userData['name'] = response.data.user.name;
		})
		.catch((error) => {
			return error.response.data.message;
		})
		.finally(() => (loading = false));

	const fetch = new Promise((resolve, reject) => {
		setTimeout(
			resolve({
				data: { username: userData['name'] },
			}),
			Math.random() * 1000
		);
	});
	const res = await fetch;
	if (res.data.username) {
		return true;
	}

	return false;
};
