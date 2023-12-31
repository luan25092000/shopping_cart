if (localStorage.getItem('products') != '' && localStorage.getItem('products') != null) {
    var products = JSON.parse(localStorage.getItem('products'));
    if (products.length > 0) { // có sản phẩm
        var html = '';
        for (var x of products) {
            if (x.productSalePrice > 0) {
                html += `
                <div class="product-child">
                    <img src="${x.productLink}" width="100%" height="200" />
                    <p class="name">${x.productName}</p>
                    <div class="price-container">
                        <p class="sale-price">${x.productSalePrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</p>
                        <p class="price">
                            <i class="fa-solid fa-tag"></i> <del>${x.productPrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</del>
                        </p>
                    </div>
                    <button><i class="fa-solid fa-basket-shopping"></i> Add to cart</button>
                </div>
                `;
            } else {
                html += `
                <div class="product-child">
                    <img src="${x.productLink}" width="100%" height="200" />
                    <p class="name">${x.productName}</p>
                    <div class="price-container">
                        <p class="sale-price">${x.productPrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</p>
                    </div>
                    <button><i class="fa-solid fa-basket-shopping"></i> Add to cart</button>
                </div>
                `;
            }
        }
        document.getElementById('products').innerHTML = html;
    }
}

var searchBtn = document.getElementById('searchBtn');
if (typeof(searchBtn) != 'undefined' && searchBtn != null) {
    searchBtn.addEventListener('click', function() {
        var searchItem = document.getElementById('searchItem').value.toLowerCase();
        var products = JSON.parse(localStorage.getItem('products'));
        // Kiểm tra tên sản phẩm có chứa từ khóa mình search không
        var filterProducts = products.filter(product => product.productName.toLowerCase().indexOf(searchItem) > -1);
        if (filterProducts.length > 0) { // có sản phẩm
            var html = '';
            for (var x of filterProducts) {
                if (x.productSalePrice > 0) {
                    html += `
                    <div class="product-child">
                        <img src="${x.productLink}" width="100%" height="200" />
                        <p class="name">${x.productName}</p>
                        <div class="price-container">
                            <p class="sale-price">${x.productSalePrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</p>
                            <p class="price">
                                <i class="fa-solid fa-tag"></i> <del>${x.productPrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</del>
                            </p>
                        </div>
                        <button><i class="fa-solid fa-basket-shopping"></i> Add to cart</button>
                    </div>
                    `;
                } else {
                    html += `
                    <div class="product-child">
                        <img src="${x.productLink}" width="100%" height="200" />
                        <p class="name">${x.productName}</p>
                        <div class="price-container">
                            <p class="sale-price">${x.productPrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</p>
                        </div>
                        <button><i class="fa-solid fa-basket-shopping"></i> Add to cart</button>
                    </div>
                    `;
                }
            }
            document.getElementById('products').innerHTML = html;
        }
    });
}
