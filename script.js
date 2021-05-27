// untuk dropdown search bar
$(".ikon-search").click(function () {
    $(".dropdown-search").toggleClass("active-dropdown");
});

// untuk memunculkan alert ketika cart dihapus dan set Cart Badge
// Ketika tekan Cart Remove
$(".cart-remove").click(function () {
    arrayHapus = $(this).parents(".cart-item").remove();
    $(".template .alert-cart").clone().appendTo(".alert-container");
    tampilAlert($(".alert-container .alert-cart"));
    set_Cart_Badge(jmlCart());
    hitung_subtotal();
});

//berfungsi untuk memunculkan Alert ketika tekan add cart

//alert pada Shop to Cart
$(".add-cart").click(function () {
    $(".template .alert").clone().appendTo(".alert-container");
    tampilAlert($(".alert-container .alert"));

    //menambahkan / mengupdate Cart Badge
    let jml = parseInt(get_Cart_Badge());
    jml += 1;
    set_Cart_Badge(jml);
});
//alert pada halamaan SHOP dan Home
$(".btn-add-cart input").click(function () {
    let jml = parseInt(get_Cart_Badge());
    if (this.checked) {
        $(this).parent().addClass("active");
        tambahAlert("prepend", "default");
        $(".alert-container").removeClass("d-none");
        const alert = $(".alert-container .alert").eq(0);
        tampilAlert(alert);
        setTimeout(function () {
            hilangAlert(alert);
        }, 3000);
        jml += 1;
        set_Cart_Badge(jml);
    } else {
        $(this).parent().removeClass("active");
        tambahAlert("prepend", "Tambah ke keranjang dibatalkan");
        const alert = $(".alert-container .alert").eq(0);
        tampilAlert(alert);
        setTimeout(function () {
            hilangAlert(alert);
        }, 3000);
        jml -= 1;
        set_Cart_Badge(jml);
    }
    //menambahkan / mengupdate Cart Badge
});

// untuk mengetahui halaman apa yang sedang aktif pada navbar
const HalamanSekarang = location.href;
const menuItem = document.getElementsByClassName("nav-link");
for (let i = 0; i < menuItem.length; i++) {
    if (menuItem[i] == HalamanSekarang) {
        menuItem[i].classList.add("active");
    }
}

//berfungsi sebagai setter dan getter dari Cart Badge
function set_Cart_Badge(jumlah) {
    $(".cart__badge").text(jumlah);
}
function get_Cart_Badge() {
    return $(".cart__badge").text();
}

//Set Cart Badge ketika di halaman Cart
set_Cart_Badge(jmlCart());

//fungsi untuk alert tanpa menambah elemen
function hilangAlert(alert) {
    alert.removeClass("active");
}
function tampilAlert(alert) {
    setInterval(alert.addClass("active"), 400);
}

//  fungsi untuk alert dengan menambah elemen
function tambahAlert(posisi, string) {
    if (posisi == "prepend" && string == "default") {
        $(".alert-container").prepend(
            '<div class="alert bg-warning" role="alert"> <span> Berhasil menambahkan produk ke dalam Cart.<a href="Cart.html"> Klik disini</a> untuk mengecek!</span><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
        );
    } else if (posisi == "prepend" && string != "default") {
        $(".alert-container").prepend('<div class="alert bg-warning" role="alert"> <span>' + string + '</span><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
    } else if (posisi == "append" && string != "default") {
        $(".alert-container").append('<div class="alert bg-warning" role="alert"> <span>' + string + '</span><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
    }
}

//fungsi untuk mencari jumlah cart
function jmlCart() {
    const Cart_item = document.getElementsByClassName("cart-item");
    return Cart_item.length;
}

//fungsi untuk menghitung sub total pada cart
function hitung_subtotal() {
    var cart_item = $(".cart-item");
    var harga = 0;
    for (let i = 0; i < cart_item.length; i++) {
        harga += parseInt($(".cart-item .harga-list span").eq(i).text(), 10);
        $(".cart-item .sub-total p")
            .eq(i)
            .text("Rp " + harga + ".000");
    }
}

hitung_subtotal();

$(".menu-side-bar").click(function () {
    $(".container-side-bar").toggleClass("active");
    $(".material-icons").toggleClass("material-icons-active");
});

//untuk mengatur hitungan diskon secara otomatis di menu shop
function TambahDiskon(element, persenDiskon) {
    element.find(".produk").prepend('<div class="diskon-badge" + ">' + persenDiskon + "%</div>");
    const hargaAwal = Number(hapus_Sampah(element.find(".harga-produk .harga").text()));
    console.log(hargaAwal);
    element.find(".harga-produk").prepend('<p class="harga-diskon">' + formatRupiah(hargaAwal, "Rp ") + "</p>");
    element.find(".harga-produk .harga").text(formatRupiah(hargaAwal * ((100 - persenDiskon) / 100), "Rp "));
}

function hapus_Sampah(angka) {
    for (let i = 0; i < angka.length; i++) {
        angka = angka.replace(".", "");
        angka = angka.replace(" ", "");
        angka = angka.replace("Rp", "");
    }

    return angka;
}

function formatRupiah(angka, mataUang) {
    var split, sisa, rupiah, ribuan, separator;
    var number_string = angka.toString(),
        split = number_string.split(","),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
        separator = sisa ? "." : "";
        rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
    return mataUang == undefined ? rupiah : rupiah ? "Rp " + rupiah : "";
}

const email = "admin123@admin.com";
const password = "admin";

$("#masuk-btn").click(function () {
    if ($("#inputEmail").val() == "" || $("#inputPassword").val() == "") {
        $(".alert .deskripsi").text("Input dulu dong sayang");
        $(".alert").addClass("active");
    }
    //jika email salah
    else if ($("#inputEmail").val() == email && $("#inputPassword").val() != password) {
        $(".alert .deskripsi").text("Password yang anda masukan salah!");
        $(".alert").addClass("active");
    }
    //jika password salah
    else if ($("#inputEmail").val() != email && $("#inputPassword").val() != password) {
        $(".alert .deskripsi").text("Tidak ada akun dengan email tersebut!");
        $(".alert").addClass("active");
    }
    //jika benar
    else if ($("#inputEmail").val() == email && $("#inputPassword").val() == password) {
        $(".alert").removeClass("alert-danger");
        $(".alert").addClass("alert-success");
        $(".alert .material-icons").text(" check_circle ");
        $(".alert .deskripsi").text("Benar :)");
        $(".alert").addClass("active");
        $(".login-btn").removeClass("active");
        $(".profile-icon").addClass("active");
    }
});

//untuk melihat dan menghilangkan password
$("#toggle-visible").click(function () {
    var tipe = document.getElementById("inputPassword");
    if (tipe.type === "password") {
        console.log("terlihat");
        tipe.type = "text";
    } else {
        console.log("sembunyikan");
        tipe.type = "password";
    }
});
var pakaian = [
    "Blus",
    "Bolero",
    "Blazer",
    "Little Black Dress",
    "Dress",
    "Cardingan",
    "Long Coat",
    "Tanktop",
    "Sweater",
    "Rompi",
    "Hoodie",
    "Overalls",
    "Jumpsuit",
    "Catsuit",
    "Pencil Skirt",
    "Pantsuit",
    "Legging",
    "Palazzo",
    "Gauho Pants",
    "Cargo Pant",
    "Bell Bottom Pants",
    "Deck Pants",
    "Gamis",
    "Kaftan",
    "Chador",
    "Abaya",
    "Shalwar Kameez",
    "Lingering",
    "Slip Dress",
];

pakaian.sort();

const card_title = $(".card-title");
for (let i = 0; i < card_title.length; i++) {
    $(".card-title").eq(i).text(pakaian[i]);
}

//Menambahkan diskon
const diskon = $(".container-card").eq(2);
TambahDiskon(diskon, 30);
// auto refill
function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a,
            b,
            i,
            val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) {
            //up
            /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = x.length - 1;
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}
$("#input-search").click(function () {
    autocomplete(document.getElementById("input-search"), pakaian);
});
