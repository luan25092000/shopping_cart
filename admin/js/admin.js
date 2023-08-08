document.getElementById('updateAndCancel').style.display = 'none';
localStorage.removeItem('productId');

if (localStorage.getItem('isLogin') === null || localStorage.getItem('isLogin') === 'undefined') {
    alert('Please login !');
    window.location.href = '/admin/login.html';
}

if (localStorage.getItem('products') != '' && localStorage.getItem('products') != null) {
    var products = JSON.parse(localStorage.getItem('products'));
    var html = `
        <tr>
            <th>ID Product</th>
            
            <th>Name</th>

            <th>Price</th>

            <th>Sale Price</th>

            <th>Image</th>

            <th>Action</th>
        </tr>
    `;
    if (products.length > 0) { // có sản phẩm
        for (var x of products) {
            html += `
             <tr>
                 <td>${x.productId}</td>
                 <td>${x.productName}</td>
                 <td>
                     ${x.productPrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
                 </td>
                 <td>
                     ${x.productSalePrice > 0 ? x.productSalePrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}) : ''}
                 </td>
                 <td>
                     <img src="${x.productLink}" width="200">
                 </td>
                 <td>
                     <button onclick="editProduct('${x.productId}')">Edit</button>
                     <button onclick="deleteProduct('${x.productId}')">Delete</button>
                 </td>
             </tr>
            `
         }
    } else {
        html += '<td align="center" colspan="6">Không có sản phẩm nào</td>';
    }
    document.getElementById('productTable').innerHTML = html;
}

var logoutBtn = document.getElementById('logoutBtn');
if (typeof(logoutBtn) != 'undefined' && logoutBtn != null) {
    logoutBtn.addEventListener('click', function() {
        var confirmLogout = confirm('Do you want to logout ?');
        if (confirmLogout) { // true
            alert('Logout successfully !');
            localStorage.removeItem('isLogin');
            window.location.href = '/admin/login.html';
        }
    });
}

var addBtn = document.getElementById('addBtn');
if (typeof(addBtn) != 'undefined' && addBtn != null) {
    addBtn.addEventListener('click', function() {
        var productName = document.getElementById('productName').value;
        var productPrice = document.getElementById('productPrice').value;
        var productSalePrice = document.getElementById('productSalePrice').value;
        var productLink = document.getElementById('productLink').value;

        if (productName.length === 0) {
            alert('Product name is required');
            return;
        }

        if (productPrice.length === 0) {
            alert('Product price is required');
            return;
        }

        if (isNaN(productPrice)) {
            document.getElementById('productPrice').value = '';
            alert('Product price must be a number');
            return;
        }

        if (productSalePrice.length !== 0) { // nếu như sale price có dữ liệu
            if (isNaN(productSalePrice)) {
                document.getElementById('productSalePrice').value = '';
                alert('Product sale price must be a number');
                return;
            }

            if (Number(productSalePrice) > Number(productPrice)) {
                document.getElementById('productSalePrice').value = '';
                alert('Product sale price must be less than product price');
                return;
            }
        }

        if (productLink.length === 0) {
            alert('Product link is required');
            return;
        }

        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        if (!pattern.test(productLink)) {
            document.getElementById('productLink').value = '';
            alert('Product link is invalid')
            return;
        }

        var productId = (Math.random() + 1).toString(36).substring(7); // random string

        var product = {
            'productId': productId,
            'productName': productName,
            'productPrice': Number(productPrice),
            'productSalePrice': Number(productSalePrice),
            'productLink': productLink
        }

        if (localStorage.getItem('products') == '' || localStorage.getItem('products') == null) {
            var products = [];
        } else {
            var products = JSON.parse(localStorage.getItem('products'));
        }

        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));

        document.getElementById('productName').value = '';
        document.getElementById('productPrice').value = '';
        document.getElementById('productSalePrice').value = '';
        document.getElementById('productLink').value = '';
        alert('Add Successfully');
        window.location.href = 'admin.html';
    });
}

function deleteProduct(productId) {
    var check = confirm('Bạn có chắc chắn muốn xóa sản phẩm này ?');
    if (check) { // true
        var products = JSON.parse(localStorage.getItem('products'));
        // object
        var filterProducts = products.filter(product => product.productId != productId);
        localStorage.setItem('products', JSON.stringify(filterProducts));
        alert('Delete Successfully');
        window.location.href = 'admin.html';
    }
}

var searchBtn = document.getElementById('searchBtn');
if (typeof(searchBtn) != 'undefined' && searchBtn != null) {
    searchBtn.addEventListener('click', function() {
        var searchItem = document.getElementById('searchItem').value.toLowerCase();
        if (searchItem.length === 0) {
            alert('Please fill product name in search input');
            return;
        }
        var products = JSON.parse(localStorage.getItem('products'));
        // Kiểm tra tên sản phẩm có chứa từ khóa mình search không
        var filterProducts = products.filter(product => product.productName.toLowerCase().indexOf(searchItem) > -1);
        var html = `
            <tr>
                <th>ID Product</th>
                
                <th>Name</th>

                <th>Price</th>

                <th>Sale Price</th>

                <th>Image</th>

                <th>Action</th>
            </tr>
        `;
        if (filterProducts.length > 0) { // có sản phẩm
            for (var x of filterProducts) {
                html += `
                <tr>
                    <td>${x.productId}</td>
                    <td>${x.productName}</td>
                    <td>
                        ${x.productPrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
                    </td>
                    <td>
                        ${x.productSalePrice > 0 ? x.productSalePrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}) : ''}
                    </td>
                    <td>
                        <img src="${x.productLink}" width="200">
                    </td>
                    <td>
                        <button onclick="editProduct('${x.productId}')">Edit</button>
                        <button onclick="deleteProduct('${x.productId}')">Delete</button>
                    </td>
                </tr>
                `
            }
        } else {
            html += '<td align="center" colspan="6">Không có sản phẩm nào</td>';
        }
    });
}

function editProduct(productId) {
    var products = JSON.parse(localStorage.getItem('products'));
    var productEdit = products.find(product => product.productId == productId);
    document.getElementById('productName').value = productEdit.productName;
    document.getElementById('productPrice').value = productEdit.productPrice;
    document.getElementById('productSalePrice').value = productEdit.productSalePrice;
    document.getElementById('productLink').value = productEdit.productLink;
    document.getElementById('addBtn').style.display = 'none';
    document.getElementById('updateAndCancel').style.display = 'block';
    localStorage.setItem('productId', productId);
}

function cancel() {
    document.getElementById('addBtn').style.display = 'block';
    document.getElementById('updateAndCancel').style.display = 'none';
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productSalePrice').value = '';
    document.getElementById('productLink').value = '';
    localStorage.removeItem('productId');
}

function update() {
    var productId = localStorage.getItem('productId');
    var products = JSON.parse(localStorage.getItem('products'));
    for (var key in products) {
        if (products[key].productId === productId) {
            var productName = document.getElementById('productName').value;
            var productPrice = document.getElementById('productPrice').value;
            var productSalePrice = document.getElementById('productSalePrice').value;
            var productLink = document.getElementById('productLink').value;

            if (productName.length === 0) {
                alert('Product name is required');
                return;
            }

            if (productPrice.length === 0) {
                alert('Product price is required');
                return;
            }

            if (isNaN(productPrice)) {
                document.getElementById('productPrice').value = '';
                alert('Product price must be a number');
                return;
            }

            if (productSalePrice.length !== 0) { // nếu như sale price có dữ liệu
                if (isNaN(productSalePrice)) {
                    document.getElementById('productSalePrice').value = '';
                    alert('Product sale price must be a number');
                    return;
                }

                if (Number(productSalePrice) > Number(productPrice)) {
                    document.getElementById('productSalePrice').value = '';
                    alert('Product sale price must be less than product price');
                    return;
                }
            }

            if (productLink.length === 0) {
                alert('Product link is required');
                return;
            }

            var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
            if (!pattern.test(productLink)) {
                document.getElementById('productLink').value = '';
                alert('Product link is invalid')
                return;
            }

            products[key].productName = productName;
            products[key].productPrice = productPrice;
            products[key].productSalePrice = productSalePrice;
            products[key].productLink = productLink;
        }

        localStorage.setItem('products', JSON.stringify(products));
        alert('Update Successfully');
        window.location.href = 'admin.html';
    }
}
