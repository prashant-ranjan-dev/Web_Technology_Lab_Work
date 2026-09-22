const apiUrl = 'labWork7.php';
const views = document.querySelectorAll('.view');
const navLinks = document.querySelectorAll('[data-view]');
const session = { user: null };

function showView(viewName) {
	views.forEach((view) => view.classList.toggle('active-view', view.id === viewName));
	window.location.hash = viewName;
	if (viewName === 'dashboard') loadDirectory();
}

function setMessage(id, message, isError = true) {
	const element = document.getElementById(id);
	element.textContent = message;
	element.style.color = isError ? 'var(--coral)' : 'var(--ink)';
}

async function request(action, payload = {}) {
	const response = await fetch(`${apiUrl}?action=${action}`, {
		method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
	});
	const result = await response.json();
	if (!response.ok || !result.success) throw new Error(result.message || 'Something went wrong.');
	return result;
}

document.getElementById('register-form').addEventListener('submit', async (event) => {
	event.preventDefault();
	const data = Object.fromEntries(new FormData(event.target));
	try {
		await request('register', data);
		event.target.reset();
		setMessage('register-message', 'Account created. You can sign in now.', false);
	} catch (error) { setMessage('register-message', error.message); }
});

document.getElementById('login-form').addEventListener('submit', async (event) => {
	event.preventDefault();
	const data = Object.fromEntries(new FormData(event.target));
	try {
		const result = await request('login', data);
		session.user = result.user;
		event.target.reset();
		showView('dashboard');
	} catch (error) { setMessage('login-message', error.message); }
});

async function loadDirectory() {
	if (!session.user) return;
	document.getElementById('welcome-title').textContent = `Hello, ${session.user.name}`;
	document.getElementById('dashboard-subtitle').textContent = `Signed in as ${session.user.role}. You can view ${session.user.role === 'admin' ? 'employee' : 'administrator'} details.`;
	document.getElementById('directory-title').textContent = session.user.role === 'admin' ? 'Employee directory' : 'Administrator directory';
	try {
		const result = await request('directory');
		document.getElementById('directory-count').textContent = `${result.people.length} records`;
		document.getElementById('directory-list').innerHTML = result.people.map((person) => `<article class="person"><h4>${escapeHtml(person.name)}</h4><p class="role">${escapeHtml(person.role)}</p><p>${escapeHtml(person.email)}</p>${person.department ? `<p>${escapeHtml(person.department)}</p>` : ''}</article>`).join('');
	} catch (error) { setMessage('dashboard-message', error.message); }
}

function escapeHtml(value) { return String(value).replace(/[&<>"']/g, (character) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#039;' })[character]); }

document.getElementById('logout-button').addEventListener('click', async () => {
	await request('logout');
	session.user = null;
	showView('home');
});
navLinks.forEach((link) => link.addEventListener('click', (event) => {
	const targetId = link.getAttribute('href').slice(1);
	const isHomeSection = link.dataset.view === 'home' && targetId !== 'home' && document.getElementById(targetId);
	event.preventDefault();
	showView(link.dataset.view);
	if (isHomeSection) window.setTimeout(() => document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' }), 0);
}));

const initialView = window.location.hash.slice(1);
if (['register', 'login'].includes(initialView)) showView(initialView);
if (['solutions', 'industries', 'about'].includes(initialView)) {
	showView('home');
	window.setTimeout(() => document.getElementById(initialView).scrollIntoView(), 0);
}
