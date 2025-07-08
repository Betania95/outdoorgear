document.addEventListener("DOMContentLoaded", function () {
  const keranjangBody = document.getElementById("keranjang-body");
  const totalBelanjaEl = document.querySelector(".total-belanja p");
  let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

  function formatRupiah(angka) {
    return "Rp" + angka.toLocaleString("id-ID");
  }

  function renderKeranjang() {
    keranjangBody.innerHTML = "";

    let totalBelanja = 0;

    keranjang.forEach((item, index) => {
      const subtotal = item.harga * item.jumlah;
      totalBelanja += subtotal;

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>
          <img src="${item.gambar}" alt="${item.nama}" width="50" style="vertical-align: middle; margin-right: 10px;" />
          ${item.nama}
        </td>
        <td class="harga-satuan" data-harga="${item.harga}">${formatRupiah(item.harga)}</td>
        <td>
          <input type="number" class="jumlah-input" value="${item.jumlah}" min="1" data-index="${index}" />
        </td>
        <td class="total-item">${formatRupiah(subtotal)}</td>
        <td><button class="hapus-btn" data-index="${index}">🗑️</button></td>
      `;
      keranjangBody.appendChild(row);
    });

    totalBelanjaEl.innerHTML = `<strong>Total: ${formatRupiah(totalBelanja)}</strong>`;
    localStorage.setItem("keranjang", JSON.stringify(keranjang));
  }

  // Event: Ubah jumlah
  keranjangBody.addEventListener("input", function (e) {
    if (e.target.classList.contains("jumlah-input")) {
      const index = e.target.dataset.index;
      const jumlahBaru = parseInt(e.target.value);
      if (jumlahBaru >= 1) {
        keranjang[index].jumlah = jumlahBaru;
        renderKeranjang();
      }
    }
  });

  // Event: Hapus item
  keranjangBody.addEventListener("click", function (e) {
    if (e.target.classList.contains("hapus-btn")) {
      const index = e.target.dataset.index;
      keranjang.splice(index, 1);
      renderKeranjang();
    }
  });

  renderKeranjang();
});
