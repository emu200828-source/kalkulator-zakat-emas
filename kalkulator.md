// 1. Ambil elemen DOM
var inputGram = document.getElementById("emas-gram");      // input jumlah emas
var tombol = document.getElementById("hitung");            // tombol hitung
var hasil = document.getElementById("hasil");              // area output hasil
var historyList = document.getElementById("history");      // daftar riwayat


// 2. Tentukan harga emas per gram
var hargaEmasRupiah = 2000000;


// 3. Fungsi menampilkan history dari localStorage
function muatHistory() {
  var data = localStorage.getItem("zakatHistory");

  if (data) {
    var array = JSON.parse(data);
    var tampilan = "";

    for (var i = 0; i < array.length; i++) {
      tampilan += "<li>" + array[i] + "</li>";
    }

    historyList.innerHTML = tampilan;
  } else {
    historyList.innerHTML = "";
  }
}


// 4. Fungsi menyimpan history ke localStorage
function simpanHistory(text) {
  var data = localStorage.getItem("zakatHistory");
  var array = data ? JSON.parse(data) : [];

  array.unshift(text);
  if (array.length > 10) array.pop();

  localStorage.setItem("zakatHistory", JSON.stringify(array));
  muatHistory();
}


// 5. Event logic tombol Hitung
tombol.addEventListener('click', function () {
  var emas = parseFloat(inputGram.value);
  var nisab = 85;

  if (isNaN(emas) || emas <= 0) {
    hasil.textContent = "Masukkan jumlah emasnya yg benar coyy!!";
    return;
  }

  if (emas < nisab) {
    hasil.textContent = "Belum wajib zakat";
    simpanHistory("Emas " + emas + " gram → Belum wajib zakat");
  } else {
    var zakatGram = emas * 0.025;
    var zakatRupiah = zakatGram * hargaEmasRupiah;

    hasil.textContent =
      "Wajib zakat " + zakatGram + " gram (sekitar Rp " + zakatRupiah + ")";

    simpanHistory(
      "Emas " + emas + " gram → Zakat " + zakatGram + " gr (Rp " + zakatRupiah + ")"
    );
  }

  inputGram.value = "";
});


// 6. Jalankan fungsi menampilkan riwayat saat halaman dibuka
muatHistory();
