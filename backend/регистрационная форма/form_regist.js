document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
        const mode = this.dataset.mode;

        // Переключаем активный класс у кнопок
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');

        // Показываем нужную форму
        document.getElementById('loginForm').classList.toggle('active', mode === 'login');
        document.getElementById('registerForm').classList.toggle('active', mode === 'register');
    });
});


// ===== ВХОД =====
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const response = await fetch('http://192.168.0.14:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
        // ✅ СОХРАНЯЕМ ТОКЕН И ИМЯ
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);

        alert('✅ Вход выполнен!');
        window.location.href = '../../index.html'; // или куда нужно
    } else {
        alert('❌ ' + data.message);
    }
});

// ===== РЕГИСТРАЦИЯ =====
document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
    const email = document.getElementById('regEmail').value;
    const birthDate = document.getElementById('regBirthDate').value;

    const response = await fetch('http://192.168.0.14:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email, birthDate })
    });

    const data = await response.json();

    if (response.ok) {
        alert('✅ Регистрация прошла успешно!');

        // 🔥 АВТОВХОД ПОСЛЕ РЕГИСТРАЦИИ
        const loginResponse = await fetch('http://192.168.0.14:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const loginData = await loginResponse.json();

        if (loginResponse.ok) {
            localStorage.setItem('token', loginData.token);
            localStorage.setItem('username', loginData.username);
            window.location.href = '../../index.html';
        } else {
            alert('❌ Ошибка автоматического входа: ' + loginData.message);
        }
    } else {
        alert('❌ ' + data.message);
    }
});