/* =============================================
   IS AUTO — Telegram Mini App v3
   Всі покращення: галерея, skeleton, haptic,
   autocomplete, pull-to-refresh, MainButton,
   share, views, recently viewed, cache
   ============================================= */

// ── TELEGRAM ─────────────────────────────────
const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
  try { tg.setHeaderColor('#000000'); } catch(e) {}
  try { tg.setBackgroundColor('#000000'); } catch(e) {}
}

// ── HAPTIC ────────────────────────────────────
const haptic = {
  light:   () => { try { tg?.HapticFeedback?.impactOccurred('light');   } catch(e){} },
  medium:  () => { try { tg?.HapticFeedback?.impactOccurred('medium');  } catch(e){} },
  success: () => { try { tg?.HapticFeedback?.notificationOccurred('success'); } catch(e){} },
  error:   () => { try { tg?.HapticFeedback?.notificationOccurred('error');   } catch(e){} },
  select:  () => { try { tg?.HapticFeedback?.selectionChanged();               } catch(e){} },
};

// ── CONSTANTS ─────────────────────────────────
const MANAGER  = 'isauto1';
const CHANNEL  = 'isAuto99';
const PHONE_1  = '+380635744243';
const CACHE_TTL = 5 * 60 * 1000; // 5 min

// ── DATA ──────────────────────────────────────
const cars = [
  {
    id: 1, brand:'BMW', model:'X5 40i', name:'BMW X5 40i',
    year:2020, mileage:79000, mileageText:'79 000 км',
    price:45900, priceText:'$45 900',
    engine:'3.0 бензин', drive:'Задній привід', fuel:'Бензин',
    transmission:'Автомат', power:'340 к.с.', body:'Позашляховик',
    color:'Чорний', city:'Одеса', vin:'WBAJB9C50KB375412',
    owners:'1 власник', customs:'Розмитнений', condition:'Рестайлінг в оригіналі',
    status:'В наявності', canTrade:true, rating:5,
    seller:'@isauto1', phone:null, views: 1842,
    equipment:['Пневмопідвіска','Оригінальний рестайлінг','Оригінальні фари','Рестайлінговий салон','Камери 360°','Безключовий доступ','Ambient підсвітка'],
    description:'BMW X5 40i 2020 року з пневмопідвіскою та заднім приводом. Зроблений рестайлінг виключно в оригіналі: встановлено оригінальні фари, ліхтарі та бампери. Власник готовий вислухати пропозиції торгу.',
    images:['https://pngimg.com/uploads/bmw/bmw_PNG99558.png','https://pngimg.com/uploads/bmw/bmw_PNG99558.png','https://pngimg.com/uploads/bmw/bmw_PNG99558.png']
  },
  {
    id: 2, brand:'BMW', model:'M340i', name:'BMW M340i',
    year:2021, mileage:45000, mileageText:'45 000 км',
    price:35900, priceText:'$35 900',
    engine:'3.0 бензин', drive:'Задній привід', fuel:'Бензин',
    transmission:'Автомат', power:'374 к.с.', body:'Седан',
    color:'Чорний сапфір', city:'Одеса', vin:'WBA5R1C07LFH12345',
    owners:'1 власник', customs:'Розмитнений', condition:'Ідеальний стан',
    status:'В наявності', canTrade:false, rating:5,
    seller:'@isauto1', phone:null, views: 1234,
    equipment:['Адаптивна оптика','Камери 360°','Безключовий доступ','Сліпі зони',"Пам'ять сидінь",'Harman Kardon','Ambient підсвітка','Проєкційний дисплей'],
    description:'BMW M340i 2021 року у відмінному стані. Адаптивна оптика, камери 360, безключовий доступ, сліпі зони, пам\'ять сидінь, преміальна акустична система Harman Kardon.',
    images:['https://pngimg.com/uploads/bmw/bmw_PNG99558.png','https://pngimg.com/uploads/bmw/bmw_PNG99558.png']
  },
  {
    id: 3, brand:'BMW', model:'X6 40i', name:'BMW X6 40i',
    year:2023, mileage:48000, mileageText:'48 000 км',
    price:99900, priceText:'$99 900',
    engine:'3.0 бензин', drive:'Повний привід', fuel:'Бензин',
    transmission:'Автомат', power:'340 к.с.', body:'Купе-позашляховик',
    color:'Чорний', city:'Одеса', vin:'5UX33EX08R9S29248',
    owners:'1 власник', customs:'Розмитнений', condition:'Ідеальний стан',
    status:'В наявності', canTrade:true, rating:5,
    seller:'@ssmear', phone:'0957655944', views: 3841,
    equipment:['LED оптика','Сліпі зони','Безключовий доступ','Дотяжки дверей','Камери 360°','Harman Kardon','Проєкція','Пневмопідвіска','Sky Lounge','Панорама','4-зонний клімат','Вентиляція сидінь','CarPlay'],
    description:'BMW X6 40i 2023 року. LED оптика, сліпі зони, безключовий доступ, дотяжки дверей, камери 360, розширене оздоблення шкірою, преміальна акустика Harman Kardon. Можливий обмін.',
    images:['https://pngimg.com/uploads/bmw/bmw_PNG99558.png','https://pngimg.com/uploads/bmw/bmw_PNG99558.png','https://pngimg.com/uploads/bmw/bmw_PNG99558.png']
  },
  {
    id: 4, brand:'Mercedes', model:'E220d AMG', name:'Mercedes E220d AMG',
    year:2020, mileage:111000, mileageText:'111 000 км',
    price:38000, priceText:'$38 000',
    engine:'2.0 дизель', drive:'Повний привід', fuel:'Дизель',
    transmission:'Автомат', power:'194 к.с.', body:'Седан',
    color:'Чорний', city:'Одеса', vin:'WDD2130421A123456',
    owners:'1 власник', customs:'Розмитнений', condition:'Оригінальний пробіг',
    status:'В наявності', canTrade:false, rating:4,
    seller:'@isauto1', phone:null, views: 987,
    equipment:['AMG Line','AMG Style обвіс','Пневмопідвіска','4MATIC','Адаптивна оптика','Безключовий доступ'],
    description:'Mercedes-Benz E220d 4Matic AMG Line 2020 року. Автомобіль у хорошому технічному та візуальному стані, оригінальний пробіг. Двигун працює рівно, коробка перемикає плавно.',
    images:['https://pngimg.com/uploads/mercedes/mercedes_PNG80135.png','https://pngimg.com/uploads/mercedes/mercedes_PNG80135.png']
  },
  {
    id: 5, brand:'Audi', model:'RS5', name:'Audi RS5',
    year:2021, mileage:70000, mileageText:'70 000 км',
    price:63000, priceText:'$63 000',
    engine:'2.9 бензин', drive:'Повний привід', fuel:'Бензин',
    transmission:'Автомат', power:'450 к.с.', body:'Купе',
    color:'Чорний', city:'Дніпро', vin:'WUAZZZF51MA903989',
    owners:'1 власник', customs:'Розмитнений', condition:'Пригнаний з Німеччини',
    status:'В наявності', canTrade:false, rating:5,
    seller:'@Valentyn777', phone:'0987564983', views: 2156,
    equipment:['Безключовий доступ','Камери 360°','3-зонний клімат','Підігрів усіх сидінь','Вентиляція сидінь','Люк','Matrix фари з RS-анімацією','Ambient підсвітка','Бездротовий CarPlay','RS1/RS2 режими','Активний вихлоп','Bang & Olufsen','Бронеплівка'],
    description:'Audi RS5 2021 року, пригнаний з Німеччини. Власне авто, придбане у липні 2025 року. Заміна мастила в коробці, моторне мастило кожні 5 тис. км, ходова обслужена. Передня частина та фари в бронеплівці.',
    images:['https://pngimg.com/uploads/audi/audi_PNG1736.png','https://pngimg.com/uploads/audi/audi_PNG1736.png']
  },
  {
    id: 6, brand:'Audi', model:'Q7 Premium+', name:'Audi Q7 Premium+',
    year:2019, mileage:132000, mileageText:'132 000 км',
    price:28000, priceText:'$28 000',
    engine:'3.0 бензин', drive:'Повний привід', fuel:'Бензин',
    transmission:'Tiptronic', power:'333 к.с.', body:'Позашляховик',
    color:'Чорний', city:'Одеса', vin:'WAUZZZ4M5KD012345',
    owners:'1 власник', customs:'Розмитнений', condition:'Не битий, не фарбований',
    status:'В наявності', canTrade:true, rating:4,
    seller:'@isauto1', phone:null, views: 1567,
    equipment:['Адаптивна LED-оптика','Камери 360°','Доводчики дверей','Сліпі зони','Безключовий доступ','Преміальна акустика','3 ряди сидінь','Пневмопідвіска'],
    description:'Audi Q7 Premium+ 2019 року у дуже гарному стані. Автомобіль не битий та не фарбований, приїхав цілим з аукціону Manheim. Повністю обслужений, є документація.',
    images:['https://pngimg.com/uploads/audi/audi_PNG1736.png','https://pngimg.com/uploads/audi/audi_PNG1736.png']
  },
  {
    id: 7, brand:'Audi', model:'Q5 Premium Plus', name:'Audi Q5 Premium Plus',
    year:2020, mileage:177000, mileageText:'177 000 км',
    price:25800, priceText:'$25 800',
    engine:'2.0 бензин', drive:'Повний привід', fuel:'Бензин',
    transmission:'Автомат', power:'261 к.с.', body:'Позашляховик',
    color:'Білий', city:'Одеса', vin:'WA1BNAFY5L2054321',
    owners:'1 власник', customs:'Розмитнений', condition:'Власний автомобіль',
    status:'В наявності', canTrade:false, rating:4,
    seller:'@isauto1', phone:null, views: 743,
    equipment:['Bang & Olufsen','CarPlay','Quattro Ultra','АКПП','Модельний 2021 рік'],
    description:'Audi Q5 Premium Plus 2020 року. Власний автомобіль у відмінному технічному та візуальному стані. Модельний 2021 рік. Комплектація: музика Bang & Olufsen, CarPlay, повний привід Quattro Ultra.',
    images:['https://pngimg.com/uploads/audi/audi_PNG1736.png']
  },
  {
    id: 8, brand:'Porsche', model:'Cayenne', name:'Porsche Cayenne',
    year:2022, mileage:38000, mileageText:'38 000 км',
    price:89000, priceText:'$89 000',
    engine:'3.0 бензин', drive:'Повний привід', fuel:'Бензин',
    transmission:'PDK / Автомат', power:'353 к.с.', body:'Позашляховик',
    color:'Чорний', city:'Одеса', vin:'WP1ZZZ9YZNLA12345',
    owners:'1 власник', customs:'Розмитнений', condition:'Ідеальний стан',
    status:'В наявності', canTrade:false, rating:5,
    seller:'@isauto1', phone:null, views: 2890,
    equipment:['Sport Chrono','Пневмопідвіска','BOSE','21" диски','Адаптивний круїз','Панорамний дах','Камери 360°','Ambient підсвітка'],
    description:'Porsche Cayenne 2022 року у свіжому стані. Спортивний характер, преміальний салон та яскрава динаміка. Повна комплектація з пневмопідвіскою та Sport Chrono пакетом.',
    images:['https://pngimg.com/uploads/porsche/porsche_PNG10622.png','https://pngimg.com/uploads/porsche/porsche_PNG10622.png']
  }
];

const soldCars = [
  { id:101, name:'Audi Q7 Prestige', year:2018, city:'Одеса', image:'https://pngimg.com/uploads/audi/audi_PNG1736.png' },
  { id:102, name:'BMW X5 35i', year:2014, city:'Київ', image:'https://pngimg.com/uploads/bmw/bmw_PNG99558.png' },
  { id:103, name:'Mercedes GLE', year:2021, city:'Одеса', image:'https://pngimg.com/uploads/mercedes/mercedes_PNG80135.png' }
];

// Autocomplete suggestions
const SEARCH_SUGGESTIONS = [
  'BMW X5','BMW X6','BMW M340i','BMW X3',
  'Mercedes E220d','Mercedes GLE','Mercedes C43',
  'Audi Q7','Audi Q5','Audi RS5','Audi A5',
  'Porsche Cayenne','Porsche Macan'
];

// ── STATE ─────────────────────────────────────
const state = {
  screen: 'home',
  history: [],
  heroIndex: 0,
  heroTimer: null,
  galleryIndex: 0,
  galleryTouchStartX: 0,
  selectedCarId: cars[0].id,
  activeBrand: 'all',
  viewMode: 'grid',    // 'grid' | 'list'
  favorites: [],
  recentlyViewed: [],
  filters: { brand:'all', priceMin:null, priceMax:null, yearMin:null, yearMax:null, mileage:null, fuel:'all', sort:'new' },
  viewCounts: {},      // carId -> local view count increment
};

// ── DOM ───────────────────────────────────────
const $ = id => document.getElementById(id);
const $$ = s => document.querySelectorAll(s);
const splashEl     = $('splash');
const backBtn      = $('back-btn');
const themeBtnEl   = $('theme-btn');
const shareBtnEl   = $('share-btn');
const successModal = $('success-modal');
const toastEl      = $('toast');

// ── UTILS ─────────────────────────────────────
function debounce(fn, ms) { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; }

function showToast(msg, duration = 2200) {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  setTimeout(() => toastEl.classList.remove('show'), duration);
}

function formatViews(n) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace('.0','') + 'K';
  return String(n);
}

// ── CACHE ─────────────────────────────────────
function cacheSet(key, data) {
  try { localStorage.setItem(key, JSON.stringify({ ts: Date.now(), data })); } catch(e) {}
}
function cacheGet(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const { ts, data } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) { localStorage.removeItem(key); return null; }
    return data;
  } catch(e) { return null; }
}

// ── THEME ─────────────────────────────────────
function initTheme() {
  const saved = localStorage.getItem('isauto_theme');
  const dark = saved !== null ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (dark) document.body.classList.add('dark');
}
function toggleTheme() {
  const dark = document.body.classList.toggle('dark');
  localStorage.setItem('isauto_theme', dark ? 'dark' : 'light');
  haptic.select();
}

// ── SPLASH ────────────────────────────────────
function initSplash() {
  setTimeout(() => {
    splashEl.classList.add('hidden');
    setTimeout(() => splashEl.remove(), 600);
  }, 1500);
}

// ── NAVIGATION ───────────────────────────────
const NAV_ORDER = ['home','catalog','details','favorites','filters','sell','search-car','buyout','profile'];

function navigate(screenName, pushHistory = true) {
  if (state.screen === screenName) return;
  haptic.select();

  const fromIdx = NAV_ORDER.indexOf(state.screen);
  const toIdx   = NAV_ORDER.indexOf(screenName);
  const dir     = toIdx >= fromIdx ? 'right' : 'left';

  if (pushHistory) state.history.push(state.screen);
  state.screen = screenName;

  $$('.screen').forEach(s => s.classList.remove('active','slide-in-right','slide-in-left'));
  const target = document.querySelector(`[data-screen="${screenName}"]`);
  if (target) {
    target.classList.add('active', dir === 'right' ? 'slide-in-right' : 'slide-in-left');
  }

  const showBack = state.history.length > 0 && screenName !== 'home';
  backBtn.classList.toggle('visible', showBack);

  // Share button — show only on details
  if (shareBtnEl) shareBtnEl.style.display = screenName === 'details' ? 'flex' : 'none';

  $$('.tg-nav-item[data-nav]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.nav === screenName);
  });

  if (sideMenu) sideMenu.classList.remove('active');
  window.scrollTo({ top:0, behavior:'instant' });
  renderScreen(screenName);

  // Telegram MainButton
  updateMainButton(screenName);
}

function goBack() {
  if (state.history.length === 0) { navigate('home', false); return; }
  const prev = state.history.pop();
  navigate(prev, false);
}

// ── TELEGRAM MAIN BUTTON ─────────────────────
function updateMainButton(screen) {
  if (!tg?.MainButton) return;
  if (screen === 'details') {
    tg.MainButton.setText('Написати менеджеру');
    tg.MainButton.color = '#e8192c';
    tg.MainButton.show();
    tg.MainButton.onClick(() => contactAboutCar());
  } else if (['sell','search-car','buyout'].includes(screen)) {
    tg.MainButton.hide();
  } else {
    tg.MainButton.hide();
  }
}

// ── RENDER DISPATCHER ────────────────────────
function renderScreen(name) {
  switch(name) {
    case 'home':       renderHome();       break;
    case 'catalog':    renderCatalog();    break;
    case 'details':    renderDetails();    break;
    case 'favorites':  renderFavorites();  break;
    case 'filters':    renderFilters();    break;
    case 'profile':    renderProfile();    break;
  }
}

// ── HOME ──────────────────────────────────────
function renderHome() {
  renderHeroSlider();
  renderPopularCars();
  renderSoldCars();
  renderRecentlyViewed();
  startHeroAutoplay();
}

function renderHeroSlider() {
  const slidesEl = $('hero-slides');
  const dotsEl   = $('hero-dots');
  if (!slidesEl || !dotsEl) return;
  slidesEl.innerHTML = '';
  dotsEl.innerHTML   = '';
  const heroList = cars.slice(0, 4);
  heroList.forEach((car, i) => {
    const slide = document.createElement('div');
    slide.className = 'hero-slide' + (i === state.heroIndex ? ' active' : '');
    slide.innerHTML = `<img src="${car.images[0]}" alt="${car.name}" loading="${i===0?'eager':'lazy'}" /><div class="hero-gradient"></div>`;
    slidesEl.appendChild(slide);
    const dot = document.createElement('button');
    dot.className = 'hero-dot' + (i === state.heroIndex ? ' active' : '');
    dot.addEventListener('click', () => { state.heroIndex = i; updateHeroSlide(); restartHeroAutoplay(); haptic.light(); });
    dotsEl.appendChild(dot);
  });
  updateHeroInfo();
}

function updateHeroSlide() {
  const slidesEl = $('hero-slides');
  if (slidesEl) slidesEl.style.transform = `translateX(-${state.heroIndex * 100}%)`;
  $$('.hero-slide').forEach((s,i) => s.classList.toggle('active', i === state.heroIndex));
  $$('.hero-dot').forEach((d,i) => d.classList.toggle('active', i === state.heroIndex));
  updateHeroInfo();
}

function updateHeroInfo() {
  const car = cars[state.heroIndex];
  if (!car) return;
  const t = $('hero-title'), m = $('hero-meta'), p = $('hero-price'), b = $('hero-badge');
  if (t) t.textContent = car.name;
  if (m) m.textContent = `${car.year} · ${car.mileageText}`;
  if (p) p.textContent = car.priceText;
  if (b) b.textContent = car.status;
  const fb = $('hero-fav-btn');
  if (fb) {
    const isFav = state.favorites.includes(car.id);
    fb.classList.toggle('active', isFav);
    const svg = fb.querySelector('svg');
    if (svg) svg.setAttribute('fill', isFav ? 'currentColor' : 'none');
  }
}

function startHeroAutoplay() {
  if (state.heroTimer) clearInterval(state.heroTimer);
  state.heroTimer = setInterval(() => {
    state.heroIndex = (state.heroIndex + 1) % Math.min(cars.length, 4);
    updateHeroSlide();
  }, 4500);
}
function restartHeroAutoplay() { clearInterval(state.heroTimer); startHeroAutoplay(); }

function renderPopularCars() {
  const c = $('popular-cars');
  if (!c) return;
  c.innerHTML = '';
  cars.slice(0, 6).forEach(car => {
    const d = document.createElement('div');
    d.className = 'car-scroll-card';
    d.innerHTML = `<div class="car-scroll-img"><img src="${car.images[0]}" alt="${car.name}" loading="lazy"/></div><div class="car-scroll-info"><div class="car-scroll-name">${car.name}</div><div class="car-scroll-meta">${car.year} · ${car.mileageText}</div><div class="car-scroll-price">${car.priceText}</div></div>`;
    d.addEventListener('click', () => openCarDetails(car.id));
    c.appendChild(d);
  });
}

function renderSoldCars() {
  const c = $('sold-list');
  if (!c) return;
  c.innerHTML = '';
  soldCars.forEach(car => {
    const d = document.createElement('div');
    d.className = 'sold-card';
    d.innerHTML = `<div class="sold-img"><img src="${car.image}" alt="${car.name}" loading="lazy"/></div><div class="sold-info"><div class="sold-name">${car.name}</div><div class="sold-meta">${car.year} · ${car.city}</div></div><span class="sold-badge">Продано ✓</span>`;
    c.appendChild(d);
  });
}

function renderRecentlyViewed() {
  const section = $('recently-viewed-section');
  const c = $('recent-cars');
  if (!section || !c) return;
  const recentCars = state.recentlyViewed.map(id => cars.find(car => car.id === id)).filter(Boolean);
  if (recentCars.length === 0) { section.style.display = 'none'; return; }
  section.style.display = '';
  c.innerHTML = '';
  recentCars.forEach(car => {
    const d = document.createElement('div');
    d.className = 'car-scroll-card';
    d.innerHTML = `<div class="car-scroll-img"><img src="${car.images[0]}" alt="${car.name}" loading="lazy"/></div><div class="car-scroll-info"><div class="car-scroll-name">${car.name}</div><div class="car-scroll-meta">${car.year} · ${car.mileageText}</div><div class="car-scroll-price">${car.priceText}</div></div>`;
    d.addEventListener('click', () => openCarDetails(car.id));
    c.appendChild(d);
  });
}

// ── CATALOG ───────────────────────────────────
function renderCatalog(withSkeleton = false) {
  const grid  = $('catalog-grid');
  const empty = $('catalog-empty');
  const count = $('catalog-count');
  if (!grid) return;

  if (withSkeleton) {
    renderSkeletons(grid, 9);
    return;
  }

  const filtered = getFilteredCars();
  if (count) count.textContent = filtered.length > 0 ? `Знайдено ${filtered.length} авто` : 'Актуальні оголошення';

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (empty) empty.style.display = 'flex';
    return;
  }
  if (empty) empty.style.display = 'none';
  grid.innerHTML = '';
  grid.className = `catalog-grid${state.viewMode === 'list' ? ' list-view' : ''}`;
  filtered.forEach((car, i) => {
    const card = createCarCard(car);
    card.style.animationDelay = `${i * 0.04}s`;
    grid.appendChild(card);
  });
}

function renderSkeletons(container, count) {
  container.innerHTML = '';
  container.className = `catalog-grid${state.viewMode === 'list' ? ' list-view' : ''}`;
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'skeleton-card';
    s.innerHTML = `<div class="skeleton skeleton-img"></div><div class="skeleton-body"><div class="skeleton skeleton-line w-2-3"></div><div class="skeleton skeleton-line w-full"></div><div class="skeleton skeleton-line w-1-2"></div></div>`;
    container.appendChild(s);
  }
}

function createCarCard(car) {
  const isFav = state.favorites.includes(car.id);
  const views = car.views + (state.viewCounts[car.id] || 0);
  const a = document.createElement('article');
  a.className = 'car-card';
  a.setAttribute('role','button');
  a.setAttribute('tabindex','0');
  a.dataset.carId = car.id;

  a.innerHTML = `
    <div class="car-card-img">
      <img src="${car.images[0]}" alt="${car.name}" loading="lazy"/>
      <span class="car-card-status${car.status==='Продано'?' sold':''}">${car.status}</span>
      <button class="car-card-fav${isFav?' active':''}" data-fav="${car.id}" aria-label="Обране">
        <svg viewBox="0 0 24 24" fill="${isFav?'currentColor':'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </button>
    </div>
    <div class="car-card-body">
      <div class="car-card-price">${car.priceText}${car.canTrade?'<span class="car-card-trade">Торг</span>':''}</div>
      <div class="car-card-name">${car.name}</div>
      <div class="car-card-meta">${car.year} · ${car.mileageText} · ${car.city}</div>
      <div class="car-card-specs">
        <span class="car-spec-tag">${car.engine}</span>
        <span class="car-spec-tag">${car.transmission}</span>
        <span class="car-spec-tag">${car.drive}</span>
      </div>
      <div class="car-card-vin">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/></svg>
        VIN перевірено
      </div>
      <div class="car-card-views">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        ${formatViews(views)} переглядів
      </div>
    </div>
  `;

  const favBtn = a.querySelector('.car-card-fav');
  if (favBtn) {
    favBtn.addEventListener('click', e => {
      e.stopPropagation();
      toggleFavorite(car.id);
      haptic.medium();
      const now = state.favorites.includes(car.id);
      favBtn.classList.toggle('active', now);
      const svg = favBtn.querySelector('svg');
      if (svg) svg.setAttribute('fill', now ? 'currentColor' : 'none');
    });
  }

  const open = () => openCarDetails(car.id);
  a.addEventListener('click', open);
  a.addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' ') { e.preventDefault(); open(); }});
  return a;
}

function openCarDetails(carId) {
  state.selectedCarId = carId;
  // Track view
  state.viewCounts[carId] = (state.viewCounts[carId] || 0) + 1;
  // Recently viewed
  state.recentlyViewed = [carId, ...state.recentlyViewed.filter(id => id !== carId)].slice(0, 10);
  saveRecentlyViewed();
  navigate('details');
}

// ── DETAILS ───────────────────────────────────
function renderDetails() {
  const car = cars.find(c => c.id === state.selectedCarId);
  if (!car) return;
  const isFav = state.favorites.includes(car.id);
  const views = car.views + (state.viewCounts[car.id] || 0);

  // Gallery
  renderGallery(car);

  // Status
  const sb = $('details-status-badge');
  if (sb) sb.textContent = car.status;

  // Views
  const vb = $('details-views-count');
  if (vb) vb.textContent = formatViews(views);

  // Fav
  const fb = $('details-fav-btn');
  if (fb) {
    fb.classList.toggle('active', isFav);
    const svg = fb.querySelector('svg');
    if (svg) svg.setAttribute('fill', isFav ? 'currentColor' : 'none');
  }

  // Head
  const t = $('details-title'), m = $('details-meta'), p = $('details-price');
  if (t) t.textContent = car.name;
  if (m) m.textContent = `${car.year} · ${car.mileageText} · ${car.city}`;
  if (p) p.textContent = car.priceText;

  // Trade badge
  const tb = $('details-trade-badge');
  if (tb) tb.style.display = car.canTrade ? 'block' : 'none';

  // Quick specs
  const qy = $('dq-year'), qm = $('dq-mileage'), qe = $('dq-engine'), qd = $('dq-drive');
  if (qy) qy.textContent = car.year;
  if (qm) qm.textContent = car.mileageText;
  if (qe) qe.textContent = car.engine;
  if (qd) qd.textContent = car.drive;

  // Spec table
  const st = $('details-spec-table');
  if (st) {
    const rows = [
      ['Марка', car.brand], ['Модель', car.model], ['Рік', car.year],
      ['Пробіг', car.mileageText], ['Двигун', car.engine], ['Паливо', car.fuel],
      ['Коробка', car.transmission], ['Привід', car.drive], ['Потужність', car.power],
      ['Кузов', car.body], ['Колір', car.color], ['Місто', car.city],
      ['Власники', car.owners], ['Розмитнення', car.customs], ['Стан', car.condition]
    ].filter(([,v]) => v);
    st.innerHTML = rows.map(([l,v]) => `<div class="spec-row"><span>${l}</span><strong>${v}</strong></div>`).join('');
  }

  // Equipment
  const eq = $('details-equip'), eqs = $('details-equip-section');
  if (eq && car.equipment?.length > 0) {
    eq.innerHTML = car.equipment.map(i => `<span class="equip-tag">${i}</span>`).join('');
    if (eqs) eqs.style.display = '';
  } else if (eqs) eqs.style.display = 'none';

  // Description
  const desc = $('details-desc');
  if (desc) desc.textContent = car.description || '—';

  // VIN
  const vr = $('details-vin-row'), ve = $('details-vin');
  if (vr) { vr.style.display = car.vin ? 'flex' : 'none'; if (ve) ve.textContent = car.vin || '—'; }

  // Contact
  const cr = $('details-contact-row');
  if (cr) {
    let html = '';
    if (car.seller) html += `<div class="contact-item"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.787 23.213l4.179-1.497A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm5.894 16.54c-.246.69-1.22 1.26-1.99 1.426-.53.113-1.22.203-3.55-.762-2.98-1.23-4.9-4.26-5.05-4.46-.146-.2-1.22-1.626-1.22-3.1 0-1.474.77-2.196 1.044-2.498.246-.27.536-.338.714-.338l.514.01c.165.007.386-.063.603.46.246.59.836 2.044.91 2.19.073.148.12.32.024.514-.09.196-.135.317-.27.49-.135.17-.285.38-.406.51-.136.135-.277.28-.12.548.158.27.7 1.154 1.503 1.87 1.033.92 1.904 1.205 2.174 1.34.27.135.427.112.585-.067.16-.18.68-.794.862-1.066.18-.27.36-.225.607-.135.247.09 1.57.74 1.84.875.27.135.45.202.516.314.065.112.065.65-.18 1.34z"/></svg>${car.seller}</div>`;
    if (car.phone) html += `<div class="contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.6 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>${car.phone}</div>`;
    cr.innerHTML = html;
  }

  // Call button
  const callBtn = $('details-call-btn');
  if (callBtn) {
    if (car.phone) {
      callBtn.style.display = 'flex';
      callBtn.onclick = () => { haptic.medium(); window.location.href = `tel:${car.phone}`; };
    } else {
      callBtn.style.display = 'none';
    }
  }

  // Similar cars
  renderSimilarCars(car);
}

// ── GALLERY ───────────────────────────────────
function renderGallery(car) {
  const slidesEl = $('gallery-slides');
  const dotsEl   = $('gallery-dots');
  const counter  = $('gallery-counter');
  if (!slidesEl) return;

  state.galleryIndex = 0;
  slidesEl.innerHTML = '';
  if (dotsEl) dotsEl.innerHTML = '';

  const imgs = car.images || [car.images?.[0] || ''];
  imgs.forEach((src, i) => {
    const slide = document.createElement('div');
    slide.className = 'gallery-slide';
    slide.innerHTML = `<img src="${src}" alt="${car.name} фото ${i+1}" loading="${i===0?'eager':'lazy'}"/>`;
    slidesEl.appendChild(slide);
    if (dotsEl && imgs.length > 1) {
      const dot = document.createElement('button');
      dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => { state.galleryIndex = i; updateGallery(); haptic.light(); });
      dotsEl.appendChild(dot);
    }
  });

  if (counter) counter.textContent = `1 / ${imgs.length}`;
  if (imgs.length <= 1 && dotsEl) dotsEl.style.display = 'none';

  // Touch swipe
  const gallery = $('details-gallery');
  if (gallery) {
    gallery.addEventListener('touchstart', e => { state.galleryTouchStartX = e.touches[0].clientX; }, { passive:true });
    gallery.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - state.galleryTouchStartX;
      if (Math.abs(dx) > 40) {
        const car2 = cars.find(c => c.id === state.selectedCarId);
        const max = (car2?.images?.length || 1) - 1;
        if (dx < 0 && state.galleryIndex < max) { state.galleryIndex++; updateGallery(); haptic.light(); }
        if (dx > 0 && state.galleryIndex > 0)   { state.galleryIndex--; updateGallery(); haptic.light(); }
      }
    }, { passive:true });
  }
}

function updateGallery() {
  const slidesEl = $('gallery-slides');
  if (slidesEl) slidesEl.style.transform = `translateX(-${state.galleryIndex * 100}%)`;
  $$('.gallery-dot').forEach((d,i) => d.classList.toggle('active', i === state.galleryIndex));
  const car = cars.find(c => c.id === state.selectedCarId);
  const counter = $('gallery-counter');
  if (counter && car) counter.textContent = `${state.galleryIndex + 1} / ${car.images.length}`;
}

// ── SIMILAR CARS ──────────────────────────────
function renderSimilarCars(car) {
  const c = $('similar-cars');
  const s = $('similar-section');
  if (!c) return;
  const similar = cars.filter(x => x.id !== car.id && x.brand === car.brand).slice(0, 4);
  if (similar.length === 0) { if (s) s.style.display = 'none'; return; }
  if (s) s.style.display = '';
  c.innerHTML = '';
  similar.forEach(sc => {
    const d = document.createElement('div');
    d.className = 'car-scroll-card';
    d.innerHTML = `<div class="car-scroll-img"><img src="${sc.images[0]}" alt="${sc.name}" loading="lazy"/></div><div class="car-scroll-info"><div class="car-scroll-name">${sc.name}</div><div class="car-scroll-meta">${sc.year} · ${sc.mileageText}</div><div class="car-scroll-price">${sc.priceText}</div></div>`;
    d.addEventListener('click', () => openCarDetails(sc.id));
    c.appendChild(d);
  });
}

// ── FAVORITES ─────────────────────────────────
function toggleFavorite(carId) {
  const idx = state.favorites.indexOf(carId);
  if (idx > -1) { state.favorites.splice(idx, 1); showToast('Видалено з обраного'); }
  else          { state.favorites.push(carId);    showToast('Додано в обране ♥'); haptic.success(); }
  saveFavorites();
  updateFavBadge();
  if (state.screen === 'details' && state.selectedCarId === carId) {
    const fb = $('details-fav-btn');
    if (fb) {
      const isFav = state.favorites.includes(carId);
      fb.classList.toggle('active', isFav);
      const svg = fb.querySelector('svg');
      if (svg) svg.setAttribute('fill', isFav ? 'currentColor' : 'none');
    }
  }
}

function saveFavorites() { try { localStorage.setItem('isauto_favorites', JSON.stringify(state.favorites)); } catch(e){} }
function loadFavorites() { try { state.favorites = JSON.parse(localStorage.getItem('isauto_favorites')) || []; } catch(e){ state.favorites=[]; } }
function saveRecentlyViewed() { try { localStorage.setItem('isauto_recent', JSON.stringify(state.recentlyViewed)); } catch(e){} }
function loadRecentlyViewed() { try { state.recentlyViewed = JSON.parse(localStorage.getItem('isauto_recent')) || []; } catch(e){ state.recentlyViewed=[]; } }

function updateFavBadge() {
  const n = state.favorites.length;
  const b = $('fav-badge');
  if (b) { b.textContent = n; b.style.display = n > 0 ? 'flex' : 'none'; }
  const pc = $('pmenu-fav-count');
  if (pc) pc.textContent = n;
}

function renderFavorites() {
  const favCars = cars.filter(c => state.favorites.includes(c.id));
  const grid = $('favorites-grid'), empty = $('favorites-empty');
  if (!grid) return;
  if (favCars.length === 0) { grid.innerHTML=''; if (empty) empty.style.display='flex'; return; }
  if (empty) empty.style.display = 'none';
  grid.innerHTML = '';
  grid.className = `catalog-grid${state.viewMode === 'list' ? ' list-view' : ''}`;
  favCars.forEach((car,i) => { const c = createCarCard(car); c.style.animationDelay=`${i*.05}s`; grid.appendChild(c); });
}

// ── FILTERS ───────────────────────────────────
function renderFilters() {
  const f = state.filters;
  const set = (id, v) => { const el=$(id); if(el) el.value=v||''; };
  set('filter-brand', f.brand);
  set('filter-price-min', f.priceMin);
  set('filter-price-max', f.priceMax);
  set('filter-year-min', f.yearMin);
  set('filter-year-max', f.yearMax);
  set('filter-mileage', f.mileage);
  set('filter-fuel', f.fuel);
}

function applyFilters(e) {
  e.preventDefault();
  haptic.medium();
  state.filters = {
    brand:    $('filter-brand')?.value    || 'all',
    priceMin: parseInt($('filter-price-min')?.value) || null,
    priceMax: parseInt($('filter-price-max')?.value) || null,
    yearMin:  parseInt($('filter-year-min')?.value)  || null,
    yearMax:  parseInt($('filter-year-max')?.value)  || null,
    mileage:  parseInt($('filter-mileage')?.value)   || null,
    fuel:     $('filter-fuel')?.value     || 'all',
    sort:     state.filters.sort
  };
  state.activeBrand = state.filters.brand;
  syncBrandChips(state.activeBrand);
  try { localStorage.setItem('isauto_filters', JSON.stringify(state.filters)); } catch(e){}
  navigate('catalog');
}

function resetFilters() {
  haptic.light();
  state.filters = { brand:'all', priceMin:null, priceMax:null, yearMin:null, yearMax:null, mileage:null, fuel:'all', sort:'new' };
  state.activeBrand = 'all';
  syncBrandChips('all');
  syncSortPills('new');
  try { localStorage.removeItem('isauto_filters'); } catch(e){}
  renderFilters();
  renderCatalog();
}

function getFilteredCars() {
  let r = [...cars];
  const searchEl = $('catalog-search');
  const q = searchEl ? searchEl.value.trim().toLowerCase() : '';
  if (q) r = r.filter(c => [c.brand,c.model,c.name,String(c.year),c.engine,c.fuel,c.city,c.body,c.transmission].join(' ').toLowerCase().includes(q));
  const bf = state.filters.brand !== 'all' ? state.filters.brand : state.activeBrand;
  if (bf !== 'all') r = r.filter(c => c.brand === bf);
  if (state.filters.priceMin) r = r.filter(c => c.price >= state.filters.priceMin);
  if (state.filters.priceMax) r = r.filter(c => c.price <= state.filters.priceMax);
  if (state.filters.yearMin)  r = r.filter(c => c.year  >= state.filters.yearMin);
  if (state.filters.yearMax)  r = r.filter(c => c.year  <= state.filters.yearMax);
  if (state.filters.mileage)  r = r.filter(c => c.mileage <= state.filters.mileage);
  if (state.filters.fuel !== 'all') r = r.filter(c => c.fuel === state.filters.fuel);
  switch(state.filters.sort) {
    case 'price-asc':   r.sort((a,b) => a.price - b.price); break;
    case 'price-desc':  r.sort((a,b) => b.price - a.price); break;
    case 'year-new':    r.sort((a,b) => b.year - a.year);   break;
    case 'mileage-low': r.sort((a,b) => a.mileage - b.mileage); break;
    default: r.sort((a,b) => b.id - a.id);
  }
  return r;
}

function syncBrandChips(brand) { $$('.chip').forEach(c => c.classList.toggle('active', c.dataset.brand === brand)); }
function syncSortPills(sort)   { $$('.sort-pill').forEach(p => p.classList.toggle('active', p.dataset.sort === sort)); }

// ── PROFILE ───────────────────────────────────
function renderProfile() {
  updateFavBadge();
  if (tg?.initDataUnsafe?.user) {
    const u = tg.initDataUnsafe.user;
    const n = $('profile-name'), un = $('profile-username'), av = $('profile-avatar');
    if (n)  n.textContent  = [u.first_name, u.last_name].filter(Boolean).join(' ') || 'Користувач';
    if (un) un.textContent = u.username ? `@${u.username}` : 'Telegram';
    if (av) {
      if (u.photo_url) av.innerHTML = `<img src="${u.photo_url}" alt="Аватар"/>`;
      else av.textContent = (u.first_name || 'U').charAt(0).toUpperCase();
    }
  }
}

// ── CONTACT / SHARE ───────────────────────────
function openTelegram(username) {
  const url = `https://t.me/${username}`;
  if (tg) tg.openTelegramLink(url);
  else window.open(url, '_blank');
}

function contactAboutCar() {
  const car = cars.find(c => c.id === state.selectedCarId);
  const msg = car ? `Цікавить авто: ${car.name} ${car.year} — ${car.priceText}` : '';
  haptic.medium();
  if (tg) tg.openTelegramLink(`https://t.me/${MANAGER}?text=${encodeURIComponent(msg)}`);
  else window.open(`https://t.me/${MANAGER}`, '_blank');
}

function shareCar() {
  const car = cars.find(c => c.id === state.selectedCarId);
  if (!car) return;
  haptic.light();
  const text = `${car.name} ${car.year}\n${car.mileageText} · ${car.engine}\n${car.priceText}${car.canTrade?' (торг)':''}\n\nIS AUTO @${CHANNEL}`;
  if (tg?.shareMessage) {
    try { tg.shareMessage(text); return; } catch(e){}
  }
  if (navigator.share) {
    navigator.share({ title: car.name, text }).catch(() => {});
  } else {
    navigator.clipboard?.writeText(text).then(() => showToast('Скопійовано!')).catch(() => showToast('Поділитися: @' + CHANNEL));
  }
}

// ── AUTOCOMPLETE ──────────────────────────────
function initAutocomplete() {
  const input = $('catalog-search');
  const dropdown = $('autocomplete-dropdown');
  if (!input || !dropdown) return;

  input.addEventListener('input', debounce(() => {
    const q = input.value.trim().toLowerCase();
    if (q.length < 1) { dropdown.classList.remove('visible'); return; }
    const matches = SEARCH_SUGGESTIONS.filter(s => s.toLowerCase().includes(q)).slice(0, 5);
    if (matches.length === 0) { dropdown.classList.remove('visible'); return; }
    dropdown.innerHTML = matches.map(s => `
      <div class="autocomplete-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <span>${s}</span>
      </div>
    `).join('');
    dropdown.classList.add('visible');
    dropdown.querySelectorAll('.autocomplete-item').forEach((item, i) => {
      item.addEventListener('click', () => {
        input.value = matches[i];
        dropdown.classList.remove('visible');
        haptic.select();
        renderCatalog();
        const clearBtn = $('catalog-search-clear');
        if (clearBtn) clearBtn.style.display = 'flex';
      });
    });
  }, 200));

  document.addEventListener('click', e => {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('visible');
    }
  });
}

// ── PULL TO REFRESH ───────────────────────────
function initPullToRefresh() {
  const pr = $('pull-refresh');
  const icon = $('pull-refresh-icon');
  if (!pr) return;

  let startY = 0, pulling = false;

  window.addEventListener('touchstart', e => {
    if (state.screen !== 'catalog') return;
    startY = e.touches[0].clientY;
  }, { passive:true });

  window.addEventListener('touchmove', e => {
    if (state.screen !== 'catalog') return;
    const dy = e.touches[0].clientY - startY;
    if (dy > 60 && window.scrollY === 0) {
      pulling = true;
      pr.classList.add('visible');
    }
  }, { passive:true });

  window.addEventListener('touchend', () => {
    if (!pulling) return;
    pulling = false;
    if (icon) icon.classList.add('spinning');
    haptic.medium();
    setTimeout(() => {
      renderCatalog();
      pr.classList.remove('visible');
      if (icon) icon.classList.remove('spinning');
      showToast('Каталог оновлено ✓');
    }, 800);
  }, { passive:true });
}

// ── SCROLL SHRINK NAV ─────────────────────────
function initScrollShrink() {
  const navWrap = $('bottom-nav');
  if (!navWrap) return;
  let timer = null, lastY = 0, shrunk = false;
  const shrink = () => { if (!shrunk) { shrunk=true; navWrap.classList.add('scrolling'); } };
  const expand = () => { if (shrunk) { shrunk=false; navWrap.classList.remove('scrolling'); } };
  window.addEventListener('scroll', () => {
    const y = window.scrollY, d = y - lastY; lastY = y;
    if (d > 2 && y > 40) shrink(); else if (d < -2) expand();
    clearTimeout(timer); timer = setTimeout(expand, 600);
  }, { passive:true });
  let ty = 0;
  window.addEventListener('touchstart', e => { ty = e.touches[0].clientY; }, { passive:true });
  window.addEventListener('touchmove', e => {
    const dy = ty - e.touches[0].clientY;
    if (dy > 8) shrink(); else if (dy < -8) expand();
    clearTimeout(timer); timer = setTimeout(expand, 600);
  }, { passive:true });
  window.addEventListener('touchend', () => { clearTimeout(timer); timer = setTimeout(expand, 400); }, { passive:true });
}

// ── FORMS ─────────────────────────────────────
function handleForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    if (tg?.sendData) { try { tg.sendData(JSON.stringify({ type:formId, ...data })); } catch(e){} }
    haptic.success();
    form.reset();
    showSuccessModal();
  });
}

function showSuccessModal() { if (successModal) successModal.classList.add('active'); }
function hideSuccessModal() { if (successModal) successModal.classList.remove('active'); }

// ── EVENTS ────────────────────────────────────
function initEvents() {
  // Back
  backBtn?.addEventListener('click', goBack);

  // Theme
  themeBtnEl?.addEventListener('click', toggleTheme);

  // Share (header)
  shareBtnEl?.addEventListener('click', shareCar);

  // Header logo
  document.querySelector('.header-logo')?.addEventListener('click', () => navigate('home'));

  // Bottom nav
  $$('.tg-nav-item[data-nav]').forEach(btn => btn.addEventListener('click', () => navigate(btn.dataset.nav)));
  $$('.tg-nav-item[data-action="contact"]').forEach(btn => btn.addEventListener('click', () => openTelegram(MANAGER)));

  // data-nav delegation
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-nav]');
    if (el && !el.closest('.tg-nav')) {
      e.preventDefault();
      if (el.dataset.brand) {
        state.activeBrand = el.dataset.brand;
        state.filters.brand = 'all';
        syncBrandChips(state.activeBrand);
      }
      navigate(el.dataset.nav);
    }
  });

  // data-action delegation
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    switch(el.dataset.action) {
      case 'contact':          openTelegram(MANAGER); break;
      case 'contact-about-car': contactAboutCar(); break;
      case 'share-car':        shareCar(); break;
      case 'reset-filters':    resetFilters(); break;
      case 'close-modal':      hideSuccessModal(); navigate('home'); break;
    }
  });

  // Hero
  $('hero-open-btn')?.addEventListener('click', () => { state.selectedCarId = cars[state.heroIndex].id; navigate('details'); });
  $('hero-fav-btn')?.addEventListener('click', () => { toggleFavorite(cars[state.heroIndex].id); updateHeroInfo(); });

  // Details fav
  $('details-fav-btn')?.addEventListener('click', () => toggleFavorite(state.selectedCarId));

  // Copy VIN
  $('copy-vin-btn')?.addEventListener('click', () => {
    const car = cars.find(c => c.id === state.selectedCarId);
    if (car?.vin) {
      navigator.clipboard?.writeText(car.vin).then(() => { haptic.success(); showToast('VIN скопійовано!'); });
    }
  });

  // Brand chips
  $$('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      haptic.select();
      syncBrandChips(chip.dataset.brand);
      state.activeBrand = chip.dataset.brand;
      state.filters.brand = 'all';
      renderCatalog();
    });
  });

  // Sort pills
  $$('.sort-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      haptic.select();
      state.filters.sort = pill.dataset.sort;
      syncSortPills(pill.dataset.sort);
      renderCatalog();
    });
  });

  // View toggle
  $('view-grid')?.addEventListener('click', () => {
    if (state.viewMode === 'grid') return;
    state.viewMode = 'grid';
    $('view-grid').classList.add('active');
    $('view-list').classList.remove('active');
    haptic.select();
    renderCatalog();
  });
  $('view-list')?.addEventListener('click', () => {
    if (state.viewMode === 'list') return;
    state.viewMode = 'list';
    $('view-list').classList.add('active');
    $('view-grid').classList.remove('active');
    haptic.select();
    renderCatalog();
  });

  // Catalog search
  const cs = $('catalog-search');
  const cc = $('catalog-search-clear');
  if (cs) {
    cs.addEventListener('input', debounce(() => {
      const has = cs.value.trim().length > 0;
      if (cc) cc.style.display = has ? 'flex' : 'none';
      renderCatalog();
    }, 150));
    cc?.addEventListener('click', () => {
      cs.value = ''; cc.style.display = 'none';
      const dd = $('autocomplete-dropdown');
      if (dd) dd.classList.remove('visible');
      haptic.light();
      renderCatalog();
    });
  }

  // Home search
  const hs = $('home-search');
  if (hs) {
    hs.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const q = hs.value.trim();
        navigate('catalog');
        const cs2 = $('catalog-search');
        if (cs2 && q) { cs2.value = q; renderCatalog(); const cc2=$('catalog-search-clear'); if(cc2) cc2.style.display='flex'; }
        hs.value = '';
      }
    });
    hs.addEventListener('input', debounce(() => {
      if (hs.value.trim().length >= 2) {
        navigate('catalog');
        const cs2 = $('catalog-search');
        if (cs2) { cs2.value = hs.value.trim(); renderCatalog(); }
        hs.value = '';
      }
    }, 600));
  }

  // Clear recently viewed
  $('clear-recent-btn')?.addEventListener('click', () => {
    state.recentlyViewed = [];
    saveRecentlyViewed();
    haptic.light();
    renderRecentlyViewed();
  });

  // Filters form
  $('filters-form')?.addEventListener('submit', applyFilters);

  // Forms
  handleForm('sell-form');
  handleForm('search-car-form');
  handleForm('buyout-form');

  // Modal overlay click
  successModal?.addEventListener('click', e => { if (e.target === successModal) hideSuccessModal(); });
}

// ── INIT ──────────────────────────────────────
function init() {
  loadFavorites();
  loadRecentlyViewed();

  try {
    const sf = localStorage.getItem('isauto_filters');
    if (sf) { state.filters = { ...state.filters, ...JSON.parse(sf) }; state.activeBrand = state.filters.brand; }
  } catch(e) {}

  initTheme();
  initSplash();
  initEvents();
  initAutocomplete();
  initPullToRefresh();
  initScrollShrink();

  // Initial screen
  state.screen = 'home';
  $$('.screen').forEach(s => s.classList.remove('active'));
  const hs = document.querySelector('[data-screen="home"]');
  if (hs) hs.classList.add('active');
  backBtn.classList.remove('visible');
  if (shareBtnEl) shareBtnEl.style.display = 'none';

  renderHome();
  updateFavBadge();
  syncSortPills(state.filters.sort || 'new');
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();

/* =============================================
   IS AUTO v3 — NEW FEATURES
   ============================================= */

// ── ADMIN CONFIG ──────────────────────────────
// Список Telegram ID адмінів (замінити на реальні)
const ADMIN_IDS = [123456789]; // tg.initDataUnsafe?.user?.id

function isAdmin() {
  const userId = tg?.initDataUnsafe?.user?.id;
  // В dev-режимі (без Telegram) — дозволяємо всім для тестування
  if (!userId) return true;
  return ADMIN_IDS.includes(userId);
}

// ── INFINITE SCROLL ───────────────────────────
const ITEMS_PER_PAGE = 9;
let infinitePage = 1;
let infiniteObserver = null;
let infiniteAllLoaded = false;

function initInfiniteScroll() {
  const sentinel = $('infinite-sentinel');
  if (!sentinel) return;

  if (infiniteObserver) infiniteObserver.disconnect();

  infiniteObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !infiniteAllLoaded && state.screen === 'catalog') {
      loadMoreCars();
    }
  }, { rootMargin: '100px' });

  infiniteObserver.observe(sentinel);
}

function loadMoreCars() {
  const filtered = getFilteredCars();
  const total = filtered.length;
  const start = infinitePage * ITEMS_PER_PAGE;

  if (start >= total) {
    infiniteAllLoaded = true;
    removeInfiniteLoader();
    return;
  }

  showInfiniteLoader();

  setTimeout(() => {
    const grid = $('catalog-grid');
    if (!grid) return;

    const slice = filtered.slice(start, start + ITEMS_PER_PAGE);
    slice.forEach((car, i) => {
      const card = createCarCard(car);
      card.style.animationDelay = `${i * 0.04}s`;
      grid.appendChild(card);
    });

    infinitePage++;
    removeInfiniteLoader();

    if (infinitePage * ITEMS_PER_PAGE >= total) {
      infiniteAllLoaded = true;
    }
  }, 600);
}

function showInfiniteLoader() {
  let loader = $('infinite-loader');
  if (!loader) {
    loader = document.createElement('div');
    loader.id = 'infinite-loader';
    loader.className = 'infinite-loader';
    loader.innerHTML = `
      <div class="infinite-loader-dots">
        <div class="infinite-loader-dot"></div>
        <div class="infinite-loader-dot"></div>
        <div class="infinite-loader-dot"></div>
      </div>
    `;
    const grid = $('catalog-grid');
    if (grid) grid.after(loader);
  }
}

function removeInfiniteLoader() {
  const loader = $('infinite-loader');
  if (loader) loader.remove();
}

// Перевизначаємо renderCatalog для підтримки infinite scroll
const _origRenderCatalog = renderCatalog;
function renderCatalogWithInfinite(withSkeleton = false) {
  infinitePage = 1;
  infiniteAllLoaded = false;
  removeInfiniteLoader();

  const grid  = $('catalog-grid');
  const empty = $('catalog-empty');
  const count = $('catalog-count');
  if (!grid) return;

  if (withSkeleton) {
    renderSkeletons(grid, ITEMS_PER_PAGE);
    return;
  }

  const filtered = getFilteredCars();
  if (count) count.textContent = filtered.length > 0 ? `Знайдено ${filtered.length} авто` : 'Актуальні оголошення';

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (empty) empty.style.display = 'flex';
    return;
  }

  if (empty) empty.style.display = 'none';
  grid.innerHTML = '';
  grid.className = `catalog-grid${state.viewMode === 'list' ? ' list-view' : ''}`;

  // Render first page
  const firstPage = filtered.slice(0, ITEMS_PER_PAGE);
  firstPage.forEach((car, i) => {
    const card = createCarCard(car);
    card.style.animationDelay = `${i * 0.04}s`;
    grid.appendChild(card);
  });

  if (filtered.length <= ITEMS_PER_PAGE) {
    infiniteAllLoaded = true;
  }
}

// ── FULLSCREEN GALLERY ────────────────────────
const fullscreenEl    = $('fullscreen-gallery');
const fullscreenSlides = $('fullscreen-slides');
const fullscreenCounter = $('fullscreen-counter');
const fullscreenDots  = $('fullscreen-dots');
const fullscreenClose = $('fullscreen-close');

let fsIndex = 0;
let fsTouchStartX = 0;

function openFullscreen(images, startIndex = 0) {
  if (!fullscreenEl || !images?.length) return;
  fsIndex = startIndex;

  // Build slides
  fullscreenSlides.innerHTML = '';
  if (fullscreenDots) fullscreenDots.innerHTML = '';

  images.forEach((src, i) => {
    const slide = document.createElement('div');
    slide.className = 'fullscreen-slide';
    slide.innerHTML = `<img src="${src}" alt="Фото ${i+1}" />`;
    fullscreenSlides.appendChild(slide);

    if (fullscreenDots && images.length > 1) {
      const dot = document.createElement('button');
      dot.className = 'hero-dot' + (i === fsIndex ? ' active' : '');
      dot.addEventListener('click', () => { fsIndex = i; updateFullscreen(images.length); haptic.light(); });
      fullscreenDots.appendChild(dot);
    }
  });

  updateFullscreen(images.length);
  fullscreenEl.classList.add('active');
  document.body.style.overflow = 'hidden';
  haptic.light();
}

function closeFullscreen() {
  if (!fullscreenEl) return;
  fullscreenEl.classList.remove('active');
  document.body.style.overflow = '';
}

function updateFullscreen(total) {
  if (fullscreenSlides) fullscreenSlides.style.transform = `translateX(-${fsIndex * 100}%)`;
  if (fullscreenCounter) fullscreenCounter.textContent = `${fsIndex + 1} / ${total}`;
  if (fullscreenDots) {
    fullscreenDots.querySelectorAll('.hero-dot').forEach((d, i) => d.classList.toggle('active', i === fsIndex));
  }
}

function initFullscreenGallery() {
  if (!fullscreenEl) return;

  // Close button
  fullscreenClose?.addEventListener('click', closeFullscreen);

  // Close on background tap (center area)
  fullscreenEl.addEventListener('click', e => {
    const rect = fullscreenEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const w = rect.width;
    const car = cars.find(c => c.id === state.selectedCarId);
    if (!car) return;
    if (x < w * 0.3) {
      if (fsIndex > 0) { fsIndex--; updateFullscreen(car.images.length); haptic.light(); }
    } else if (x > w * 0.7) {
      if (fsIndex < car.images.length - 1) { fsIndex++; updateFullscreen(car.images.length); haptic.light(); }
    }
  });

  // Touch swipe
  fullscreenEl.addEventListener('touchstart', e => { fsTouchStartX = e.touches[0].clientX; }, { passive: true });
  fullscreenEl.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - fsTouchStartX;
    const car = cars.find(c => c.id === state.selectedCarId);
    if (!car) return;
    if (Math.abs(dx) > 40) {
      if (dx < 0 && fsIndex < car.images.length - 1) { fsIndex++; updateFullscreen(car.images.length); haptic.light(); }
      if (dx > 0 && fsIndex > 0)                     { fsIndex--; updateFullscreen(car.images.length); haptic.light(); }
    }
  }, { passive: true });

  // Keyboard
  document.addEventListener('keydown', e => {
    if (!fullscreenEl.classList.contains('active')) return;
    const car = cars.find(c => c.id === state.selectedCarId);
    if (!car) return;
    if (e.key === 'ArrowRight' && fsIndex < car.images.length - 1) { fsIndex++; updateFullscreen(car.images.length); }
    if (e.key === 'ArrowLeft'  && fsIndex > 0)                     { fsIndex--; updateFullscreen(car.images.length); }
    if (e.key === 'Escape') closeFullscreen();
  });

  // Tap on gallery to open fullscreen
  const gallery = $('details-gallery');
  if (gallery) {
    gallery.addEventListener('click', e => {
      if (e.target.closest('.details-fav-btn') || e.target.closest('.details-status-badge') || e.target.closest('.details-views-badge')) return;
      const car = cars.find(c => c.id === state.selectedCarId);
      if (car?.images?.length) openFullscreen(car.images, state.galleryIndex);
    });
  }
}

// ── HEART BURST ANIMATION ─────────────────────
const heartCanvas = $('heart-canvas');
const heartCtx = heartCanvas?.getContext('2d');

function burstHeart(x, y) {
  if (!heartCanvas || !heartCtx) return;

  heartCanvas.width  = window.innerWidth;
  heartCanvas.height = window.innerHeight;

  const particles = [];
  const count = 18;

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const speed = 2 + Math.random() * 4;
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2,
      size: 6 + Math.random() * 8,
      alpha: 1,
      color: Math.random() > 0.5 ? '#e8192c' : '#ff6b8a',
      gravity: 0.15
    });
  }

  let frame = 0;
  const maxFrames = 45;

  function draw() {
    heartCtx.clearRect(0, 0, heartCanvas.width, heartCanvas.height);

    particles.forEach(p => {
      p.x  += p.vx;
      p.y  += p.vy;
      p.vy += p.gravity;
      p.alpha -= 1 / maxFrames;
      if (p.alpha < 0) p.alpha = 0;

      heartCtx.save();
      heartCtx.globalAlpha = p.alpha;
      heartCtx.fillStyle = p.color;
      heartCtx.font = `${p.size * 2}px serif`;
      heartCtx.fillText('♥', p.x, p.y);
      heartCtx.restore();
    });

    frame++;
    if (frame < maxFrames) requestAnimationFrame(draw);
    else heartCtx.clearRect(0, 0, heartCanvas.width, heartCanvas.height);
  }

  requestAnimationFrame(draw);
}

// Перехоплюємо toggleFavorite для додавання burst
const _origToggleFavorite = toggleFavorite;
function toggleFavoriteWithBurst(carId, event) {
  const wasInFav = state.favorites.includes(carId);
  _origToggleFavorite(carId);
  // Burst тільки при ДОДАВАННІ
  if (!wasInFav && event) {
    const rect = event.currentTarget?.getBoundingClientRect?.();
    if (rect) {
      burstHeart(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
  }
}

// ── SKELETON FOR DETAILS ──────────────────────
function showDetailsSkeleton() {
  const body = document.querySelector('.details-body');
  if (!body) return;

  body.innerHTML = `
    <div class="details-skeleton">
      <div class="skeleton skeleton-head">
        <div class="skeleton-head-left">
          <div class="skeleton skeleton-line w-3-4" style="height:28px;border-radius:8px"></div>
          <div class="skeleton skeleton-line w-1-2" style="height:16px;border-radius:6px"></div>
        </div>
        <div class="skeleton skeleton-line" style="width:90px;height:32px;border-radius:8px"></div>
      </div>
      <div class="skeleton-quick-specs">
        <div class="skeleton skeleton-spec-box"></div>
        <div class="skeleton skeleton-spec-box"></div>
        <div class="skeleton skeleton-spec-box"></div>
        <div class="skeleton skeleton-spec-box"></div>
      </div>
      <div>
        <div class="skeleton skeleton-line w-1-2" style="height:20px;border-radius:6px;margin-bottom:12px"></div>
        <div class="spec-table" style="overflow:hidden;border-radius:14px;border:.5px solid var(--border)">
          ${Array(6).fill('<div class="skeleton skeleton-table-row"></div>').join('')}
        </div>
      </div>
      <div>
        <div class="skeleton skeleton-line w-2-3" style="height:20px;border-radius:6px;margin-bottom:12px"></div>
        <div class="skeleton skeleton-line w-full" style="height:14px;border-radius:6px;margin-bottom:8px"></div>
        <div class="skeleton skeleton-line w-full" style="height:14px;border-radius:6px;margin-bottom:8px"></div>
        <div class="skeleton skeleton-line w-3-4" style="height:14px;border-radius:6px"></div>
      </div>
    </div>
  `;
}

// ── NOTIFY / PUSH SUBSCRIPTIONS ───────────────
let notifySubscriptions = [];

function loadNotifySubscriptions() {
  try { notifySubscriptions = JSON.parse(localStorage.getItem('isauto_notify') || '[]'); } catch(e) { notifySubscriptions = []; }
}

function saveNotifySubscriptions() {
  try { localStorage.setItem('isauto_notify', JSON.stringify(notifySubscriptions)); } catch(e) {}
}

function openNotifyModal() {
  const modal = $('notify-modal');
  if (modal) modal.classList.add('active');
}

function closeNotifyModal() {
  const modal = $('notify-modal');
  if (modal) modal.classList.remove('active');
}

function initNotifyForm() {
  const form = $('notify-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    haptic.success();

    const brand = $('notify-brand')?.value || 'all';
    const price = parseInt($('notify-price')?.value) || null;
    const year  = parseInt($('notify-year')?.value)  || null;

    const sub = { brand, price, year, createdAt: Date.now() };
    notifySubscriptions.push(sub);
    saveNotifySubscriptions();

    // Відправляємо в Telegram бот
    if (tg?.sendData) {
      try {
        tg.sendData(JSON.stringify({ type: 'notify_subscribe', ...sub }));
      } catch(err) {}
    }

    closeNotifyModal();
    showToast('🔔 Сповіщення увімкнено!');

    // Оновлюємо кнопку
    updateNotifyButton();
  });
}

function updateNotifyButton() {
  const btn = $('notify-bell-btn');
  if (!btn) return;
  const hasActive = notifySubscriptions.length > 0;
  btn.classList.toggle('active', hasActive);
  btn.innerHTML = hasActive
    ? `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg> Сповіщення увімкнено`
    : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg> Сповіщення про нові авто`;
}

// ── ADMIN PANEL ───────────────────────────────
// Локальне сховище для авто доданих адміном
let adminCars = [];

function loadAdminCars() {
  try { adminCars = JSON.parse(localStorage.getItem('isauto_admin_cars') || '[]'); } catch(e) { adminCars = []; }
}

function saveAdminCars() {
  try { localStorage.setItem('isauto_admin_cars', JSON.stringify(adminCars)); } catch(e) {}
}

function openAdminPanel() {
  if (!isAdmin()) { showToast('⛔ Доступ заборонено'); haptic.error(); return; }
  const overlay = $('admin-overlay');
  if (overlay) { overlay.classList.add('active'); renderAdminCarsList(); }
  haptic.medium();
}

function closeAdminPanel() {
  const overlay = $('admin-overlay');
  if (overlay) overlay.classList.remove('active');
}

function initAdminTabs() {
  $$('.admin-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.admin-tab').forEach(t => t.classList.remove('active'));
      $$('.admin-tab-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      haptic.select();
      const content = $(`admin-tab-${tab.dataset.tab}`);
      if (content) content.classList.add('active');
      if (tab.dataset.tab === 'list') renderAdminCarsList();
    });
  });
}

function renderAdminCarsList() {
  const list = $('admin-cars-list');
  if (!list) return;

  const allCars = [...cars, ...adminCars];

  if (allCars.length === 0) {
    list.innerHTML = '<p style="text-align:center;color:var(--text-3);padding:20px">Авто відсутні</p>';
    return;
  }

  list.innerHTML = '';
  allCars.forEach(car => {
    const item = document.createElement('div');
    item.className = 'admin-car-item';
    item.innerHTML = `
      <img src="${car.images?.[0] || car.image || ''}" alt="${car.name}" loading="lazy" />
      <div class="admin-car-info">
        <strong>${car.name}</strong>
        <span>${car.year} · ${car.mileageText} · ${car.priceText}</span>
      </div>
      <div class="admin-car-actions">
        <button class="admin-car-btn edit-btn" data-car-id="${car.id}" aria-label="Редагувати">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
        <button class="admin-car-btn delete-btn" data-car-id="${car.id}" aria-label="Видалити">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
        </button>
      </div>
    `;

    // Delete handler (тільки для admin-доданих авто)
    item.querySelector('.delete-btn')?.addEventListener('click', () => {
      const carId = parseInt(item.querySelector('.delete-btn').dataset.carId);
      const idx = adminCars.findIndex(c => c.id === carId);
      if (idx > -1) {
        adminCars.splice(idx, 1);
        saveAdminCars();
        haptic.medium();
        showToast('Авто видалено');
        renderAdminCarsList();
      } else {
        showToast('Базові авто не можна видалити');
      }
    });

    list.appendChild(item);
  });
}

function initAdminAddForm() {
  const form = $('admin-add-form');
  if (!form) return;

  // Photo upload
  const photoBtn  = $('admin-photo-btn');
  const photoFile = $('admin-photo-file');
  const photoPreview = $('admin-photo-preview');
  let uploadedPhotos = [];

  photoBtn?.addEventListener('click', () => photoFile?.click());

  photoFile?.addEventListener('change', () => {
    const files = Array.from(photoFile.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = e => {
        uploadedPhotos.push(e.target.result);
        if (photoPreview) {
          const thumb = document.createElement('div');
          thumb.className = 'admin-photo-thumb';
          const idx = uploadedPhotos.length - 1;
          thumb.innerHTML = `
            <img src="${e.target.result}" alt="Фото" />
            <button class="remove-photo" data-idx="${idx}">✕</button>
          `;
          thumb.querySelector('.remove-photo')?.addEventListener('click', () => {
            uploadedPhotos.splice(idx, 1);
            thumb.remove();
          });
          photoPreview.appendChild(thumb);
        }
      };
      reader.readAsDataURL(file);
    });
  });

  // Video upload
  const videoBtn  = $('admin-video-btn');
  const videoFile = $('admin-video-file');
  const videoInfo = $('admin-video-info');
  let uploadedVideoUrl = null;

  videoBtn?.addEventListener('click', () => videoFile?.click());

  videoFile?.addEventListener('change', () => {
    const file = videoFile.files[0];
    if (!file) return;
    const sizeMB = (file.size / 1024 / 1024).toFixed(1);
    uploadedVideoUrl = URL.createObjectURL(file);
    if (videoInfo) {
      videoInfo.textContent = `✓ ${file.name} (${sizeMB} MB)`;
      videoInfo.className = 'admin-video-info loaded';
    }
    haptic.success();
  });

  // Form submit
  form.addEventListener('submit', e => {
    e.preventDefault();
    haptic.success();

    const data = Object.fromEntries(new FormData(form));
    const brand = data.brand || 'BMW';
    const model = data.model || '';
    const year  = parseInt(data.year) || 2020;
    const mileage = parseInt(data.mileage) || 0;
    const price = parseInt(data.price) || 0;

    // Визначаємо зображення
    const imageUrlInput = form.querySelector('[name="imageUrl"]')?.value;
    let images = uploadedPhotos.length > 0
      ? uploadedPhotos
      : imageUrlInput
        ? [imageUrlInput]
        : ['https://pngimg.com/uploads/bmw/bmw_PNG99558.png'];

    const newCar = {
      id: Date.now(),
      brand,
      model,
      name: `${brand} ${model}`,
      year,
      mileage,
      mileageText: `${mileage.toLocaleString('uk-UA')} км`,
      price,
      priceText: `$${price.toLocaleString('uk-UA')}`,
      engine:       data.engine       || '—',
      drive:        data.drive        || 'Повний привід',
      fuel:         data.fuel         || 'Бензин',
      transmission: 'Автомат',
      power:        '—',
      body:         'Позашляховик',
      color:        '—',
      city:         data.city         || 'Одеса',
      vin:          'Перевірений',
      owners:       '1 власник',
      customs:      'Розмитнений',
      condition:    '—',
      status:       data.status       || 'В наявності',
      canTrade:     !!form.querySelector('#admin-can-trade')?.checked,
      rating:       5,
      seller:       '@isauto1',
      phone:        data.phone        || null,
      views:        0,
      equipment:    data.equipment ? data.equipment.split(',').map(s => s.trim()).filter(Boolean) : [],
      description:  data.description  || '',
      images,
      videoUrl:     uploadedVideoUrl  || null,
    };

    adminCars.unshift(newCar);
    saveAdminCars();

    // Відправляємо в Telegram бот
    if (tg?.sendData) {
      try {
        tg.sendData(JSON.stringify({
          type: 'admin_add_car',
          name: newCar.name,
          year: newCar.year,
          price: newCar.priceText,
          city: newCar.city
        }));
      } catch(err) {}
    }

    form.reset();
    uploadedPhotos = [];
    uploadedVideoUrl = null;
    if (photoPreview) photoPreview.innerHTML = '';
    if (videoInfo) { videoInfo.textContent = ''; videoInfo.className = 'admin-video-info'; }

    showToast('✓ Авто додано в каталог!');

    // Перемикаємо на вкладку списку
    $$('.admin-tab').forEach(t => t.classList.remove('active'));
    $$('.admin-tab-content').forEach(c => c.classList.remove('active'));
    const listTab = document.querySelector('[data-tab="list"]');
    if (listTab) listTab.classList.add('active');
    const listContent = $('admin-tab-list');
    if (listContent) listContent.classList.add('active');
    renderAdminCarsList();
  });
}

function initAdminPushForm() {
  const form = $('admin-push-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    haptic.success();

    const data = Object.fromEntries(new FormData(form));

    // Відправляємо через Telegram бот
    if (tg?.sendData) {
      try {
        tg.sendData(JSON.stringify({ type: 'admin_push', ...data }));
      } catch(err) {}
    }

    showToast('📤 Розсилку надіслано!');
    form.reset();
  });
}

// Перевизначаємо getFilteredCars щоб включати adminCars
const _origGetFilteredCars = getFilteredCars;
function getFilteredCarsWithAdmin() {
  const allCars = [...cars, ...adminCars];
  let r = [...allCars];
  const searchEl = $('catalog-search');
  const q = searchEl ? searchEl.value.trim().toLowerCase() : '';
  if (q) r = r.filter(c => [c.brand,c.model,c.name,String(c.year),c.engine,c.fuel,c.city,c.body,c.transmission].join(' ').toLowerCase().includes(q));
  const bf = state.filters.brand !== 'all' ? state.filters.brand : state.activeBrand;
  if (bf !== 'all') r = r.filter(c => c.brand === bf);
  if (state.filters.priceMin) r = r.filter(c => c.price >= state.filters.priceMin);
  if (state.filters.priceMax) r = r.filter(c => c.price <= state.filters.priceMax);
  if (state.filters.yearMin)  r = r.filter(c => c.year  >= state.filters.yearMin);
  if (state.filters.yearMax)  r = r.filter(c => c.year  <= state.filters.yearMax);
  if (state.filters.mileage)  r = r.filter(c => c.mileage <= state.filters.mileage);
  if (state.filters.fuel !== 'all') r = r.filter(c => c.fuel === state.filters.fuel);
  switch(state.filters.sort) {
    case 'price-asc':   r.sort((a,b) => a.price - b.price); break;
    case 'price-desc':  r.sort((a,b) => b.price - a.price); break;
    case 'year-new':    r.sort((a,b) => b.year - a.year);   break;
    case 'mileage-low': r.sort((a,b) => a.mileage - b.mileage); break;
    default: r.sort((a,b) => b.id - a.id);
  }
  return r;
}

// ── VIDEO PLAYER ──────────────────────────────
function initVideoPlayer() {
  const playOverlay = $('video-play-overlay');
  const video = $('details-video');
  if (!playOverlay || !video) return;

  playOverlay.addEventListener('click', () => {
    video.play();
    playOverlay.classList.add('hidden');
    haptic.light();
  });

  video.addEventListener('pause', () => {
    playOverlay.classList.remove('hidden');
  });

  video.addEventListener('ended', () => {
    playOverlay.classList.remove('hidden');
  });
}

function loadVideoForCar(car) {
  const section = $('details-video-section');
  const videoEl = $('details-video');
  const srcEl   = $('details-video-src');
  const overlay = $('video-play-overlay');

  if (!section || !videoEl) return;

  const videoUrl = car.videoUrl || null;

  if (!videoUrl) {
    section.style.display = 'none';
    return;
  }

  section.style.display = '';
  if (srcEl) srcEl.src = videoUrl;
  videoEl.load();
  if (overlay) overlay.classList.remove('hidden');
}

// ── NOTIFY BELL IN CATALOG ────────────────────
function addNotifyBellToCatalog() {
  const titleBlock = document.querySelector('#screen-catalog .screen-title-block');
  if (!titleBlock || $('notify-bell-btn')) return;

  const btn = document.createElement('button');
  btn.id = 'notify-bell-btn';
  btn.className = 'notify-bell-btn';
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
    Сповіщення про нові авто
  `;
  btn.addEventListener('click', () => { openNotifyModal(); haptic.light(); });
  titleBlock.appendChild(btn);
  updateNotifyButton();
}

// ── ADMIN BUTTON IN PROFILE ───────────────────
function addAdminButtonToProfile() {
  if (!isAdmin()) return;
  const profileAbout = document.querySelector('.profile-about');
  if (!profileAbout || $('admin-access-btn')) return;

  const btn = document.createElement('button');
  btn.id = 'admin-access-btn';
  btn.className = 'admin-access-btn';
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
    Адмін-панель
  `;
  btn.addEventListener('click', openAdminPanel);
  profileAbout.before(btn);
}

// ── PATCH renderDetails TO USE NEW FEATURES ───
const _origRenderDetails = renderDetails;
function renderDetailsPatched() {
  // Show skeleton first
  showDetailsSkeleton();

  // Simulate async load (in real app — fetch from API)
  setTimeout(() => {
    // Restore original details-body HTML
    const body = document.querySelector('.details-body');
    if (body) {
      body.innerHTML = `
        <div class="details-head">
          <div>
            <h1 id="details-title">—</h1>
            <p id="details-meta" class="details-meta-text">—</p>
          </div>
          <div class="details-price-wrap">
            <div class="details-price" id="details-price">—</div>
            <div class="details-trade-badge" id="details-trade-badge" style="display:none">Торг</div>
          </div>
        </div>
        <div class="details-quick-specs" id="details-quick-specs">
          <div class="quick-spec"><span>Рік</span><strong id="dq-year">—</strong></div>
          <div class="quick-spec"><span>Пробіг</span><strong id="dq-mileage">—</strong></div>
          <div class="quick-spec"><span>Двигун</span><strong id="dq-engine">—</strong></div>
          <div class="quick-spec"><span>Привід</span><strong id="dq-drive">—</strong></div>
        </div>
        <div class="details-section"><h2>Характеристики</h2><div class="spec-table" id="details-spec-table"></div></div>
        <div class="details-section" id="details-equip-section"><h2>Комплектація</h2><div class="equip-tags" id="details-equip"></div></div>
        <div class="details-section"><h2>Опис</h2><p class="details-desc" id="details-desc">—</p></div>
        <div class="details-vin-row" id="details-vin-row" style="display:none">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/></svg>
          <span>VIN перевірено: <strong id="details-vin">—</strong></span>
          <button class="copy-vin-btn" id="copy-vin-btn" aria-label="Скопіювати VIN">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          </button>
        </div>
        <div class="details-contact-block"><p class="contact-label">Продавець</p><div class="contact-row" id="details-contact-row"></div></div>
        <div class="details-actions">
          <button class="btn-primary" data-action="contact-about-car">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.787 23.213l4.179-1.497A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm5.894 16.54c-.246.69-1.22 1.26-1.99 1.426-.53.113-1.22.203-3.55-.762-2.98-1.23-4.9-4.26-5.05-4.46-.146-.2-1.22-1.626-1.22-3.1 0-1.474.77-2.196 1.044-2.498.246-.27.536-.338.714-.338l.514.01c.165.007.386-.063.603.46.246.59.836 2.044.91 2.19.073.148.12.32.024.514-.09.196-.135.317-.27.49-.135.17-.285.38-.406.51-.136.135-.277.28-.12.548.158.27.7 1.154 1.503 1.87 1.033.92 1.904 1.205 2.174 1.34.27.135.427.112.585-.067.16-.18.68-.794.862-1.066.18-.27.36-.225.607-.135.247.09 1.57.74 1.84.875.27.135.45.202.516.314.065.112.065.65-.18 1.34z"/></svg>
            Написати менеджеру
          </button>
          <button class="btn-call" id="details-call-btn" style="display:none">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.6 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            Зателефонувати
          </button>
          <button class="btn-secondary" data-action="share-car">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            Поділитися
          </button>
        </div>
        <div class="details-section" id="details-video-section" style="display:none">
          <h2>Відеоогляд</h2>
          <div class="video-player-wrap" id="video-player-wrap">
            <video id="details-video" class="details-video" controls playsinline preload="metadata">
              <source id="details-video-src" src="" type="video/mp4" />
            </video>
            <button class="video-play-overlay" id="video-play-overlay">
              <div class="video-play-icon">
                <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
            </button>
          </div>
        </div>
        <div class="details-section" id="similar-section"><h2>Схожі авто</h2><div class="cars-scroll" id="similar-cars"></div></div>
      `;
    }

    // Re-bind copy VIN
    $('copy-vin-btn')?.addEventListener('click', () => {
      const car2 = cars.find(c => c.id === state.selectedCarId) || adminCars.find(c => c.id === state.selectedCarId);
      if (car2?.vin) navigator.clipboard?.writeText(car2.vin).then(() => { haptic.success(); showToast('VIN скопійовано!'); });
    });

    // Re-bind contact-about-car
    document.querySelector('[data-action="contact-about-car"]')?.addEventListener('click', contactAboutCar);
    document.querySelector('[data-action="share-car"]')?.addEventListener('click', shareCar);

    // Render actual details
    const allCars2 = [...cars, ...adminCars];
    const car = allCars2.find(c => c.id === state.selectedCarId);
    if (!car) return;

    // Render gallery
    renderGallery(car);

    // Status, views, fav
    const sb = $('details-status-badge'); if (sb) sb.textContent = car.status;
    const vb = $('details-views-count'); if (vb) vb.textContent = formatViews(car.views + (state.viewCounts[car.id] || 0));
    const fb = $('details-fav-btn');
    if (fb) {
      const isFav = state.favorites.includes(car.id);
      fb.classList.toggle('active', isFav);
      const svg = fb.querySelector('svg'); if (svg) svg.setAttribute('fill', isFav ? 'currentColor' : 'none');
    }

    // Head
    const t=$('details-title'),m=$('details-meta'),p=$('details-price');
    if (t) t.textContent = car.name;
    if (m) m.textContent = `${car.year} · ${car.mileageText} · ${car.city}`;
    if (p) p.textContent = car.priceText;
    const tb=$('details-trade-badge'); if (tb) tb.style.display = car.canTrade ? 'block' : 'none';

    // Quick specs
    const qy=$('dq-year'),qm=$('dq-mileage'),qe=$('dq-engine'),qd=$('dq-drive');
    if (qy) qy.textContent = car.year;
    if (qm) qm.textContent = car.mileageText;
    if (qe) qe.textContent = car.engine;
    if (qd) qd.textContent = car.drive;

    // Spec table
    const st=$('details-spec-table');
    if (st) {
      const rows=[['Марка',car.brand],['Модель',car.model],['Рік',car.year],['Пробіг',car.mileageText],['Двигун',car.engine],['Паливо',car.fuel],['Коробка',car.transmission],['Привід',car.drive],['Потужність',car.power],['Кузов',car.body],['Колір',car.color],['Місто',car.city],['Власники',car.owners],['Розмитнення',car.customs],['Стан',car.condition]].filter(([,v])=>v);
      st.innerHTML = rows.map(([l,v])=>`<div class="spec-row"><span>${l}</span><strong>${v}</strong></div>`).join('');
    }

    // Equipment
    const eq=$('details-equip'),eqs=$('details-equip-section');
    if (eq && car.equipment?.length>0) { eq.innerHTML=car.equipment.map(i=>`<span class="equip-tag">${i}</span>`).join(''); if(eqs) eqs.style.display=''; }
    else if (eqs) eqs.style.display='none';

    // Description
    const desc=$('details-desc'); if (desc) desc.textContent = car.description || '—';

    // VIN
    const vr=$('details-vin-row'),ve=$('details-vin');
    if (vr) { vr.style.display=car.vin?'flex':'none'; if(ve) ve.textContent=car.vin||'—'; }

    // Contact
    const cr=$('details-contact-row');
    if (cr) {
      let html='';
      if (car.seller) html+=`<div class="contact-item"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.787 23.213l4.179-1.497A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm5.894 16.54c-.246.69-1.22 1.26-1.99 1.426-.53.113-1.22.203-3.55-.762-2.98-1.23-4.9-4.26-5.05-4.46-.146-.2-1.22-1.626-1.22-3.1 0-1.474.77-2.196 1.044-2.498.246-.27.536-.338.714-.338l.514.01c.165.007.386-.063.603.46.246.59.836 2.044.91 2.19.073.148.12.32.024.514-.09.196-.135.317-.27.49-.135.17-.285.38-.406.51-.136.135-.277.28-.12.548.158.27.7 1.154 1.503 1.87 1.033.92 1.904 1.205 2.174 1.34.27.135.427.112.585-.067.16-.18.68-.794.862-1.066.18-.27.36-.225.607-.135.247.09 1.57.74 1.84.875.27.135.45.202.516.314.065.112.065.65-.18 1.34z"/></svg>${car.seller}</div>`;
      if (car.phone) html+=`<div class="contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.6 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>${car.phone}</div>`;
      cr.innerHTML = html;
    }

    // Call button
    const callBtn=$('details-call-btn');
    if (callBtn) {
      if (car.phone) { callBtn.style.display='flex'; callBtn.onclick=()=>{ haptic.medium(); window.location.href=`tel:${car.phone}`; }; }
      else callBtn.style.display='none';
    }

    // Video
    loadVideoForCar(car);
    initVideoPlayer();

    // Similar
    renderSimilarCars(car);

    window.scrollTo({ top: 0, behavior: 'instant' });
  }, 350);
}

// ── PATCH HEART ANIMATION ON FAV BUTTONS ─────
function patchFavButtons() {
  // Патчимо createCarCard щоб передавати event у toggleFavorite
  document.addEventListener('click', e => {
    const favBtn = e.target.closest('.car-card-fav');
    if (!favBtn) return;
    const carId = parseInt(favBtn.dataset.fav);
    if (!carId) return;
    e.stopPropagation();
    const wasInFav = state.favorites.includes(carId);
    toggleFavorite(carId);
    const nowFav = state.favorites.includes(carId);
    favBtn.classList.toggle('active', nowFav);
    const svg = favBtn.querySelector('svg');
    if (svg) svg.setAttribute('fill', nowFav ? 'currentColor' : 'none');
    if (!wasInFav) burstHeart(e.clientX, e.clientY);
  }, true);

  // Патчимо details-fav-btn
  document.addEventListener('click', e => {
    const favBtn = e.target.closest('#details-fav-btn');
    if (!favBtn) return;
    const wasInFav = state.favorites.includes(state.selectedCarId);
    toggleFavorite(state.selectedCarId);
    if (!wasInFav) burstHeart(e.clientX, e.clientY);
  });
}

// ── INIT NEW FEATURES ─────────────────────────
function initNewFeatures() {
  loadAdminCars();
  loadNotifySubscriptions();

  // Override functions
  window.renderCatalog = renderCatalogWithInfinite;
  window.getFilteredCars = getFilteredCarsWithAdmin;
  window.renderDetails = renderDetailsPatched;

  // Fullscreen gallery
  initFullscreenGallery();

  // Infinite scroll
  initInfiniteScroll();

  // Admin panel
  $('admin-close')?.addEventListener('click', closeAdminPanel);
  $('admin-overlay')?.addEventListener('click', e => { if (e.target === $('admin-overlay')) closeAdminPanel(); });
  initAdminTabs();
  initAdminAddForm();
  initAdminPushForm();

  // Notify modal
  initNotifyForm();
  $('notify-modal')?.addEventListener('click', e => { if (e.target === $('notify-modal')) closeNotifyModal(); });

  // data-action additions
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    if (el.dataset.action === 'close-notify-modal') closeNotifyModal();
    if (el.dataset.action === 'open-notify-modal')  openNotifyModal();
    if (el.dataset.action === 'open-admin')          openAdminPanel();
  });

  // Patch fav buttons for heart burst
  patchFavButtons();

  // Add notify bell to catalog on first render
  const origRenderScreen = window.renderScreen || renderScreen;
  const patchedRenderScreen = function(name) {
    origRenderScreen(name);
    if (name === 'catalog') {
      setTimeout(addNotifyBellToCatalog, 50);
    }
    if (name === 'profile') {
      setTimeout(addAdminButtonToProfile, 50);
    }
  };
  window.renderScreen = patchedRenderScreen;

  // Initial catalog render with infinite scroll
  if (state.screen === 'catalog') {
    renderCatalogWithInfinite();
    addNotifyBellToCatalog();
  }
}

// ── AUTO-INIT ─────────────────────────────────
// Запускаємо після основного init()
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => setTimeout(initNewFeatures, 100));
} else {
  setTimeout(initNewFeatures, 100);
}
