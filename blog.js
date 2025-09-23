// Simple blog page JS: search, category filter, post modal, back-to-top

document.addEventListener('DOMContentLoaded', () => {
  const postsGrid = document.getElementById('postsGrid');
  const postCards = Array.from(postsGrid.querySelectorAll('article'));
  const searchInput = document.getElementById('postSearch');
  const clearBtn = document.getElementById('clearSearch');
  const categoryFilter = document.getElementById('categoryFilter');
  const backTop = document.getElementById('backTop');

  // Filter function
  function filterPosts() {
    const q = searchInput.value.trim().toLowerCase();
    const cat = categoryFilter.value;
    postCards.forEach(card => {
      const title = card.querySelector('.card-title').innerText.toLowerCase();
      const category = card.dataset.category || '';
      const matchesText = q === '' ? true : (title.includes(q) || (card.dataset.title||'').includes(q));
      const matchesCat = cat === '' ? true : (category === cat);
      card.style.display = (matchesText && matchesCat) ? '' : 'none';
    });
  }

  // Event listeners
  searchInput.addEventListener('input', filterPosts);
  clearBtn.addEventListener('click', (e) => {
    e.preventDefault();
    searchInput.value = '';
    categoryFilter.value = '';
    filterPosts();
  });
  categoryFilter.addEventListener('change', filterPosts);

  // Category links in sidebar
  document.querySelectorAll('.category-link').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const c = a.dataset.cat || '';
      categoryFilter.value = c;
      filterPosts();
      window.scrollTo({ top: 200, behavior: 'smooth' });
    });
  });

  // Back to top show/hide
  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) backTop.style.display = 'block';
    else backTop.style.display = 'none';
  });
  backTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  // Post modal content (simple static demo content)
  const bsModal = new bootstrap.Modal(document.getElementById('postModal'), {});
  function openPost(id) {
    const title = { post1: '7 Science-backed Benefits of Almonds', post2: 'Easy Spiced Roasted Cashews', post3: '3 Creative Ways to Enjoy Pistachios', post4: 'From Vine to Jar: How Raisins are Made' };
    const img = { post1: 'Backdround/almonds.jpg', post2: 'Backdround/cashews.jpg', post3: 'Backdround/pistachios.jpg', post4: 'Backdround/raisins.jpg' };
    const body = {
      post1: '<p>Almonds contain healthy fats and protein. They are a good snack to include in your diet...</p>',
      post2: '<p>To roast cashews at home start with raw nuts, add spices, roast and enjoy...</p>',
      post3: '<p>Pistachios pair well with cheese, yogurt, and desserts. Try them in salads.</p>',
      post4: '<p>Raisins are sun-dried grapes. The process includes harvesting, drying and packing...</p>'
    };

    document.getElementById('postModalTitle').innerText = title[id] || 'Post';
    document.getElementById('postModalImg').src = img[id] || '';
    document.getElementById('postModalText').innerHTML = body[id] || '<p>Content coming soon.</p>';
    bsModal.show();
  }

  // Attach read more links & sidebar links
  document.querySelectorAll('[data-full]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.dataset.full;
      openPost(id);
    });
  });

  // Newsletter demo (basic)
  document.getElementById('newsletterForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thanks for subscribing! (demo)');
    e.target.reset();
  });
});
