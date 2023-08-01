if (localStorage.getItem('isLogin') !== null && localStorage.getItem('isLogin') !== 'undefined') {
    window.location.href = '/admin/admin.html';
}

var loginBtn = document.getElementById('submitBtnLogin');
if (typeof(loginBtn) != 'undefined' && loginBtn != null) { 
    loginBtn.addEventListener('click', function() {
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
}

// Bắt sự kiện cho toàn trang, cụ thể là sự kiện nhấn nút trên bàn phím
window.addEventListener('keypress', function(e) {
    if (e.keyCode === 13) { // kiểm tra xem nút mình bấm có phải là nút enter
        loginBtn.click();
    }
});
