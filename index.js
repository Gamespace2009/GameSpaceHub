var home = document.getElementById("home");
var profil = document.getElementById("profil")
var main_text = document.getElementById("main_text")
var num = 0;
async function getProfile() {
    if (num == 0) {
            const token = localStorage.getItem('token');

        if (!token) {
            alert('Вы не авторизованы, сначала зарегистрируйтесь');
            window.location.href = "backend/регистрационная форма/form_regist.html"
        }

        const response = await fetch('http://192.168.0.14:3000/profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            profil.style.display = "flex"
            main_text.style.display = "none"
            document.getElementById("name").textContent = `Ваше имя: ${data.username}`
            document.getElementById("email").textContent = `ваша почта: ${data.email}` || "не давали"
            document.getElementById("date").textContent = `ваша дата рождения: ${data.birthDate}`
            // data.username, data.email, data.birthDate, data.created
        } else {
            alert('Ошибка: ' + data.message);
        }
        num = 1
    }
    else if (num == 1) {
        profil.style.display = "none"
        main_text.style.display = "grid"
        document.getElementById("name").textContent = ``
        document.getElementById("email").textContent = ``
        document.getElementById("date").textContent = ``
        num = 0
    }

}