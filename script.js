/* ==========================================================================
SCRIPT.JS — MEMBANGUN HALAMAN DARI CONFIG.JS
========================================================================== */

/* ----------------------------- 1. ALAT BANTU ----------------------------- */
const $ = id => document.getElementById(id);

// Amankan teks sebelum dimasukkan ke HTML (XSS Protection)
const esc = text => String(text).replace(/[&<>"']/g, char => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}[char]));

const root = document.documentElement;

/* -------------------------------- 2. WARNA -------------------------------- */
const toCssVars = colors =>
  Object.entries(colors).map(([name, value]) => `--${name}:${value}`).join(';');

document.head.insertAdjacentHTML('beforeend', `
<style>
  :root { ${toCssVars(SITE.colors)}; ${toCssVars(SITE.light)} }
  [data-theme="dark"] { ${toCssVars(SITE.dark)} }
</style>`);

document.title = SITE.brand + " — Link in Bio";

/* -------------------------------- 3. PROFIL -------------------------------- */
$('brand').textContent       = SITE.brand;
$('bio').textContent         = SITE.bio;
$('linksTitle').textContent  = SITE.linksTitle;
$('footer').textContent      = SITE.footer;

// Avatar: kalau berakhiran .png/.jpg/dll dianggap gambar, selain itu teks/emoji
const avatarIsImage = /\.(png|jpe?g|webp|svg)$/i.test(SITE.avatar);
$('avatar').innerHTML = avatarIsImage
  ? `<img src="${esc(SITE.avatar)}" alt="Logo ${esc(SITE.brand)}">`
  : esc(SITE.avatar);

// Ikon bulat di bawah bio = link ber-group "sosmed"
$('socials').innerHTML = SITE.links
  .filter(link => link.group === 'sosmed')
  .map(link => {
    const isImage = /\.(png|jpe?g|webp|svg|gif)$/i.test(link.icon);
    const iconHtml = isImage 
      ? `<img src="${esc(link.icon)}" alt="${esc(link.label)}">` 
      : link.icon;
    
    return `<li><a href="${esc(link.url)}" target="_blank" rel="noopener" aria-label="${esc(link.label)}" title="${esc(link.label)}">${iconHtml}</a></li>`;
  })
  .join('');    

/* ---------------------- 4. LAYANAN & PORTOFOLIO ---------------------- */
$('services').innerHTML = SITE.services.map(service => `
  <article class="service">
    <b>${esc(service.name)}</b>
    <span class="price">${esc(service.price)}</span>
    <p>${esc(service.desc)}</p>
  </article>`).join('');

$('oService').innerHTML = SITE.services
  .map(service => `<option>${esc(service.name)}</option>`)
  .join('');

$('portfolio').innerHTML = SITE.portfolio.map(work => {
  const bgImage = work.image ? `url('${esc(work.image)}')` : '';
  return `
    <div class="work" style="background-color:${esc(work.color)}; background-image:${bgImage}">
      <b>${esc(work.title)}</b>
      <span>${esc(work.tag)}</span>
    </div>`;
}).join('');

/* ------------------- 5. TAB (LINK + BAGIAN YANG TAMPIL) ------------------- */
const tabsEl = $('tabs');

tabsEl.innerHTML = SITE.menus.map(menu => `
  <button class="tab" role="tab" aria-selected="false" data-id="${esc(menu.id)}">
    ${esc(menu.label)}
  </button>`).join('');

function showTab(tabId) {
  tabsEl.querySelectorAll('.tab').forEach(button => {
    button.setAttribute('aria-selected', button.dataset.id === tabId);
  });

  const visibleLinks = tabId === 'semua'
    ? SITE.links
    : SITE.links.filter(link => link.group === tabId);

  $('count').textContent = `Menampilkan ${visibleLinks.length} link`;

  $('links').innerHTML = visibleLinks.map(link => {
    const isExternal = /^https?:/.test(link.url);
    const isImage = /\.(png|jpe?g|webp|svg|gif)$/i.test(link.icon);
    const iconHtml = isImage 
      ? `<img src="${esc(link.icon)}" alt="${esc(link.label)}" class="icon-img">` 
      : `<span class="icon">${link.icon}</span>`;
    
    return `<li><a href="${esc(link.url)}" ${isExternal ? 'target="_blank" rel="noopener"' : ''}>${iconHtml}${esc(link.label)}</a></li>`;
  }).join('');

  const allowed = SITE.tabSections[tabId] || [];
  ['layanan', 'portofolio', 'pesan'].forEach(sectionId => {
    const show = allowed.includes(sectionId) && SITE.sections[sectionId];
    $(sectionId).hidden = !show;
  });
}

tabsEl.addEventListener('click', event => {
  const button = event.target.closest('.tab');
  if (button) showTab(button.dataset.id);
});

showTab(SITE.defaultTab);

/* ----------------------------- 6. NOTIFIKASI ----------------------------- */
function toast(message) {
  const el = $('toast');
  el.textContent = message;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2000);
}

/* ------------------------ 7. FORM PESAN WHATSAPP ------------------------ */
$('oSend').onclick = () => {
  const name = $('oName').value.trim();
  if (!name) {
    toast('Isi nama dulu ya');
    $('oName').focus();
    return;
  }
  const message = `Halo ${SITE.brand}, saya ${name}. Saya mau pesan: ${$('oService').value}. ${$('oNote').value.trim()}`;
  window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
};

/* ------------------------------ 8. SALIN LINK ------------------------------ */
$('shareBtn').onclick = async () => {
  try {
    await navigator.clipboard.writeText(location.href);
    toast('Link disalin');
  } catch {
    toast('Salin manual dari address bar');
  }
};

/* ------------------------- 9. MODE TERANG / GELAP ------------------------- */
const themeBtn = $('themeBtn');

function setTheme(theme) {
  root.dataset.theme = theme;
  themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
  try { localStorage.setItem('theme', theme); } catch {}
}

let savedTheme;
try { savedTheme = localStorage.getItem('theme'); } catch {}
const deviceIsDark = matchMedia('(prefers-color-scheme: dark)').matches;

setTheme(savedTheme || (deviceIsDark ? 'dark' : 'light'));
themeBtn.onclick = () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');

$('socials').innerHTML = SITE.links
  .filter(link => link.group === 'sosmed')
  .map(link => {
    // Deteksi: kalau icon berakhiran .png/.jpg/.svg → anggap gambar
    const isImage = /\.(png|jpe?g|webp|svg|gif)$/i.test(link.icon);
    const iconHtml = isImage
      ? `<img src="${esc(link.icon)}" alt="${esc(link.label)}">`
      : link.icon;

    return `
      <li>
        <a href="${esc(link.url)}" target="_blank" rel="noopener"
           aria-label="${esc(link.label)}" title="${esc(link.label)}">
          ${iconHtml}
        </a>
      </li>`;
  })
  .join('');