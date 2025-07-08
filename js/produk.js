// Ambil parameter dari URL
const urlParams = new URLSearchParams(window.location.search);
const kategori = urlParams.get('kategori');

// Tampilkan kategori di halaman (opsional)
if (kategori) {
  const heading = document.querySelector('.produk h2');
  heading.textContent = `Produk untuk ${kategori.charAt(0).toUpperCase() + kategori.slice(1)}`;
}

// Filter produk berdasarkan kategori (contoh sederhana)
const semuaProduk = document.querySelectorAll('.produk-item');

semuaProduk.forEach(produk => {
  const kategoriProduk = produk.dataset.kategori; // misalnya data-kategori="hiking"
  if (kategori && kategoriProduk !== kategori) {
    produk.style.display = 'none';
  }
});

const filterButtons = document.querySelectorAll('.filter-buttons button');
const produkItems = document.querySelectorAll('.produk-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const kategori = button.getAttribute('data-filter');

    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    produkItems.forEach(item => {
      const itemKategori = item.getAttribute('data-kategori');
      if (kategori === 'all' || itemKategori === kategori) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
    const tombol = document.getElementById("tambahKeranjang");

    tombol.addEventListener("click", function (e) {
      e.preventDefault();

      const jumlahInput = document.getElementById("jumlah");
      const jumlah = parseInt(jumlahInput.value);

      if (isNaN(jumlah) || jumlah < 1) {
        alert("Jumlah harus minimal 1");
        return;
      }

      const produk = {
        id: "tenda-2p",
        nama: "Tenda Gunung Tropic 2P",
        harga: 1200000,
        jumlah: jumlah,
        gambar: "images/tenda.jpg"
      };

      let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

      const index = keranjang.findIndex(item => item.id === produk.id);
      if (index !== -1) {
        keranjang[index].jumlah += jumlah;
      } else {
        keranjang.push(produk);
      }

      localStorage.setItem("keranjang", JSON.stringify(keranjang));

      // Redirect ke halaman keranjang
      window.location.href = "keranjang.html";
    });
  });