const apiUrl = 'labWork7.php';

function setMessage(id, message, isError = true) {
	const element = document.getElementById(id);
	if (!element) return;
	element.textContent = message;
	element.style.color = isError ? 'var(--coral)' : 'var(--ink)';
}

async function request(action, payload = {}) {
	const response = await fetch(`${apiUrl}?action=${action}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload)
	});
	const result = await response.json();
	if (!response.ok || !result.success) throw new Error(result.message || 'Something went wrong.');
	return result;
}

const registerForm = document.getElementById('register-form');
if (registerForm) registerForm.addEventListener('submit', async (event) => {
	event.preventDefault();
	try {
		await request('register', Object.fromEntries(new FormData(event.target)));
		event.target.reset();
		setMessage('register-message', 'Account created. You can sign in now.', false);
	} catch (error) { setMessage('register-message', error.message); }
});

const loginForm = document.getElementById('login-form');
if (loginForm) loginForm.addEventListener('submit', async (event) => {
	event.preventDefault();
	try {
		await request('login', Object.fromEntries(new FormData(event.target)));
		window.location.href = 'dashboard.html';
	} catch (error) { setMessage('login-message', error.message); }
});

function escapeHtml(value) { return String(value).replace(/[&<>"']/g, (character) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#039;' })[character]); }

async function loadDirectory() {
	try {
		const result = await request('directory');
		const user = result.user;
		const firstPerson = result.people[0];
		const directoryTitle = document.getElementById('directory-title');
		document.getElementById('welcome-title').textContent = `Hello, ${user.name}`;
		document.getElementById('dashboard-subtitle').textContent = `Signed in as ${user.role}. You can view ${user.role === 'admin' ? 'employee' : 'administrator'} details.`;
		document.getElementById('directory-count').textContent = `${result.people.length} records`;
		document.getElementById('directory-list').innerHTML = result.people.map((person) => `<article class="person"><h4>${escapeHtml(person.name)}</h4><p class="role">${escapeHtml(person.role)}</p><p>${escapeHtml(person.email)}</p>${person.department ? `<p>${escapeHtml(person.department)}</p>` : ''}</article>`).join('');
		if (firstPerson && directoryTitle) directoryTitle.textContent = firstPerson.role === 'employee' ? 'Employee directory' : 'Administrator directory';
	} catch (error) { setMessage('dashboard-message', error.message); }
}

if (document.getElementById('directory-list')) loadDirectory();
const logoutButton = document.getElementById('logout-button');
if (logoutButton) logoutButton.addEventListener('click', async () => {
	try { await request('logout'); } finally { window.location.href = 'labWork7.html'; }
});