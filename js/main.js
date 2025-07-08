//            <li><a href="products.html">Produk</a></li>
  let lastScrollTop = 0;
  const header = document.querySelector('.site-header');

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      // Scroll ke bawah → sembunyikan header
      header.classList.add('hide');
    } else {
      // Scroll ke atas → tampilkan header
      header.classList.remove('hide');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });

  // Toggle menu untuk mobile
  document.getElementById('menu-toggle').addEventListener('click', () => {
    document.querySelector('.main-nav').classList.toggle('active');
  });
  

