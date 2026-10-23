const photos = [{"src": "images/butterflies.jpeg", "title": "Butterflies in the Garden", "category": "Nature", "description": "A quiet moment among the butterflies", "width": 1536, "height": 2048}, {"src": "images/street-scene.jpeg", "title": "A Quiet Street", "category": "Travel", "description": "Everyday scenes from Singapore", "width": 2048, "height": 1536}, {"src": "images/cat-socrates.jpeg", "title": "Cat Socrates", "category": "Architecture", "description": "A little corner full of character", "width": 1536, "height": 2048}, {"src": "images/bookshop-bicycle.jpeg", "title": "Stories on Wheels", "category": "Street", "description": "A charming bookshop and its bicycle", "width": 2048, "height": 1536}, {"src": "images/oceanarium.jpeg", "title": "Into the Blue", "category": "Travel", "description": "Silhouettes beneath the aquarium glow", "width": 1536, "height": 2048}, {"src": "images/singapore-skyline.jpeg", "title": "Singapore from Above", "category": "Architecture", "description": "The city skyline in the afternoon light", "width": 2048, "height": 1536}];
const grid = document.getElementById('photoGrid');
const filters = document.getElementById('filters');
const modal = document.getElementById('photoModal');
let activePhoto = null;

function renderPhotos(filter = 'All') {
  const visible = photos.filter(p => filter === 'All' || p.category === filter);
  grid.innerHTML = visible.map((p) => {
    const index = photos.indexOf(p) + 1;
    return `<article class="photo-card" tabindex="0" role="button" aria-label="View ${p.title}" data-title="${p.title}">
      <div class="photo-thumb"><img src="${p.src}" alt="${p.title}" loading="lazy"><span class="card-open">↗</span></div>
      <div class="photo-meta"><div><h3>${p.title}</h3><p>${p.category} · ${p.width} × ${p.height}</p></div><span class="photo-number">${String(index).padStart(2,'0')}</span></div>
    </article>`;
  }).join('');
  grid.querySelectorAll('.photo-card').forEach(card => {
    const open = () => showPhoto(photos.find(p => p.title === card.dataset.title));
    card.addEventListener('click', open);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });
}
function showPhoto(photo) {
  activePhoto = photo;
  document.getElementById('modalImage').src = photo.src;
  document.getElementById('modalImage').alt = photo.title;
  document.getElementById('modalTitle').textContent = photo.title;
  document.getElementById('modalCategory').textContent = `${photo.category} · ${photo.width} × ${photo.height}`;
  document.getElementById('modalDescription').textContent = photo.description;
  document.getElementById('downloadFormat').value = 'original';
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  document.getElementById('modalClose')?.focus();
}
function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
filters.addEventListener('click', e => {
  const button = e.target.closest('[data-filter]');
  if (!button) return;
  filters.querySelectorAll('.filter').forEach(b => b.classList.toggle('active', b === button));
  renderPhotos(button.dataset.filter);
});
document.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeModal));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
document.getElementById('downloadButton').addEventListener('click', () => {
  if (!activePhoto) return;
  const format = document.getElementById('downloadFormat').value;
  const a = document.createElement('a');
  a.href = activePhoto.src;
  a.download = activePhoto.src.split('/').pop().replace('.jpeg', '.jpg');
  a.click();
  if (format !== 'original') {
    alert('Prototype preview: this currently downloads the original photograph. In the next version we can generate a real ' + (format === 'phone' ? 'portrait phone' : 'landscape desktop') + ' crop.');
  }
});
document.getElementById('year').textContent = new Date().getFullYear();
renderPhotos();