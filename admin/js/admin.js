if (localStorage.getItem('isLogin') === null || localStorage.getItem('isLogin') === 'undefined') {
    alert('Please login !');
    window.location.href = '/admin/login.html';
}

document.getElementById('logoutBtn').addEventListener('click', function() {
    var confirmLogout = confirm('Do you want to logout ?');
    if (confirmLogout) { // true
        alert('Logout successfully !');
        localStorage.removeItem('isLogin');
        window.location.href = '/admin/login.html';
    }
});
