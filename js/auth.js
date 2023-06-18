var submitBtn = document.getElementById('submitBtn');
// check exist submit btn
if (typeof(submitBtn) != 'undefined' && submitBtn != null) {
    submitBtn.addEventListener('click', function() {
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        // Kiểm tra name không được để trống
        if (name.length === 0) {
            alert('Name is required');
            return;
        }

        // Kiểm tra password có ít nhất 6 kí tự
        if (password.length < 6) {
            alert('Password needs at least 6 characters');
            return;
        }

        // Kiểm tra email
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            alert('Email is invalid');
            return;
        }

        // Logic lưu nhiều tài khoản user
        var user = {
            'name': name,
            'email': email,
            'password': password
        };
        // Check not exist users localStorage
        if (localStorage.getItem('users') == '' || localStorage.getItem('users') == null) {
            var users = [];
        // Check exist users localStorage
        } else {
            // JSON.parse là đưa string về dạng mảng lại
            var users = JSON.parse(localStorage.getItem('users')); // have value
        }
        // Đưa user vào mảng users
        users.push(user);
        // Localstorage chỉ lưu được giá trị chữ hoặc số, còn mảng hoặc object thì không lưu được
        // JSON.stringify đưa mảng về string
        localStorage.setItem('users', JSON.stringify(users));
        // -----------------------------------------------------
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        alert('Registered Successfully');
        window.location.href = '../login.html';
    });
}

var submitBtnLogin = document.getElementById('submitBtnLogin');
// check exist submit btn login
if (typeof(submitBtnLogin) != 'undefined' && submitBtnLogin != null) {
    submitBtnLogin.addEventListener('click', function() {
        var emailLogin = document.getElementById('emailLogin').value;
        var passwordLogin = document.getElementById('passwordLogin').value;
        if (localStorage.getItem('users') != '' && localStorage.getItem('users') != null) {
            var users = JSON.parse(localStorage.getItem('users'));
            for (var x of users) {
                // x sẽ là từng cái object user trong mảng users
                if (emailLogin == x.email && passwordLogin == x.password) {
                    localStorage.setItem('name', x.name);
                    localStorage.setItem('email', x.email);
                    localStorage.setItem('isLogin', true); // Kiểm tra đăng nhập
                    alert('Logged in Successfully');
                    window.location.href = '../index.html';
                    return ; // chặn không cho chạy đoạn code dưới
                }
            }
        }
        alert('Email / Password is not correct !');
        document.getElementById('emailLogin').value = '';
        document.getElementById('passwordLogin').value = '';
    });
}

// Kiểm tra đã đăng nhập hay chưa
if (localStorage.getItem('isLogin') != '' && localStorage.getItem('isLogin') != null) {
    var html = `
    <li>
        <a href="#"><i class="fa-solid fa-house"></i> Trang chủ</a>
    </li>
    <li>
        <a href="#"><i class="fa-solid fa-users"></i> Giới thiệu</a>
    </li>
    <li>
        <a href="#"><i class="fa-solid fa-newspaper"></i> Tin tức</a>
    </li>
    <li>
        <a href="javascript:void(0)">Xin chào, ${localStorage.getItem('name')}</a>
    </li>
    <li>
        <a href="javascript:void(0)" onclick="logout()"><i class="fa-solid fa-right-to-bracket"></i> Đăng xuất</a>
    </li>
    `;
} else {
    var html = `
    <li>
        <a href="#"><i class="fa-solid fa-house"></i> Trang chủ</a>
    </li>
    <li>
        <a href="#"><i class="fa-solid fa-users"></i> Giới thiệu</a>
    </li>
    <li>
        <a href="#"><i class="fa-solid fa-newspaper"></i> Tin tức</a>
    </li>
    <li>
        <a href="login.html"><i class="fa-solid fa-right-to-bracket"></i> Đăng nhập</a>
    </li>
    <li>
        <a href="register.html"><i class="fa-solid fa-right-to-bracket"></i> Đăng ký</a>
    </li>
    `;
}
document.getElementById('menu').innerHTML = html;

function logout() {
    localStorage.removeItem('isLogin');
    window.location.href = 'login.html';
}
