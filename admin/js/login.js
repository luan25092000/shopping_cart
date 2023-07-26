if (localStorage.getItem('isLogin') !== null && localStorage.getItem('isLogin') !== 'undefined') {
    window.location.href = '/admin/admin.html';
}

document.getElementById('submitBtnLogin').addEventListener('click', function() {
    var username = document.getElementById('userNameLogin').value;
    var password = document.getElementById('passwordLogin').value;
    if (username.length === 0) {
        alert('Username is required');
        return;
    }

    if (password.length === 0) {
        alert('Password is required');
        return;
    }

    if (username === 'admin' && password === 'admin') {
        localStorage.setItem('isLogin', 1);
        alert('Logged in Successfully');
        window.location.href = '/admin/admin.html';
    } else {
        alert('Username / Password is not correct !');
    }
});
