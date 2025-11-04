// 1. Ambil elemen DOM

// TODO: Isi variabel di bawah dengan fungsi getElementById sesuai id
var inputGram = document.getElementById("emas-gram");      // input jumlah emas
var tombol = document.getElementById("hitung");         // tombol hitung
var hasil = document.getElementById("hasil");          // area output hasil
var historyList = document.getElementById("history");    // daftar riwayat


// 2. Tentukan harga emas per gram

// TODO: Isi dengan nilai harga emas/gram rumahan (misal: 1100000)
var hargaEmasRupiah = 2000000;


// 3. Fungsi menampilkan history dari localStorage

function muatHistory() {
  // TODO:
  // Ambil data dari localStorage key 'zakatHistory'
  // Parsing ke array, tampilkan list ke historyList.innerHTML
  var data = localStorage.getItem("zakatHistory");

  if (data) {
    var array = JSON.parse(data);
    var tampilan = "";

    for (let i = 0; i < array.length; i++) {
      tampilan += "<li>" + array[i] + "</li>";
    }

    historyList.innerHTML = tampilan;
  } else {
    historyList.innerHTML = "";
  }
}


// 4. Fungsi menyimpan history ke localStorage

function simpanHistory(text) {
  // TODO:
  // Ambil daftar lama dari localStorage,
  // tambah item baru, batasi max 10 data terakhir,
  // simpan ulang, lalu tampilkan ulang riwayat!
  var data = localStorage.getItem("zakatHistory");
  var array = data ? JSON.parse(data) : [];

  array.unshift(text);
  if (array.length > 10) array.pop();

  localStorage.setItem("zakatHistory", JSON.stringify(array));
  muatHistory();
}


// 5. Event logic tombol Hitung

tombol.addEventListener('click', function () {
  // TODO: ambil nilai input emas, parsing ke number, nisab = 85
  var emas = parseFloat(inputGram.value);
  var nisab = 85;

  // TODO: Jika input tidak valid, tampilkan pesan error dan return
  if (inputGram.value === "" || emas <= 0) {
    hasil.textContent = "Masukkan jumlah emasnya yg benar coyy!!";
    return;
  }


  // TODO: Jika emas < nisab, tampilkan "Belum wajib zakat" dan simpan ke riwayat
  if (emas < nisab) {
    hasil.textContent = "Belum wajib zakat"
    simpanHistory(`Emas ${emas} gram = Belum Wajib zakat`)
  } else {
    // TODO: Hitung zakat = emas * 0.025, rupiah = zakat * hargaEmasRupiah
    // hasil.textContent = ...
    // simpanHistory(...)
    var zakatGram = emas * 0.025;
    var zakatRupiah = zakatGram * hargaEmasRupiah;

    hasil.textContent =
      "Wajib zakat " + zakatGram + " gram (sekitar Rp " + zakatRupiah + ")";

    simpanHistory(
      "Emas " + emas + " gram = Zakat " + zakatGram + " gr (Rp " + zakatRupiah + ")"
    );
  }

  // TODO: Kosongkan inputGram setelah proses
  inputGram.value = "";
});


// 6. Jalankan fungsi menampilkan riwayat saat halaman dibuka
// TODO: Panggil muatHistory() agar riwayat langsung tampil
muatHistory();