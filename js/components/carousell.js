document.addEventListener('DOMContentLoaded', () => {
  Carousell();
});

async function Carousell() {
  const carousel = document.getElementById('carousel');
  const prev = document.querySelector('.btn.prev');
  const next = document.querySelector('.btn.next');
  ;

  try {
    const res = await fetch('/utils/review.json');
    if (!res.ok) throw new Error('Error al cargar JSON: ' + res.status);
    const data = await res.json();
    renderCards(data);
  } catch (err) {
    console.error(err);
    carousel.innerHTML = '<div style="padding:20px;color:#900">No se pudo cargar los comentarios.</div>';
  }

  function renderCards(items) {
    carousel.innerHTML = '';
    items.forEach(it => {
      const card = document.createElement('article');
      card.className = 'cardCarousell';
      card.innerHTML = `
      <div class = "presentation">
        <div class = "stars">
          <h4>${(it.name)}</h4>
          <div>⭐ ${(String(it.calification || it.Calification || ''))}</div>
      </div>
        <small>${(it.municipio || it.Municipio || '')} — ${(it.date || '')}</small>
      </div>
        <p>${(it.description || '')}</p>
      `;
      carousel.appendChild(card);
    });


    // opcional: enfocar primer elemento
    carousel.children[0]?.setAttribute('tabindex', '0');
  }

  prev.addEventListener('click', () => {

    const amount = carousel.clientWidth * 0.98;
    carousel.scrollBy({ left: -amount, behavior: 'smooth' });
  });

  next.addEventListener('click', () => {
    const amount = carousel.clientWidth * 0.98;
    carousel.scrollBy({ left: amount, behavior: 'smooth' });
  });
}