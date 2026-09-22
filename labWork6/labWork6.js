const pages = document.querySelectorAll('.page');
const courseOptions = { UG: ['BSc. Computer Science', 'BTech Computer Science'], PG: ['MSc. Computer Science', 'MTech Computer Science', 'MCA'] };
const users = () => JSON.parse(localStorage.getItem('departmentUsers') || '[]');

function showPage(id) {
    pages.forEach(page => page.classList.toggle('active', page.id === id));
    window.scrollTo(0, 0);
}

function message(id, text, type = '') {
    const element = document.getElementById(id);
    element.className = `message ${type}`;
    element.textContent = text;
}

function updateCourses() {
    const level = document.getElementById('level').value;
    document.getElementById('course').innerHTML = courseOptions[level].map(course => `<option>${course}</option>`).join('');
}

function updateRoleFields() {
    const isStudent = document.querySelector('input[name="role"]:checked').value === 'student';
    document.getElementById('studentFields').classList.toggle('hidden', !isStudent);
    document.getElementById('employeeFields').classList.toggle('hidden', isStudent);
    document.getElementById('course').required = isStudent;
}

function renderDashboard(user) {
    const detail = user.role === 'student' ? `<div><span>Programme</span>${user.course}</div><div><span>Level</span>${user.level === 'UG' ? 'Undergraduate' : 'Postgraduate'}</div>` : `<div><span>Role</span>Employee</div><div><span>Designation</span>${user.designation}</div>`;
    document.getElementById('dashboardContent').innerHTML = `<p class="eyebrow">MEMBER DASHBOARD</p><h2>Hello, ${user.name}.</h2><p>Your Department of Computer Science profile is active and ready.</p><div class="dashboard-details"><div><span>Email</span>${user.email}</div>${detail}</div><button id="logoutButton">Sign out <span>&rarr;</span></button>`;
    document.getElementById('logoutButton').onclick = () => showPage('home');
}

document.querySelectorAll('[data-page]').forEach(element => element.onclick = () => showPage(element.dataset.page));
document.getElementById('level').onchange = updateCourses;
document.querySelectorAll('input[name="role"]').forEach(input => input.onchange = updateRoleFields);
document.getElementById('registerForm').onsubmit = event => {
    event.preventDefault();
    const form = event.target;
    const role = form.querySelector('input[name="role"]:checked').value;
    const email = document.getElementById('email').value.trim().toLowerCase();
    const list = users();
    if (list.some(user => user.email === email)) return message('registerMessage', 'This email address is already registered.', 'error');
    const user = { name: document.getElementById('name').value.trim(), email, password: document.getElementById('password').value, department: 'Department of Computer Science', role };
    if (role === 'student') Object.assign(user, { level: document.getElementById('level').value, course: document.getElementById('course').value });
    else user.designation = document.getElementById('designation').value;
    list.push(user);
    localStorage.setItem('departmentUsers', JSON.stringify(list));
    message('registerMessage', 'Your profile has been created. You can now sign in.');
    form.reset();
    updateCourses();
    updateRoleFields();
};
document.getElementById('loginForm').onsubmit = event => {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;
    const user = users().find(item => item.email === email && item.password === password);
    if (!user) return message('loginMessage', 'The email or password is incorrect.', 'error');
    renderDashboard(user);
    showPage('dashboard');
    event.target.reset();
};
updateCourses();
updateRoleFields();