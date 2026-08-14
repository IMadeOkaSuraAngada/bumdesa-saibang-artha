/* =========================================================
   BUMDESA SAIBANG ARTHA
   PROFESSIONAL PRODUCT CATALOG
   DETAIL PRODUK + KERANJANG + CHECKOUT WHATSAPP
========================================================= */


/* =========================================================
   DATA PRODUK
=========================================================

   NANTI JIKA INGIN MENAMBAHKAN PRODUK,
   CUKUP TAMBAHKAN DATA DI BAGIAN INI.

========================================================= */

const products = [

    {
        id: 1,
        name: "Buku Agenda Pramuka",
        category: "Sekolah",
        price: 7000,
        stock: 10,
        icon: "fa-book",
        image: "images/agendapramuka.jpg",
        description:
            "Buku Agenda Pramuka untuk kebutuhan pembelajaran dalam Pramuka."
    },


    {
        id: 2,
        name: "Buku Folio 100 Paperline",
        category: "Kantor",
        price: 24000,
        stock: 15,
        icon: "fa-pen",
        image: "images/folio100.jpg",
        description:
            "Buku Folio 100 Paperline dengan hardcover, berlapis glossy yang sangat populer untuk kebutuhan pembukuan, akuntansi, catatan kantor, maupun administrasi sekolah."
    },


    {
        id: 3,
        name: "Pulpen Snowman V5 Hitam 0,7",
        category: "ATK",
        price: 3500,
        stock: 0,
        icon: "fa-pen",
        image: "images/snowmanv5.jpg",
        description:
            "Pulpen untuk kebutuhan sekolah, kantor dan administrasi."
    },


    {
        id: 4,
        name: "Pensil 2B FaberCastell 9000",
        category: "ATK",
        price: 4500,
        stock: 5,
        icon: "fa-pencil",
        image: "images/faber9000.jpg",
        description:
            "Pensil untuk kebutuhan belajar dan menulis maupun menggambar."
    },


    {
        id: 5,
        name: "Penghapus BIG 4B Hitam/Putih",
        category: "ATK",
        price: 2500,
        stock: 10,
        icon: "fa-eraser",
        image: "images/big4b.jpg",
        description:
            "Penghapus untuk kebutuhan sekolah dan alat tulis."
    },


    {
        id: 6,
        name: "Penggaris Besi 30cm", 
        category: "Sekolah",
        price: 4000,
        stock: 8,
        icon: "fa-ruler",
        image: "images/penggaris1.jpg",
        description:
            "Penggaris untuk kebutuhan sekolah dan menggambar."
    },


    {
        id: 7,
        name: "Baju Rompi Merah SD Ukuran 3 (M)",
        category: "Seragam Sekolah",
        price: 87000,
        stock: 5,
        icon: "fa-shirt",
        image: "images/rompi.jpg",
        description:
            "Rompi sekolah untuk kebutuhan siswa SD."
    },


    {
        id: 8,
        name: "Ikat Pinggang / Sabuk 3D SD Besar",
        category: "Seragam Sekolah",
        price: 20000,
        stock: 1,
        icon: "fa-grip-lines",
        image: "images/sabuk.jpg",
        description:
            "Ikat pinggang sekolah untuk melengkapi seragam siswa."
    },


    {
        id: 9,
        name: "Kamus Lengkap 997 Triliyun",
        category: "Sekolah",
        price: 38000,
        stock: 0,
        icon: "fa-book-open",
        image: "images/kamus.jpg",
        description:
            "Kamus untuk menunjang kebutuhan belajar bahasa siswa."
    },


    {
        id: 10,
        name: "Map Clip File BIG 8115",
        category: "ATK",
        price: 10000,
        stock: 100,
        icon: "fa-folder",
        image: "images/map.jpg",
        description:
            "Map untuk menyimpan dokumen dan kebutuhan administrasi."
    },


    {
        id: 11,
        name: "Kertas F4 CopyPaper 70GSM",
        category: "Kantor",
        price: 55000,
        stock: 22,
        icon: "fa-file-lines",
        image: "images/f4.jpg",
        description:
            "Kertas F4 untuk kebutuhan kantor dan administrasi."
    },


    {
        id: 12,
        name: "Tinta Epson Stylus 003 65ML Hitam",
        category: "Kantor",
        price: 98000,
        stock: 0,
        icon: "fa-paperclip",
        image: "images/tinta.jpg",
        description:
            "Tinta Printer untuk menunjang operasional kantor."
    }

];


/* =========================================================
   KONFIGURASI WEBSITE
========================================================= */

const STORE_NAME = "BUMDesa Saibang Artha";

const WHATSAPP_NUMBER = "6281326893050";

const CART_STORAGE_KEY =
    "saibangArthaShoppingCart";



/* =========================================================
   FORMAT RUPIAH
========================================================= */

function formatRupiah(number) {

    if (!number || number === 0) {

        return "Hubungi kami";

    }


    return new Intl.NumberFormat(
        "id-ID",
        {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }
    ).format(number);

}



/* =========================================================
   ELEMENT
========================================================= */

const productGrid =
    document.getElementById("productGrid");


const productCount =
    document.getElementById("productCount");


const noResult =
    document.getElementById("noResult");


const searchInput =
    document.getElementById("searchInput");


const clearSearch =
    document.getElementById("clearSearch");


const categoryFilter =
    document.getElementById("categoryFilter");


const sortProducts =
    document.getElementById("sortProducts");


/* =========================================================
   STATE
========================================================= */

let currentCategory = "Semua";

let currentSearch = "";
let currentSort = "default";

/*
   Keranjang disimpan dalam bentuk:

   [
       {
           id: 1,
           quantity: 2
       }
   ]

*/

let cart = loadCart();



/* =========================================================
   LOAD CART
========================================================= */

function loadCart() {

    try {

        const savedCart =
            localStorage.getItem(
                CART_STORAGE_KEY
            );


        if (!savedCart) {

            return [];

        }


        const parsed =
            JSON.parse(savedCart);


        if (!Array.isArray(parsed)) {

            return [];

        }


        return parsed;

    }

    catch (error) {

        console.warn(
            "Keranjang tidak dapat dimuat.",
            error
        );

        return [];

    }

}



/* =========================================================
   SAVE CART
========================================================= */

function saveCart() {

    try {

        localStorage.setItem(
            CART_STORAGE_KEY,
            JSON.stringify(cart)
        );

    }

    catch (error) {

        console.warn(
            "Keranjang tidak dapat disimpan.",
            error
        );

    }

}



/* =========================================================
   RENDER CATEGORY
========================================================= */

function renderCategories() {

    const categories = [
        "Semua",
        ...new Set(
            products.map(
                product => product.category
            )
        )
    ];


    categoryFilter.innerHTML = "";


    categories.forEach(category => {

        const button =
            document.createElement("button");


        button.className =
            "category-button";


        if (
            category ===
            currentCategory
        ) {

            button.classList.add(
                "active"
            );

        }


        button.textContent =
            category;


        button.dataset.category =
            category;


        button.addEventListener(
            "click",
            function() {

                currentCategory =
                    category;


                document
                    .querySelectorAll(
                        ".category-button"
                    )
                    .forEach(btn => {

                        btn.classList.remove(
                            "active"
                        );

                    });


                button.classList.add(
                    "active"
                );


                renderProducts();

            }
        );


        categoryFilter.appendChild(
            button
        );

    });

}



/* =========================================================
   FILTER + SEARCH + SORT PRODUCT
========================================================= */

function getFilteredProducts() {

    let filteredProducts =
        products.filter(product => {

            const categoryMatch =
                currentCategory === "Semua" ||
                product.category ===
                    currentCategory;


            const searchText =
                (
                    product.name +
                    " " +
                    product.category +
                    " " +
                    product.description
                ).toLowerCase();


            const searchMatch =
                searchText.includes(
                    currentSearch.toLowerCase()
                );


            return (
                categoryMatch &&
                searchMatch
            );

        });


    /* =====================================================
       SORT
    ===================================================== */

    switch (currentSort) {


        case "name-asc":

            filteredProducts.sort(
                (a, b) =>
                    a.name.localeCompare(
                        b.name,
                        "id",
                        {
                            sensitivity:
                                "base"
                        }
                    )
            );

            break;


        case "name-desc":

            filteredProducts.sort(
                (a, b) =>
                    b.name.localeCompare(
                        a.name,
                        "id",
                        {
                            sensitivity:
                                "base"
                        }
                    )
            );

            break;


        case "price-asc":

            filteredProducts.sort(
                (a, b) =>
                    Number(a.price) -
                    Number(b.price)
            );

            break;


        case "price-desc":

            filteredProducts.sort(
                (a, b) =>
                    Number(b.price) -
                    Number(a.price)
            );

            break;


        case "default":

        default:

            /*
               Urutan default mengikuti
               urutan produk pada array.
            */

            filteredProducts.sort(
                (a, b) =>
                    Number(a.id) -
                    Number(b.id)
            );

            break;

    }


    return filteredProducts;

}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts() {

    const filteredProducts =
        getFilteredProducts();


    productGrid.innerHTML = "";


    productCount.textContent =
        filteredProducts.length;


    if (
        filteredProducts.length === 0
    ) {

        noResult.classList.add(
            "show"
        );

        return;

    }


    noResult.classList.remove(
        "show"
    );


    filteredProducts.forEach(
        function(product, index) {


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "product-card";


            card.style.animationDelay =
                `${index * 0.05}s`;


            /*
               DETAIL PRODUK

               Seluruh kartu dapat diklik
               untuk membuka detail.

               Tombol WhatsApp tetap memiliki
               fungsi sendiri.
            */

            card.addEventListener(
                "click",
                function(event) {

                    if (
                        event.target.closest(
                            ".product-button, .product-cart-button"
                        )
                    ) {

                        return;

                    }


                    openProductDetail(
                        product.id
                    );

                }
            );


            let imageHTML = "";


            if (product.image) {

                imageHTML = `
                <img
                    src="${product.image}"
                    alt="${escapeHTML(product.name)}"
                    loading="lazy"
                    decoding="async">
            `;
            }

            else {

                imageHTML = `

                    <div class="product-image-placeholder">

                        <i class="fa-solid ${product.icon}"></i>

                        <small>
                            Foto produk
                        </small>

                    </div>

                `;

            }


            const stockAmount =
    Number(product.stock) || 0;


const stockBadge =
    stockAmount > 5
        ? `
            <span class="stock-badge">
                <i class="fa-solid fa-circle"></i>
                Stok Tersedia · ${stockAmount}
            </span>
          `
        : stockAmount > 0
        ? `
            <span class="stock-badge low">
                <i class="fa-solid fa-circle"></i>
                Stok Terbatas · ${stockAmount}
            </span>
          `
        : `
            <span class="stock-badge out">
                Stok Habis
            </span>
          `;


            const buttonHTML =
                product.stock

                    ? `

                        <div class="product-action-buttons">

                            <button
                                type="button"
                                class="product-cart-button"
                                onclick="addToCartFromCard(${product.id}, this)">

                                <i class="fa-solid fa-cart-plus"></i>

                                <span>Keranjang</span>

                            </button>

                            <button
                                type="button"
                                class="product-button"
                                onclick="pesanProduk(
                                    '${escapeQuotes(product.name)}'
                                )">

                                <i class="fa-brands fa-whatsapp"></i>

                                <span>WhatsApp</span>

                            </button>

                        </div>

                      `

                    : `

                        <div class="product-action-buttons">

                            <button
                                type="button"
                                class="product-cart-button disabled"
                                disabled>

                                <i class="fa-solid fa-cart-shopping"></i>

                                <span>Produk Habis</span>

                            </button>

                        </div>

                      `;


            card.innerHTML = `

                <div class="product-image">

                    ${imageHTML}

                    ${stockBadge}

                </div>


                <div class="product-content">

                    <span class="product-category">

                        ${escapeHTML(product.category)}

                    </span>


                    <h3>

                        ${escapeHTML(product.name)}

                    </h3>


                    <p>

                        ${escapeHTML(product.description)}

                    </p>


                    <div class="product-price">

                        ${formatRupiah(product.price)}

                    </div>


                    ${buttonHTML}

                </div>

            `;


            productGrid.appendChild(
                card
            );


            setTimeout(
                () => {

                    card.style.opacity =
                        "1";

                    card.style.transform =
                        "translateY(0)";

                },
                30
            );


        }
    );


    updateCartUI();

}



/* =========================================================
   ESCAPE QUOTES
========================================================= */

function escapeQuotes(text) {

    return String(text)
        .replace(
            /\\/g,
            "\\\\"
        )
        .replace(
            /'/g,
            "\\'"
        );

}



/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(text) {

    return String(text)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}



/* =========================================================
   SEARCH
========================================================= */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        function() {

            currentSearch =
                this.value.trim();


            if (
                currentSearch.length > 0
            ) {

                clearSearch.style.display =
                    "flex";

            }

            else {

                clearSearch.style.display =
                    "none";

            }


            renderProducts();

        }
    );

}



/* =========================================================
   CLEAR SEARCH
========================================================= */

if (clearSearch) {

    clearSearch.addEventListener(
        "click",
        function() {

            searchInput.value = "";

            currentSearch = "";

            clearSearch.style.display =
                "none";

            renderProducts();

            searchInput.focus();

        }
    );

}
/* =========================================================
   SORT PRODUCTS
========================================================= */

if (sortProducts) {

    sortProducts.addEventListener(
        "change",
        function() {

            currentSort =
                this.value;

            renderProducts();

        }
    );

}


/* =========================================================
   RESET CATALOG
========================================================= */

function resetCatalog() {

    currentCategory =
        "Semua";


    currentSearch =
        "";

    currentSort = "default";



    if (searchInput) {

        searchInput.value = "";

    }


    if (clearSearch) {

        clearSearch.style.display =
            "none";

    }

    if (sortProducts) {

    sortProducts.value =
        "default";

}


    renderCategories();

    renderProducts();

}



/* =========================================================
   CARI PRODUK BERDASARKAN ID
========================================================= */

function getProductById(id) {

    return products.find(
        product =>
            Number(product.id) ===
            Number(id)
    );

}



/* =========================================================
   DETAIL PRODUK
========================================================= */

function openProductDetail(productId) {

    const product = getProductById(productId);

    if (!product) {
        return;
    }

    const existingModal =
        document.getElementById("productDetailModal");

    if (existingModal) {
        existingModal.remove();
    }

    const imageHTML = product.image
        ? `
            <div class="detail-image-frame">
                <img
                    src="${product.image}"
                    alt="${escapeHTML(product.name)}">
            </div>
          `
        : `
            <div class="detail-image-placeholder">
                <i class="fa-solid ${product.icon}"></i>
            </div>
          `;

    const stockHTML = product.stock
        ? `
            <span class="detail-stock available">
                <i class="fa-solid fa-circle-check"></i>
                Produk tersedia
            </span>
          `
        : `
            <span class="detail-stock unavailable">
                <i class="fa-solid fa-circle-xmark"></i>
                Produk sedang habis
            </span>
          `;

    const modal =
        document.createElement("div");

    modal.id =
        "productDetailModal";

    modal.className =
        "saibang-modal";

    modal.innerHTML = `

        <div
            class="saibang-modal-overlay"
            onclick="closeProductDetail()">
        </div>

        <div class="saibang-modal-box">

            <button
                class="saibang-modal-close"
                onclick="closeProductDetail()"
                aria-label="Tutup detail produk">

                <i class="fa-solid fa-xmark"></i>

            </button>

            <div class="product-detail-layout">

                <!-- FOTO PRODUK -->

                <div class="product-detail-image">

                    <span class="detail-image-label">
                        <i class="fa-solid fa-image"></i>
                        FOTO PRODUK
                    </span>

                    ${imageHTML}

                </div>


                <!-- INFORMASI PRODUK -->

                <div class="product-detail-content">

                    <span class="detail-category">

                        ${escapeHTML(product.category)}

                    </span>


                    <h2>

                        ${escapeHTML(product.name)}

                    </h2>


                    <div class="detail-price">

                        ${formatRupiah(product.price)}

                    </div>


                    ${stockHTML}


                    <div class="detail-divider"></div>


                    <!-- DESKRIPSI -->

                    <div class="detail-description-box">

                        <h4>

                            <i class="fa-solid fa-circle-info"></i>

                            Deskripsi Produk

                        </h4>

                        <p class="detail-description">

                            ${escapeHTML(product.description)}

                        </p>

                    </div>


                    ${
                        product.stock
                        ? `

                            <!-- PEMBELIAN -->

                            <div class="detail-purchase">

                                <div class="detail-quantity-label">

                                    <span>
                                        Jumlah
                                    </span>

                                    <small>
                                        Pilih jumlah produk
                                    </small>

                                </div>


                                <div class="quantity-control">

                                    <button
                                        type="button"
                                        onclick="changeDetailQuantity(-1)"
                                        aria-label="Kurangi jumlah">

                                        <i class="fa-solid fa-minus"></i>

                                    </button>


                                    <input
                                        id="detailQuantity"
                                        type="number"
                                        min="1"
                                        value="1"
                                        readonly
                                        aria-label="Jumlah produk">


                                    <button
                                        type="button"
                                        onclick="changeDetailQuantity(1)"
                                        aria-label="Tambah jumlah">

                                        <i class="fa-solid fa-plus"></i>

                                    </button>

                                </div>

                            </div>


                            <!-- TOTAL SEMENTARA -->

                            <div class="detail-live-total">

                                <span>
                                    Total sementara
                                </span>

                                <strong
                                    id="detailLiveTotal">

                                    ${formatRupiah(product.price)}

                                </strong>

                            </div>


                            <!-- TOMBOL KERANJANG -->

                            <button
                                type="button"
                                class="detail-cart-button"
                                onclick="
                                    addToCart(
                                        ${product.id},
                                        getDetailQuantity()
                                    )
                                ">

                                <i class="fa-solid fa-cart-plus"></i>

                                Tambah ke Keranjang

                            </button>


                            <!-- TOMBOL WHATSAPP -->

                            <button
                                type="button"
                                class="detail-wa-button"
                                onclick="
                                    pesanProdukDetail(
                                        ${product.id}
                                    )
                                ">

                                <i class="fa-brands fa-whatsapp"></i>

                                Pesan via WhatsApp

                            </button>


                            <!-- CATATAN -->

                            <div class="detail-order-note">

                                <i class="fa-solid fa-shield-halved"></i>

                                <span>
                                    Pesanan akan dikonfirmasi
                                    melalui WhatsApp.
                                </span>

                            </div>

                          `
                        : `

                            <div class="detail-out-of-stock">

                                <i class="fa-solid fa-box-open"></i>

                                <div>

                                    <strong>
                                        Produk sedang habis
                                    </strong>

                                    <span>
                                        Silakan hubungi kami
                                        untuk informasi ketersediaan.
                                    </span>

                                </div>

                            </div>

                          `
                    }

                </div>

            </div>

        </div>

    `;


    document.body.appendChild(modal);


    requestAnimationFrame(() => {

        modal.classList.add("show");

    });


    document.body.style.overflow =
        "hidden";


    /*
       Simpan ID produk yang sedang
       dibuka agar total dapat
       diperbarui ketika jumlah berubah.
    */

    window.currentDetailProductId =
        product.id;

}



/* =========================================================
   CLOSE DETAIL PRODUCT
========================================================= */

function closeProductDetail() {

    const modal =
        document.getElementById(
            "productDetailModal"
        );


    if (!modal) {

        return;

    }


    modal.classList.remove(
        "show"
    );


    setTimeout(
        () => {

            modal.remove();

            document.body.style.overflow =
                "";

        },
        250
    );

}



/* =========================================================
   DETAIL QUANTITY
========================================================= */

function getDetailQuantity() {

    const input =
        document.getElementById(
            "detailQuantity"
        );


    if (!input) {

        return 1;

    }


    const quantity =
        parseInt(
            input.value,
            10
        );


    return quantity > 0
        ? quantity
        : 1;

}



function changeDetailQuantity(amount) {

    const input =
        document.getElementById(
            "detailQuantity"
        );

    if (!input) {
        return;
    }


    const product =
        getProductById(
            window.currentDetailProductId
        );


    let quantity =
        parseInt(
            input.value,
            10
        ) || 1;


    quantity += amount;


    /*
       Minimal 1
    */

    if (quantity < 1) {
        quantity = 1;
    }


    /*
       Jika stok menggunakan angka
       maka jumlah tidak boleh melebihi stok.
    */

    if (
        product &&
        typeof product.stock === "number"
    ) {

        if (
            quantity >
            product.stock
        ) {

            quantity =
                product.stock;

        }

    }


    input.value =
        quantity;


    /*
       UPDATE TOTAL SEMENTARA
    */

    updateDetailLiveTotal();

}

function updateDetailLiveTotal() {

    const input =
        document.getElementById(
            "detailQuantity"
        );

    const totalElement =
        document.getElementById(
            "detailLiveTotal"
        );


    if (
        !input ||
        !totalElement
    ) {

        return;

    }


    const product =
        getProductById(
            window.currentDetailProductId
        );


    if (!product) {
        return;
    }


    const quantity =
        parseInt(
            input.value,
            10
        ) || 1;


    const total =
        product.price *
        quantity;


    totalElement.textContent =
        formatRupiah(total);

}



/* =========================================================
   TAMBAH KE KERANJANG DARI KARTU PRODUK
   TAHAP 3.2 - SISTEM STOK
========================================================= */

function addToCartFromCard(
    productId,
    button
) {

    const product =
        getProductById(productId);


    /* PRODUK TIDAK DITEMUKAN */

    if (!product) {

        showToast(
            "Produk tidak ditemukan."
        );

        return;

    }


    /* AMBIL JUMLAH STOK */

    const stock =
        Number(product.stock) || 0;


    /* CEK STOK HABIS */

    if (stock <= 0) {

        showToast(
            "Produk sedang habis."
        );

        return;

    }


    /* CEK APAKAH PRODUK SUDAH ADA DI KERANJANG */

    const existing =
        cart.find(
            item =>
                Number(item.id) ===
                Number(productId)
        );


    const currentQuantity =
        existing
            ? Number(existing.quantity)
            : 0;


    /* CEK BATAS STOK */

    if (
        currentQuantity >=
        stock
    ) {

        showToast(
            `Stok ${product.name} hanya ${stock} pcs.`
        );

        return;

    }


    /* TAMBAHKAN 1 PRODUK */

    addToCart(
        productId,
        1
    );


    /* ANIMASI TOMBOL */

    if (button) {

        const originalHTML =
            button.innerHTML;


        button.innerHTML = `
            <i class="fa-solid fa-check"></i>
            <span>Ditambahkan</span>
        `;


        button.classList.add(
            "added"
        );


        button.disabled =
            true;


        setTimeout(
            () => {

                button.innerHTML =
                    originalHTML;


                button.classList.remove(
                    "added"
                );


                button.disabled =
                    false;

            },
            1500
        );

    }

}


/* =========================================================
   TAMBAH KE KERANJANG
========================================================= */

/* =========================================================
   TAMBAH KE KERANJANG
   TAHAP 3.2 - SISTEM STOK
========================================================= */

function addToCart(
    productId,
    quantity = 1
) {

    const product =
        getProductById(productId);


    /* PRODUK TIDAK DITEMUKAN */

    if (!product) {

        showToast(
            "Produk tidak ditemukan."
        );

        return false;

    }


    /* JUMLAH STOK */

    const stock =
        Number(product.stock) || 0;


    /* STOK HABIS */

    if (stock <= 0) {

        showToast(
            `${product.name} sedang habis.`
        );

        return false;

    }


    /* NORMALISASI QUANTITY */

    quantity =
        parseInt(
            quantity,
            10
        ) || 1;


    if (
        quantity < 1
    ) {

        quantity = 1;

    }


    /* CARI PRODUK DI KERANJANG */

    const existing =
        cart.find(
            item =>
                Number(item.id) ===
                Number(productId)
        );


    /* JUMLAH SAAT INI */

    const currentQuantity =
        existing
            ? Number(existing.quantity)
            : 0;


    /* JUMLAH BARU */

    const newQuantity =
        currentQuantity +
        quantity;


    /* CEK MELEBIHI STOK */

    if (
        newQuantity >
        stock
    ) {

        showToast(
            `Stok ${product.name} hanya ${stock} pcs.`
        );

        return false;

    }


    /* MASUKKAN KE KERANJANG */

    if (existing) {

        existing.quantity =
            newQuantity;

    }

    else {

        cart.push({

            id:
                product.id,

            quantity:
                quantity

        });

    }


    /* SIMPAN KERANJANG */

    saveCart();


    /* UPDATE ICON / JUMLAH KERANJANG */

    updateCartUI();


    /* TUTUP DETAIL PRODUK JIKA TERBUKA */

    closeProductDetail();


    /* NOTIFIKASI */

    showToast(
        `${product.name} ditambahkan ke keranjang.`
    );


    return true;

}


/* =========================================================
   UPDATE QUANTITY CART
========================================================= */

function updateCartQuantity(
    productId,
    change
) {

    const item =
        cart.find(
            cartItem =>
                Number(cartItem.id) ===
                Number(productId)
        );


    if (!item) {
        return;
    }


    const product =
        getProductById(
            productId
        );


    if (!product) {
        return;
    }


    let newQuantity =
        Number(item.quantity) +
        Number(change);


    /*
       JUMLAH MINIMAL
    */

    if (newQuantity < 1) {

        newQuantity = 1;

    }


    /*
       BATAS STOK
    */

    if (
        typeof product.stock === "number" &&
        product.stock > 0 &&
        newQuantity > product.stock
    ) {

        newQuantity =
            product.stock;


        showToast(
            `Stok tersedia hanya ${product.stock} pcs.`
        );

    }


    item.quantity =
        newQuantity;


    saveCart();

    updateCartUI();

    renderCartItems();

}



/* =========================================================
   REMOVE CART ITEM
========================================================= */

function removeFromCart(productId) {

    cart =
        cart.filter(
            item =>
                Number(item.id) !==
                Number(productId)
        );


    saveCart();

    updateCartUI();

    renderCartItems();


    showToast(
        "Produk dihapus dari keranjang."
    );

}



/* =========================================================
   CART TOTAL ITEM
========================================================= */

function getCartItemCount() {

    return cart.reduce(
        (
            total,
            item
        ) =>
            total +
            Number(item.quantity),
        0
    );

}



/* =========================================================
   CART TOTAL PRICE
========================================================= */

function getCartTotal() {

    return cart.reduce(
        (
            total,
            item
        ) => {

            const product =
                getProductById(
                    item.id
                );


            if (!product) {

                return total;

            }


            return total +
                (
                    product.price *
                    item.quantity
                );

        },
        0
    );

}



/* =========================================================
   CART UI
========================================================= */

function updateCartUI() {

    const count =
        getCartItemCount();


    const badge =
        document.getElementById(
            "saibangCartCount"
        );


    if (badge) {

        badge.textContent =
            count;


        badge.classList.toggle(
            "empty",
            count === 0
        );

    }


    const total =
        document.getElementById(
            "saibangCartTotal"
        );


    if (total) {

        total.textContent =
            formatRupiah(
                getCartTotal()
            );

    }


    const emptyText =
        document.getElementById(
            "saibangCartEmpty"
        );


    if (emptyText) {

        emptyText.style.display =
            count === 0
                ? "flex"
                : "none";

    }


    /*
       TOTAL ITEM DI KERANJANG
    */

    const itemCount =
        document.getElementById(
            "saibangCartItemCount"
        );


    if (itemCount) {

        itemCount.textContent =
            count;

    }


    /*
       TOTAL JENIS PRODUK
    */

    const productCount =
        document.getElementById(
            "saibangCartProductCount"
        );


    if (productCount) {

        productCount.textContent =
            cart.length;

    }

}



/* =========================================================
   RENDER CART
========================================================= */

function renderCartItems() {

    const container =
        document.getElementById(
            "saibangCartItems"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    /*
       KERANJANG KOSONG
    */

    if (cart.length === 0) {

        container.innerHTML = `

            <div
                class="saibang-cart-empty"
                id="saibangCartEmpty">

                <div class="cart-empty-icon">

                    <i class="fa-solid fa-cart-shopping"></i>

                </div>


                <h4>
                    Keranjang masih kosong
                </h4>


                <p>
                    Pilih produk yang Anda butuhkan
                    untuk mulai berbelanja.
                </p>


                <button
                    type="button"
                    class="cart-empty-button"
                    onclick="
                        closeCart();

                        document
                            .getElementById('katalog')
                            ?.scrollIntoView({
                                behavior: 'smooth'
                            });
                    ">

                    <i class="fa-solid fa-store"></i>

                    Lihat Katalog

                </button>

            </div>

        `;


        updateCartUI();

        return;

    }


    /*
       RENDER PRODUK
    */

    cart.forEach(
        item => {

            const product =
                getProductById(
                    item.id
                );


            if (!product) {
                return;
            }


            const quantity =
                Number(item.quantity);


            const subtotal =
                product.price *
                quantity;


            const stock =
                typeof product.stock === "number"
                    ? product.stock
                    : null;


            const reachedStock =
                stock !== null &&
                stock > 0 &&
                quantity >= stock;


            const image =
                product.image

                    ? `

                        <img
                            src="${product.image}"
                            alt="${escapeHTML(
                                product.name
                            )}">

                      `

                    : `

                        <div
                            class="cart-item-placeholder">

                            <i
                                class="fa-solid
                                ${product.icon}">
                            </i>

                        </div>

                      `;


            const itemElement =
                document.createElement(
                    "div"
                );


            itemElement.className =
                "saibang-cart-item";


            itemElement.innerHTML = `

                <!-- FOTO -->

                <div class="cart-item-image">

                    ${image}

                </div>


                <!-- INFORMASI -->

                <div class="cart-item-info">

                    <div class="cart-item-main">

                        <div>

                            <span
                                class="cart-item-category">

                                ${escapeHTML(
                                    product.category
                                )}

                            </span>


                            <h4>

                                ${escapeHTML(
                                    product.name
                                )}

                            </h4>

                        </div>


                        <button
                            type="button"
                            class="cart-remove"
                            onclick="
                                removeFromCart(
                                    ${product.id}
                                )
                            "
                            aria-label="Hapus produk">

                            <i
                                class="fa-solid fa-trash-can">
                            </i>

                        </button>

                    </div>


                    <!-- HARGA -->

                    <div class="cart-item-price">

                        ${formatRupiah(
                            product.price
                        )}

                        <span>
                            / pcs
                        </span>

                    </div>


                    <!-- BAWAH -->

                    <div class="cart-item-bottom">

                        <!-- JUMLAH -->

                        <div>

                            <div
                                class="cart-quantity">

                                <button
                                    type="button"
                                    onclick="
                                        updateCartQuantity(
                                            ${product.id},
                                            -1
                                        )
                                    "
                                    aria-label="Kurangi jumlah">

                                    <i
                                        class="fa-solid fa-minus">
                                    </i>

                                </button>


                                <strong>

                                    ${quantity}

                                </strong>


                                <button
                                    type="button"
                                    onclick="
                                        updateCartQuantity(
                                            ${product.id},
                                            1
                                        )
                                    "
                                    ${
                                        reachedStock
                                            ? "disabled"
                                            : ""
                                    }
                                    aria-label="Tambah jumlah">

                                    <i
                                        class="fa-solid fa-plus">
                                    </i>

                                </button>

                            </div>


                            ${
                                reachedStock
                                    ? `

                                        <small
                                            class="cart-stock-note">

                                            Maks. stok
                                            ${stock}

                                        </small>

                                      `
                                    : ""
                            }

                        </div>


                        <!-- SUBTOTAL -->

                        <div
                            class="cart-item-subtotal">

                            <span>
                                Subtotal
                            </span>


                            <strong>

                                ${formatRupiah(
                                    subtotal
                                )}

                            </strong>

                        </div>

                    </div>

                </div>

            `;


            container.appendChild(
                itemElement
            );

        }
    );


    updateCartUI();

}



/* =========================================================
   OPEN CART
========================================================= */

function openCart() {

    const cartDrawer =
        document.getElementById(
            "saibangCartDrawer"
        );


    if (!cartDrawer) {

        return;

    }


    renderCartItems();


    cartDrawer.classList.add(
        "show"
    );


    document.body.style.overflow =
        "hidden";

}



/* =========================================================
   CLOSE CART
========================================================= */

function closeCart() {

    const cartDrawer =
        document.getElementById(
            "saibangCartDrawer"
        );


    if (!cartDrawer) {

        return;

    }


    cartDrawer.classList.remove(
        "show"
    );


    document.body.style.overflow =
        "";

}



/* =========================================================
   CHECKOUT
========================================================= */

function openCheckout() {

    /*
       CEK KERANJANG
    */

    if (cart.length === 0) {

        showToast(
            "Keranjang Anda masih kosong."
        );

        return;
    }


    /*
       TUTUP KERANJANG
    */

    closeCart();


    /*
       HAPUS CHECKOUT LAMA
       JIKA MASIH ADA
    */

    const existing =
        document.getElementById(
            "saibangCheckoutModal"
        );


    if (existing) {

        existing.remove();

    }


    /*
       BUAT MODAL CHECKOUT
    */

    const checkout =
        document.createElement(
            "div"
        );


    checkout.id =
        "saibangCheckoutModal";


    checkout.className =
        "saibang-modal";


    checkout.innerHTML = `

        <div
            class="saibang-modal-overlay"
            onclick="closeCheckout()">
        </div>


        <div
            class="saibang-checkout-box
                   checkout-professional">


            <!-- CLOSE -->

            <button
                type="button"
                class="saibang-modal-close"
                onclick="closeCheckout()"
                aria-label="Tutup checkout">

                <i class="fa-solid fa-xmark"></i>

            </button>


            <!-- HEADER -->

            <div class="checkout-header">

                <span
                    class="checkout-label">

                    CHECKOUT PESANAN

                </span>


                <h2>

                    Selesaikan Pesanan Anda

                </h2>


                <p>

                    Lengkapi data berikut
                    sebelum mengirim pesanan
                    melalui WhatsApp.

                </p>

            </div>


            <!-- CHECKOUT CONTENT -->

            <div
                class="checkout-professional-layout">


                <!-- =================================
                     DATA PEMBELI
                ================================== -->

                <div
                    class="checkout-customer-section">


                    <div
                        class="checkout-section-title">

                        <div
                            class="checkout-section-icon">

                            <i
                                class="fa-solid fa-user">
                            </i>

                        </div>


                        <div>

                            <strong>
                                Data Pembeli
                            </strong>

                            <span>
                                Informasi untuk
                                konfirmasi pesanan
                            </span>

                        </div>

                    </div>


                    <form
                        id="saibangCheckoutForm"
                        class="checkout-form">


                        <!-- NAMA -->

                        <div
                            class="checkout-field">

                            <label
                                for="customerName">

                                Nama Lengkap

                                <span>
                                    *
                                </span>

                            </label>


                            <div
                                class="checkout-input-wrap">

                                <i
                                    class="fa-solid
                                    fa-user">
                                </i>


                                <input
                                    id="customerName"
                                    type="text"
                                    placeholder="Contoh: I Made Oka"
                                    autocomplete="name"
                                    required>

                            </div>

                        </div>


                        <!-- WHATSAPP -->

                        <div
                            class="checkout-field">

                            <label
                                for="customerPhone">

                                Nomor WhatsApp

                                <span>
                                    *
                                </span>

                            </label>


                            <div
                                class="checkout-input-wrap">

                                <i
                                    class="fa-brands
                                    fa-whatsapp">
                                </i>


                                <input
                                    id="customerPhone"
                                    type="tel"
                                    inputmode="numeric"
                                    placeholder="Contoh: 081234567890"
                                    autocomplete="tel"
                                    required>

                            </div>


                            <small
                                class="checkout-field-help">

                                Pastikan nomor WhatsApp
                                Anda aktif.

                            </small>

                        </div>


                        <!-- ALAMAT -->

                        <div
                            class="checkout-field">

                            <label
                                for="customerAddress">

                                Alamat

                                <span>
                                    *
                                </span>

                            </label>


                            <div
                                class="checkout-input-wrap
                                checkout-textarea-wrap">

                                <i
                                    class="fa-solid
                                    fa-location-dot">
                                </i>


                                <textarea
                                    id="customerAddress"
                                    rows="3"
                                    placeholder="Contoh: Desa Sibanggede, Abiansemal, Badung"
                                    autocomplete="street-address"
                                    required></textarea>

                            </div>

                        </div>


                        <!-- CATATAN -->

                        <div
                            class="checkout-field">

                            <label
                                for="customerNote">

                                Catatan Pesanan

                                <span
                                    class="optional">

                                    Opsional

                                </span>

                            </label>


                            <div
                                class="checkout-input-wrap
                                checkout-textarea-wrap">

                                <i
                                    class="fa-solid
                                    fa-note-sticky">
                                </i>


                                <textarea
                                    id="customerNote"
                                    rows="3"
                                    placeholder="Contoh: Mohon disiapkan, akan diambil di toko."></textarea>

                            </div>

                        </div>


                        <!-- PRIVACY NOTE -->

                        <div
                            class="checkout-security-note">

                            <i
                                class="fa-solid
                                fa-shield-halved">
                            </i>


                            <span>

                                Data digunakan hanya untuk
                                memproses pesanan Anda.

                            </span>

                        </div>


                        <!-- MOBILE BUTTON -->

                    </form>

                </div>


                <!-- =================================
                     RINGKASAN PESANAN
                ================================== -->

                <div
                    class="checkout-order-section">


                    <div
                        class="checkout-section-title">

                        <div
                            class="checkout-section-icon
                                   blue">

                            <i
                                class="fa-solid
                                fa-bag-shopping">
                            </i>

                        </div>


                        <div>

                            <strong>
                                Ringkasan Pesanan
                            </strong>

                            <span>
                                Periksa kembali
                                pesanan Anda
                            </span>

                        </div>

                    </div>


                    <div
                        id="checkoutSummaryItems"
                        class="checkout-summary-items">

                    </div>


                    <!-- TOTAL -->

                    <div
                        class="checkout-total-card">

                        <div>

                            <span>
                                Total Pesanan
                            </span>


                            <small
                                id="checkoutItemCount">

                                0 barang

                            </small>

                        </div>


                        <strong
                            id="checkoutTotal">

                            Rp0

                        </strong>

                    </div>


                    <!-- DESKTOP BUTTON -->

                    <button
                        type="submit"
                        form="saibangCheckoutForm"
                        class="checkout-whatsapp-button
                               checkout-submit-desktop">

                        <i
                            class="fa-brands
                            fa-whatsapp">
                        </i>

                        Kirim Pesanan ke WhatsApp

                    </button>


                    <p
                        class="checkout-note">

                        <i
                            class="fa-solid
                            fa-circle-info">
                        </i>


                        Setelah tombol ditekan,
                        WhatsApp akan terbuka dengan
                        detail pesanan Anda.

                    </p>

                </div>

            </div>

        </div>

    `;


    /*
       MASUKKAN KE BODY
    */

    document.body.appendChild(
        checkout
    );


    /*
       RENDER RINGKASAN
    */

    renderCheckoutSummary();


    /*
       ANIMASI
    */

    requestAnimationFrame(
        () => {

            checkout.classList.add(
                "show"
            );

        }
    );


    /*
       LOCK SCROLL
    */

    document.body.style.overflow =
        "hidden";


    /*
       FORM SUBMIT
    */

    const form =
        document.getElementById(
            "saibangCheckoutForm"
        );


    if (form) {

        form.addEventListener(
            "submit",
            function(event) {

                event.preventDefault();

                processWhatsAppCheckout();

            }
        );

    }

}



/* =========================================================
   CHECKOUT SUMMARY
========================================================= */

function renderCheckoutSummary() {

    const container =
        document.getElementById(
            "checkoutSummaryItems"
        );


    const totalElement =
        document.getElementById(
            "checkoutTotal"
        );


    const itemCountElement =
        document.getElementById(
            "checkoutItemCount"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    let totalQuantity = 0;


    /*
       RENDER SETIAP PRODUK
    */

    cart.forEach(
        (item, index) => {

            const product =
                getProductById(
                    item.id
                );


            if (!product) {
                return;
            }


            const quantity =
                Number(
                    item.quantity
                );


            const subtotal =
                product.price *
                quantity;


            totalQuantity +=
                quantity;


            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "checkout-summary-item";


            row.innerHTML = `

                <div
                    class="checkout-summary-product">


                    <!-- NOMOR -->

                    <span
                        class="checkout-product-number">

                        ${index + 1}

                    </span>


                    <!-- INFO -->

                    <div>

                        <strong>

                            ${escapeHTML(
                                product.name
                            )}

                        </strong>


                        <span>

                            ${quantity}
                            ×
                            ${formatRupiah(
                                product.price
                            )}

                        </span>

                    </div>

                </div>


                <strong
                    class="checkout-summary-price">

                    ${formatRupiah(
                        subtotal
                    )}

                </strong>

            `;


            container.appendChild(
                row
            );

        }
    );


    /*
       TOTAL HARGA
    */

    if (totalElement) {

        totalElement.textContent =
            formatRupiah(
                getCartTotal()
            );

    }


    /*
       TOTAL JUMLAH BARANG
    */

    if (itemCountElement) {

        itemCountElement.textContent =

            `${totalQuantity} ${
                totalQuantity === 1
                    ? "barang"
                    : "barang"
            }`;

    }

}



/* =========================================================
   CLOSE CHECKOUT
========================================================= */

function closeCheckout() {

    const checkout =
        document.getElementById(
            "saibangCheckoutModal"
        );


    if (!checkout) {

        return;

    }


    checkout.classList.remove(
        "show"
    );


    setTimeout(
        () => {

            checkout.remove();

            document.body.style.overflow =
                "";

        },
        250
    );

}



/* =========================================================
   PROCESS WHATSAPP CHECKOUT
========================================================= */

function processWhatsAppCheckout() {

    /* =====================================================
       AMBIL DATA CHECKOUT
    ===================================================== */

    const nameInput =
        document.getElementById("customerName");

    const phoneInput =
        document.getElementById("customerPhone");

    const addressInput =
        document.getElementById("customerAddress");

    const noteInput =
        document.getElementById("customerNote");


    const customerName =
        nameInput
            ? nameInput.value.trim()
            : "";

    const customerPhone =
        phoneInput
            ? phoneInput.value.trim()
            : "";

    const customerAddress =
        addressInput
            ? addressInput.value.trim()
            : "";

    const customerNote =
        noteInput
            ? noteInput.value.trim()
            : "";


    /* =====================================================
       VALIDASI KERANJANG
    ===================================================== */

    if (cart.length === 0) {

        showToast(
            "Keranjang Anda masih kosong."
        );

        closeCheckout();

        return;
    }


    /* =====================================================
       VALIDASI NAMA
    ===================================================== */

    if (!customerName) {

        showToast(
            "Nama lengkap wajib diisi."
        );

        if (nameInput) {
            nameInput.focus();
        }

        return;
    }


    if (customerName.length < 3) {

        showToast(
            "Masukkan nama lengkap yang benar."
        );

        if (nameInput) {
            nameInput.focus();
        }

        return;
    }


    /* =====================================================
       VALIDASI NOMOR WHATSAPP
    ===================================================== */

    if (!customerPhone) {

        showToast(
            "Nomor WhatsApp wajib diisi."
        );

        if (phoneInput) {
            phoneInput.focus();
        }

        return;
    }


    /*
       BERSIHKAN NOMOR
    */

    let cleanPhone =
        customerPhone.replace(
            /[^0-9+]/g,
            ""
        );


    /*
       NORMALISASI NOMOR INDONESIA
    */

    if (
        cleanPhone.startsWith("0")
    ) {

        cleanPhone =
            "62" +
            cleanPhone.substring(1);

    } else if (
        cleanPhone.startsWith("+62")
    ) {

        cleanPhone =
            cleanPhone.substring(1);

    }


    /*
       CEK AWALAN 62
    */

    if (
        !cleanPhone.startsWith("62")
    ) {

        showToast(
            "Nomor WhatsApp harus menggunakan nomor Indonesia."
        );

        if (phoneInput) {
            phoneInput.focus();
        }

        return;
    }


    /*
       CEK PANJANG NOMOR
    */

    if (
        cleanPhone.length < 10 ||
        cleanPhone.length > 15
    ) {

        showToast(
            "Nomor WhatsApp tidak valid."
        );

        if (phoneInput) {
            phoneInput.focus();
        }

        return;
    }


    /* =====================================================
       VALIDASI ALAMAT
    ===================================================== */

    if (!customerAddress) {

        showToast(
            "Alamat wajib diisi."
        );

        if (addressInput) {
            addressInput.focus();
        }

        return;
    }


    if (
        customerAddress.length < 5
    ) {

        showToast(
            "Masukkan alamat yang lebih lengkap."
        );

        if (addressInput) {
            addressInput.focus();
        }

        return;
    }


    /* =====================================================
       BUAT ORDER ID
       FORMAT:
       SA-YYYYMMDD-HHMMSS
    ===================================================== */

    const now =
        new Date();


    const year =
        now.getFullYear();


    const month =
        String(
            now.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            now.getDate()
        ).padStart(2, "0");


    const hours =
        String(
            now.getHours()
        ).padStart(2, "0");


    const minutes =
        String(
            now.getMinutes()
        ).padStart(2, "0");


    const seconds =
        String(
            now.getSeconds()
        ).padStart(2, "0");


    const orderNumber =
        `SA-${year}${month}${day}-${hours}${minutes}${seconds}`;


    /* =====================================================
       FORMAT TANGGAL
    ===================================================== */

    const dateFormatter =
        new Intl.DateTimeFormat(
            "id-ID",
            {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );


    const timeFormatter =
        new Intl.DateTimeFormat(
            "id-ID",
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false
            }
        );


    const orderDate =
        dateFormatter.format(now);


    const orderTime =
        timeFormatter.format(now) +
        " WITA";


    /* =====================================================
       HITUNG TOTAL ITEM
    ===================================================== */

    let totalQuantity = 0;


    cart.forEach(
        item => {

            totalQuantity +=
                Number(
                    item.quantity
                );

        }
    );


    /* =====================================================
       BANGUN PESAN WHATSAPP
    ===================================================== */

    let message = "";


    /*
       HEADER
    */

    message +=
        `*PESANAN BUMDESA SAIBANG ARTHA*\n`;

    message +=
        `━━━━━━━━━━━━━━━━━━━━\n\n`;


    /*
       ORDER ID
    */

    message +=
        `*Nomor Pesanan:* ${orderNumber}\n`;

    message +=
        `*Tanggal:* ${orderDate}\n`;

    message +=
        `*Waktu:* ${orderTime}\n\n`;


    /*
       DATA PEMBELI
    */

    message +=
        `*DATA PEMBELI*\n`;

    message +=
        `━━━━━━━━━━━━━━━━━━━━\n`;

    message +=
        `Nama: ${customerName}\n`;

    message +=
        `WhatsApp: ${customerPhone}\n`;

    message +=
        `Alamat: ${customerAddress}\n\n`;


    /*
       DAFTAR PRODUK
    */

    message +=
        `*DAFTAR PESANAN*\n`;

    message +=
        `━━━━━━━━━━━━━━━━━━━━\n\n`;


    cart.forEach(
        (item, index) => {

            const product =
                getProductById(
                    item.id
                );


            if (!product) {
                return;
            }


            const quantity =
                Number(
                    item.quantity
                );


            const price =
                Number(
                    product.price
                );


            const subtotal =
                price *
                quantity;


            message +=
                `${index + 1}. *${product.name}*\n`;


            message +=
                `   ${quantity} × ${formatRupiah(price)}\n`;


            message +=
                `   Subtotal: ${formatRupiah(subtotal)}\n\n`;

        }
    );


    /*
       TOTAL
    */

    message +=
        `━━━━━━━━━━━━━━━━━━━━\n`;

    message +=
        `*JUMLAH BARANG: ${totalQuantity}*\n`;

    message +=
        `*TOTAL PESANAN: ${formatRupiah(getCartTotal())}*\n\n`;


    /*
       CATATAN
    */

    if (customerNote) {

        message +=
            `*CATATAN PESANAN*\n`;

        message +=
            `━━━━━━━━━━━━━━━━━━━━\n`;

        message +=
            `${customerNote}\n\n`;

    }


    /*
       PENUTUP
    */

    message +=
        `━━━━━━━━━━━━━━━━━━━━\n`;

    message +=
        `Mohon konfirmasi ketersediaan barang ` +
        `dan proses pesanan saya.\n\n`;

    message +=
        `Terima kasih.\n`;

    message +=
        `BUMDesa Saibang Artha`;


    /* =====================================================
       BUAT URL WHATSAPP
    ===================================================== */

    const whatsappUrl =
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(
            message
        );


    /* =====================================================
       BUKA WHATSAPP
    ===================================================== */

    window.open(
        whatsappUrl,
        "_blank"
    );


    /* =====================================================
       SIMPAN INFORMASI ORDER TERAKHIR
       UNTUK REFERENSI BROWSER
    ===================================================== */

    const latestOrder = {

        orderNumber:
            orderNumber,

        date:
            orderDate,

        time:
            orderTime,

        customerName:
            customerName,

        customerPhone:
            customerPhone,

        customerAddress:
            customerAddress,

        customerNote:
            customerNote,

        totalQuantity:
            totalQuantity,

        total:
            getCartTotal()

    };


    try {

        localStorage.setItem(
            "saibangLastOrder",
            JSON.stringify(
                latestOrder
            )
        );

    } catch (error) {

        console.warn(
            "Order tidak dapat disimpan:",
            error
        );

    }


    /* =====================================================
       KOSONGKAN KERANJANG
    ===================================================== */

    cart = [];


    saveCart();


    updateCartUI();


    /* =====================================================
       TUTUP CHECKOUT
    ===================================================== */

    closeCheckout();


    /* =====================================================
       NOTIFIKASI
    ===================================================== */

    showToast(
        `Pesanan ${orderNumber} berhasil disiapkan.`
    );

}



/* =========================================================
   PESAN PRODUK VIA WHATSAPP
   VERSI LAMA TETAP DIPERTAHANKAN
========================================================= */

function pesanProduk(namaProduk) {


    const pesan =

        "Halo BUMDesa Saibang Artha,%0A%0A" +

        "Saya ingin menanyakan/memesan produk:%0A%0A" +

        "*" +
        namaProduk +
        "*%0A%0A" +

        "Mohon informasi mengenai harga " +
        "dan ketersediaannya.%0A%0A" +

        "Terima kasih.";


    const url =
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        pesan;


    window.open(
        url,
        "_blank"
    );

}



/* =========================================================
   PESAN PRODUK DETAIL VIA WHATSAPP
========================================================= */

function pesanProdukDetail(
    productId
) {

    const product =
        getProductById(
            productId
        );


    if (!product) {

        return;

    }


    const quantity =
        getDetailQuantity();


    const subtotal =
        product.price *
        quantity;


    const message =

        `Halo ${STORE_NAME},\n\n` +

        "Saya ingin menanyakan/memesan produk:\n\n" +

        `*${product.name}*\n` +

        `Kategori: ${product.category}\n` +

        `Jumlah: ${quantity}\n` +

        `Harga: ${formatRupiah(
            product.price
        )}\n` +

        `Subtotal: ${formatRupiah(
            subtotal
        )}\n\n` +

        "Mohon informasi mengenai " +
        "ketersediaan produk.\n\n" +

        "Terima kasih.";


    const url =
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(
            message
        );


    window.open(
        url,
        "_blank"
    );

}



/* =========================================================
   MOBILE MENU
========================================================= */

function toggleMenu() {

    const navigation =
        document.getElementById(
            "navigation"
        );


    if (navigation) {

        navigation.classList.toggle(
            "active"
        );

    }

}



/* =========================================================
   CLOSE MOBILE MENU
========================================================= */

const navigationLinks =
    document.querySelectorAll(
        ".navigation a"
    );


navigationLinks.forEach(
    function(link) {

        link.addEventListener(
            "click",
            function() {

                const navigation =
                    document.getElementById(
                        "navigation"
                    );


                if (navigation) {

                    navigation.classList.remove(
                        "active"
                    );

                }

            }
        );

    }
);



/* =========================================================
   YEAR
========================================================= */

const yearElement =
    document.getElementById(
        "year"
    );


if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}



/* =========================================================
   CREATE CART UI
========================================================= */

function createCartUI() {

    if (
        document.getElementById(
            "saibangCartButton"
        )
    ) {

        return;

    }


    /*
       FLOATING CART BUTTON
    */

    const cartButton =
        document.createElement(
            "button"
        );


    cartButton.id =
        "saibangCartButton";


    cartButton.className =
        "saibang-cart-button";


    cartButton.setAttribute(
        "aria-label",
        "Buka keranjang"
    );


    cartButton.innerHTML = `

        <i class="fa-solid fa-basket-shopping"></i>

        <span
            id="saibangCartCount"
            class="saibang-cart-count empty">

            0

        </span>

    `;


    cartButton.addEventListener(
        "click",
        openCart
    );


    document.body.appendChild(
        cartButton
    );


    /*
       CART DRAWER
    */

    const drawer =
        document.createElement(
            "div"
        );


    drawer.id =
        "saibangCartDrawer";


    drawer.className =
        "saibang-cart-drawer";


    drawer.innerHTML = `

        <div
            class="saibang-cart-overlay"
            onclick="closeCart()">
        </div>


        <aside class="saibang-cart-panel">


            <div class="saibang-cart-header">


                <div>

                    <span class="cart-label">

                        PESANAN ANDA

                    </span>


                    <h3>

                        Keranjang Belanja

                    </h3>

                </div>


                <button
                    class="cart-close"
                    onclick="closeCart()">

                    <i class="fa-solid fa-xmark"></i>

                </button>


            </div>


            <div
                id="saibangCartItems"
                class="saibang-cart-items">

            </div>


            <div class="saibang-cart-footer">


                <div class="saibang-cart-total">

                    <span>

                        Total

                    </span>


                    <strong
                        id="saibangCartTotal">

                        Rp0

                    </strong>

                </div>


                <button
                    class="saibang-checkout-button"
                    onclick="openCheckout()">

                    <span>

                        Lanjut ke Checkout

                    </span>

                    <i class="fa-solid fa-arrow-right"></i>

                </button>


                <p class="cart-footer-note">

                    Pesanan akan dikonfirmasi
                    melalui WhatsApp.

                </p>


            </div>


        </aside>

    `;


    document.body.appendChild(
        drawer
    );



    /*
       CSS UNTUK CART
    */

    createProfessionalStyles();

}



/* =========================================================
   PROFESSIONAL STYLES
========================================================= */

function createProfessionalStyles() {

    if (
        document.getElementById(
            "saibangProfessionalStyles"
        )
    ) {

        return;

    }


    const style =
        document.createElement(
            "style"
        );


    style.id =
        "saibangProfessionalStyles";


    style.textContent = `

        /* ================================================
           GENERAL
        ================================================ */

        .product-card {
            cursor: pointer;
        }


        /* ================================================
           CART BUTTON
        ================================================ */

        .saibang-cart-button {

            position: fixed;

            right: 28px;

            bottom: 28px;

            z-index: 900;

            width: 60px;

            height: 60px;

            border: none;

            border-radius: 18px;

            background:
                linear-gradient(
                    135deg,
                    #1479e9,
                    #0c63c5
                );

            color: #ffffff;

            display: flex;

            align-items: center;

            justify-content: center;

            font-size: 21px;

            cursor: pointer;

            box-shadow:
                0 12px 30px
                rgba(20,121,233,.30);

            transition:
                transform .25s ease,
                box-shadow .25s ease;

        }


        .saibang-cart-button:hover {

            transform:
                translateY(-4px);

            box-shadow:
                0 16px 35px
                rgba(20,121,233,.40);

        }


        .saibang-cart-count {

            position: absolute;

            top: -6px;

            right: -6px;

            min-width: 23px;

            height: 23px;

            padding: 0 6px;

            border-radius: 50px;

            background: #c8202f;

            color: #ffffff;

            font-size: 11px;

            font-weight: 800;

            display: flex;

            align-items: center;

            justify-content: center;

            border: 2px solid #ffffff;

        }


        .saibang-cart-count.empty {

            display: none;

        }


        /* ================================================
           MODAL
        ================================================ */

        .saibang-modal {

            position: fixed;

            inset: 0;

            z-index: 2000;

            display: flex;

            align-items: center;

            justify-content: center;

            padding: 25px;

            opacity: 0;

            visibility: hidden;

            transition:
                opacity .25s ease,
                visibility .25s ease;

        }


        .saibang-modal.show {

            opacity: 1;

            visibility: visible;

        }


        .saibang-modal-overlay {

            position: absolute;

            inset: 0;

            background:
                rgba(10,15,25,.70);

            backdrop-filter:
                blur(8px);

        }


        .saibang-modal-box {

            position: relative;

            z-index: 2;

            width: min(
                920px,
                100%
            );

            max-height:
                calc(100vh - 50px);

            overflow-y: auto;

            background: #ffffff;

            border-radius: 26px;

            box-shadow:
                0 30px 90px
                rgba(0,0,0,.25);

            transform:
                translateY(20px)
                scale(.97);

            transition:
                transform .3s ease;

        }


        .saibang-modal.show
        .saibang-modal-box {

            transform:
                translateY(0)
                scale(1);

        }


        .saibang-modal-close {

            position: absolute;

            top: 18px;

            right: 18px;

            z-index: 5;

            width: 40px;

            height: 40px;

            border: none;

            border-radius: 50%;

            background:
                rgba(255,255,255,.92);

            color: #222222;

            display: flex;

            align-items: center;

            justify-content: center;

            font-size: 16px;

            cursor: pointer;

            box-shadow:
                0 5px 15px
                rgba(0,0,0,.10);

        }


        .saibang-modal-close:hover {

            background: #c8202f;

            color: #ffffff;

        }


        /* ================================================
           PRODUCT DETAIL
        ================================================ */

        .product-detail-layout {

            display: grid;

            grid-template-columns:
                .95fr
                1.05fr;

            min-height: 500px;

        }


        .product-detail-image {

            min-height: 500px;

            display: flex;

            align-items: center;

            justify-content: center;

            padding: 55px;

            background:
                linear-gradient(
                    145deg,
                    #fff5f6,
                    #ffffff
                );

        }


        .product-detail-image img {

            width: 100%;

            max-width: 390px;

            max-height: 400px;

            object-fit: contain;

            border-radius: 15px;

        }


        .detail-image-placeholder {

            width: 250px;

            height: 250px;

            border-radius: 30px;

            display: flex;

            align-items: center;

            justify-content: center;

            background: #f4f7fb;

            color: #1479e9;

            font-size: 70px;

        }


        .product-detail-content {

            padding: 55px 55px 50px 45px;

        }


        .detail-category {

            display: inline-block;

            color: #c8202f;

            font-size: 11px;

            font-weight: 800;

            letter-spacing: 1.8px;

            text-transform: uppercase;

            margin-bottom: 12px;

        }


        .product-detail-content h2 {

            color: #111111;

            font-size: 34px;

            line-height: 1.15;

            margin-bottom: 18px;

        }


        .detail-price {

            color: #1479e9;

            font-size: 24px;

            font-weight: 800;

            margin-bottom: 14px;

        }


        .detail-stock {

            display: inline-flex;

            align-items: center;

            gap: 7px;

            font-size: 12px;

            font-weight: 700;

        }


        .detail-stock.available {

            color: #20a957;

        }


        .detail-stock.available i {

            font-size: 7px;

        }


        .detail-stock.unavailable {

            color: #c8202f;

        }


        .detail-stock.unavailable i {

            font-size: 7px;

        }


        .detail-divider {

            height: 1px;

            background: #eeeeee;

            margin: 25px 0;

        }


        .product-detail-content h4 {

            color: #111111;

            font-size: 14px;

            margin-bottom: 8px;

        }


        .detail-description {

            color: #555555;

            font-size: 13px;

            line-height: 1.8;

        }


        .detail-purchase {

            display: flex;

            align-items: center;

            justify-content: space-between;

            gap: 20px;

            margin-top: 30px;

            margin-bottom: 15px;

        }


        .detail-purchase label {

            color: #111111;

            font-size: 13px;

            font-weight: 700;

        }


        .quantity-control {

            display: flex;

            align-items: center;

            border: 1px solid #dddddd;

            border-radius: 10px;

            overflow: hidden;

            background: #ffffff;

        }


        .quantity-control button {

            width: 40px;

            height: 40px;

            border: none;

            background: #f7f8fa;

            color: #222222;

            cursor: pointer;

        }


        .quantity-control button:hover {

            background: #eaf4ff;

            color: #1479e9;

        }


        .quantity-control input {

            width: 48px;

            height: 40px;

            border: none;

            border-left: 1px solid #eeeeee;

            border-right: 1px solid #eeeeee;

            text-align: center;

            outline: none;

            color: #111111;

            font-weight: 700;

        }


        .detail-cart-button,
        .detail-wa-button {

            width: 100%;

            min-height: 48px;

            border: none;

            border-radius: 11px;

            cursor: pointer;

            font-size: 13px;

            font-weight: 800;

            display: flex;

            align-items: center;

            justify-content: center;

            gap: 10px;

            transition: .25s;

        }


        .detail-cart-button {

            background: #1479e9;

            color: #ffffff;

        }


        .detail-cart-button:hover {

            background: #0d65c5;

            transform:
                translateY(-2px);

        }


        .detail-wa-button {

            margin-top: 10px;

            background: #20b957;

            color: #ffffff;

        }


        .detail-wa-button:hover {

            background: #179746;

            transform:
                translateY(-2px);

        }


        .detail-cart-button.disabled {

            background: #eeeeee;

            color: #888888;

            cursor: not-allowed;

        }


        /* ================================================
           CART DRAWER
        ================================================ */

        .saibang-cart-drawer {

            position: fixed;

            inset: 0;

            z-index: 1900;

            visibility: hidden;

        }


        .saibang-cart-drawer.show {

            visibility: visible;

        }


        .saibang-cart-overlay {

            position: absolute;

            inset: 0;

            background:
                rgba(10,15,25,.55);

            opacity: 0;

            transition: opacity .3s ease;

            backdrop-filter: blur(4px);

        }


        .saibang-cart-drawer.show
        .saibang-cart-overlay {

            opacity: 1;

        }


        .saibang-cart-panel {

            position: absolute;

            top: 0;

            right: 0;

            height: 100%;

            width: min(
                470px,
                100%
            );

            background: #ffffff;

            display: flex;

            flex-direction: column;

            box-shadow:
                -20px 0 60px
                rgba(0,0,0,.15);

            transform:
                translateX(100%);

            transition:
                transform .35s
                cubic-bezier(.4,0,.2,1);

        }


        .saibang-cart-drawer.show
        .saibang-cart-panel {

            transform:
                translateX(0);

        }


        .saibang-cart-header {

            padding: 28px 28px 22px;

            display: flex;

            align-items: center;

            justify-content: space-between;

            border-bottom:
                1px solid #eeeeee;

        }


        .cart-label {

            display: block;

            color: #c8202f;

            font-size: 9px;

            font-weight: 800;

            letter-spacing: 1.8px;

            margin-bottom: 5px;

        }


        .saibang-cart-header h3 {

            color: #111111;

            font-size: 22px;

        }


        .cart-close {

            width: 38px;

            height: 38px;

            border: none;

            border-radius: 50%;

            background: #f5f5f5;

            cursor: pointer;

            color: #222222;

        }


        .cart-close:hover {

            background: #c8202f;

            color: #ffffff;

        }


        .saibang-cart-items {

            flex: 1;

            overflow-y: auto;

            padding: 20px 25px;

        }


        .saibang-cart-item {

            display: flex;

            gap: 14px;

            padding: 15px 0;

            border-bottom:
                1px solid #eeeeee;

        }


        .cart-item-image {

            width: 72px;

            height: 72px;

            flex-shrink: 0;

            overflow: hidden;

            border-radius: 12px;

            background: #f7f7f7;

            display: flex;

            align-items: center;

            justify-content: center;

        }


        .cart-item-image img {

            width: 100%;

            height: 100%;

            object-fit: cover;

        }


        .cart-item-placeholder {

            color: #1479e9;

            font-size: 22px;

        }


        .cart-item-info {

            flex: 1;

            min-width: 0;

        }


        .cart-item-info h4 {

            color: #111111;

            font-size: 13px;

            line-height: 1.4;

            margin-bottom: 4px;

        }


        .cart-item-info > span {

            color: #1479e9;

            font-size: 12px;

            font-weight: 700;

        }


        .cart-item-bottom {

            display: flex;

            align-items: center;

            justify-content: space-between;

            margin-top: 9px;

        }


        .cart-quantity {

            display: flex;

            align-items: center;

            border: 1px solid #dddddd;

            border-radius: 7px;

            overflow: hidden;

        }


        .cart-quantity button {

            width: 27px;

            height: 27px;

            border: none;

            background: #f7f7f7;

            cursor: pointer;

        }


        .cart-quantity button:hover {

            background: #eaf4ff;

            color: #1479e9;

        }


        .cart-quantity strong {

            width: 30px;

            text-align: center;

            font-size: 11px;

        }


        .cart-remove {

            border: none;

            background: none;

            color: #999999;

            cursor: pointer;

            font-size: 12px;

        }


        .cart-remove:hover {

            color: #c8202f;

        }


        .saibang-cart-empty {

            min-height: 400px;

            display: flex;

            align-items: center;

            justify-content: center;

            flex-direction: column;

            text-align: center;

            padding: 30px;

        }


        .cart-empty-icon {

            width: 75px;

            height: 75px;

            display: flex;

            align-items: center;

            justify-content: center;

            border-radius: 22px;

            background: #eef5ff;

            color: #1479e9;

            font-size: 28px;

            margin-bottom: 18px;

        }


        .saibang-cart-empty h4 {

            color: #111111;

            font-size: 17px;

            margin-bottom: 6px;

        }


        .saibang-cart-empty p {

            max-width: 280px;

            color: #777777;

            font-size: 12px;

            line-height: 1.7;

        }


        .saibang-cart-footer {

            padding: 22px 25px 25px;

            border-top:
                1px solid #eeeeee;

            background: #ffffff;

        }


        .saibang-cart-total {

            display: flex;

            align-items: center;

            justify-content: space-between;

            margin-bottom: 16px;

        }


        .saibang-cart-total span {

            color: #555555;

            font-size: 13px;

        }


        .saibang-cart-total strong {

            color: #111111;

            font-size: 20px;

        }


        .saibang-checkout-button {

            width: 100%;

            min-height: 50px;

            border: none;

            border-radius: 11px;

            background: #1479e9;

            color: #ffffff;

            font-size: 13px;

            font-weight: 800;

            display: flex;

            align-items: center;

            justify-content: space-between;

            padding: 0 18px;

            cursor: pointer;

        }


        .saibang-checkout-button:hover {

            background: #0d65c5;

        }


        .cart-footer-note {

            margin-top: 10px;

            text-align: center;

            color: #888888;

            font-size: 10px;

        }


        /* ================================================
           CHECKOUT
        ================================================ */

        .saibang-checkout-box {

            position: relative;

            z-index: 2;

            width: min(
                650px,
                100%
            );

            max-height:
                calc(100vh - 40px);

            overflow-y: auto;

            background: #ffffff;

            border-radius: 25px;

            padding: 35px;

            box-shadow:
                0 30px 90px
                rgba(0,0,0,.25);

            transform:
                translateY(20px)
                scale(.97);

            transition:
                transform .3s ease;

        }


        .saibang-modal.show
        .saibang-checkout-box {

            transform:
                translateY(0)
                scale(1);

        }


        .checkout-header {

            padding-right: 35px;

            margin-bottom: 25px;

        }


        .checkout-label {

            color: #c8202f;

            font-size: 9px;

            font-weight: 800;

            letter-spacing: 1.8px;

        }


        .checkout-header h2 {

            color: #111111;

            font-size: 27px;

            margin:
                6px 0 7px;

        }


        .checkout-header p {

            color: #666666;

            font-size: 12px;

            line-height: 1.7;

        }


        .checkout-summary {

            padding: 20px;

            border-radius: 15px;

            background: #f8fbff;

            border:
                1px solid #e8f0fa;

            margin-bottom: 22px;

        }


        .checkout-summary-title {

            color: #111111;

            font-size: 12px;

            font-weight: 800;

            margin-bottom: 12px;

        }


        .checkout-summary-items {

            display: flex;

            flex-direction: column;

            gap: 10px;

        }


        .checkout-summary-item {

            display: flex;

            align-items: center;

            justify-content: space-between;

            gap: 20px;

            padding-bottom: 10px;

            border-bottom:
                1px solid #e5ebf2;

        }


        .checkout-summary-item > div {

            display: flex;

            flex-direction: column;

            gap: 2px;

        }


        .checkout-summary-item strong {

            color: #222222;

            font-size: 11px;

        }


        .checkout-summary-item span {

            color: #777777;

            font-size: 10px;

        }


        .checkout-total-row {

            display: flex;

            align-items: center;

            justify-content: space-between;

            margin-top: 15px;

        }


        .checkout-total-row span {

            color: #555555;

            font-size: 12px;

        }


        .checkout-total-row strong {

            color: #1479e9;

            font-size: 18px;

        }


        .checkout-form {

            display: flex;

            flex-direction: column;

            gap: 15px;

        }


        .checkout-field {

            display: flex;

            flex-direction: column;

            gap: 7px;

        }


        .checkout-field label {

            color: #222222;

            font-size: 11px;

            font-weight: 800;

        }


        .checkout-field input,
        .checkout-field textarea {

            width: 100%;

            border:
                1px solid #dddddd;

            border-radius: 10px;

            padding:
                12px 13px;

            outline: none;

            color: #111111;

            background: #ffffff;

            font-size: 12px;

            resize: vertical;

            transition: .2s;

        }


        .checkout-field input:focus,
        .checkout-field textarea:focus {

            border-color: #1479e9;

            box-shadow:
                0 0 0 3px
                rgba(20,121,233,.08);

        }


        .checkout-whatsapp-button {

            min-height: 50px;

            border: none;

            border-radius: 11px;

            background: #20b957;

            color: #ffffff;

            font-size: 13px;

            font-weight: 800;

            cursor: pointer;

            display: flex;

            align-items: center;

            justify-content: center;

            gap: 10px;

            margin-top: 5px;

            transition: .25s;

        }


        .checkout-whatsapp-button:hover {

            background: #179746;

            transform:
                translateY(-2px);

        }


        .checkout-note {

            display: flex;

            align-items: center;

            justify-content: center;

            gap: 6px;

            color: #888888;

            font-size: 10px;

            text-align: center;

        }


        /* ================================================
           TOAST
        ================================================ */

        .saibang-toast {

            position: fixed;

            left: 50%;

            bottom: 30px;

            z-index: 5000;

            transform:
                translate(-50%, 20px);

            opacity: 0;

            pointer-events: none;

            background: #111111;

            color: #ffffff;

            border-radius: 12px;

            padding:
                12px 18px;

            font-size: 12px;

            box-shadow:
                0 12px 30px
                rgba(0,0,0,.18);

            transition:
                opacity .25s ease,
                transform .25s ease;

        }


        .saibang-toast.show {

            opacity: 1;

            transform:
                translate(-50%, 0);

        }


        /* ================================================
           MOBILE
        ================================================ */

        @media (max-width: 700px) {

            .saibang-cart-button {

                right: 18px;

                bottom: 18px;

                width: 55px;

                height: 55px;

                border-radius: 16px;

            }


            .product-detail-layout {

                grid-template-columns: 1fr;

            }


            .product-detail-image {

                min-height: 280px;

                padding: 30px;

            }


            .product-detail-image img {

                max-height: 240px;

            }


            .product-detail-content {

                padding:
                    30px 25px 30px;

            }


            .product-detail-content h2 {

                font-size: 25px;

            }


            .saibang-modal {

                padding: 12px;

            }


            .saibang-modal-box {

                max-height:
                    calc(100vh - 24px);

                border-radius: 20px;

            }


            .saibang-checkout-box {

                padding: 25px 20px;

                max-height:
                    calc(100vh - 24px);

                border-radius: 20px;

            }


            .checkout-header h2 {

                font-size: 23px;

            }


            .detail-purchase {

                align-items: flex-start;

                flex-direction: column;

            }

        }


    `;


    document.head.appendChild(
        style
    );

}



/* =========================================================
   TOAST NOTIFICATION
========================================================= */

let toastTimer = null;


function showToast(message) {

    let toast =
        document.getElementById(
            "saibangToast"
        );


    if (!toast) {

        toast =
            document.createElement(
                "div"
            );


        toast.id =
            "saibangToast";


        toast.className =
            "saibang-toast";


        document.body.appendChild(
            toast
        );

    }


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2800
        );

}



/* =========================================================
   KEYBOARD CONTROL
========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            closeProductDetail();

            closeCart();

            closeCheckout();

        }

    }
);



/* =========================================================
   INITIALIZE CART UI
========================================================= */

createCartUI();


updateCartUI();



/* =========================================================
   INITIALIZE CATALOG
========================================================= */

renderCategories();

renderProducts();



/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "BUMDesa Saibang Artha - Professional Catalog aktif."
);

console.log(
    "Detail Produk + Keranjang + Checkout WhatsApp aktif."
);
/* =========================================================
   TAHAP 3.2
   STOCK SYSTEM
========================================================= */

function getStockStatus(stock) {

    const quantity =
        Number(stock) || 0;


    if (quantity <= 0) {

        return {
            type: "out",
            text: "Stok Habis"
        };

    }


    if (quantity <= 5) {

        return {
            type: "low",
            text: `Stok Terbatas · ${quantity}`
        };

    }


    return {
        type: "available",
        text: `Stok Tersedia · ${quantity}`
    };

}