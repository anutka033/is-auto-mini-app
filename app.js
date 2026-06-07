const cars = [
  {
    id: 1,
    brand: "BMW",
    name: "BMW X5",
    year: 2020,
    mileage: 30000,
    mileageText: "30 000 км",
    price: 59900,
    priceText: "$59 900",
    engine: "3.0 бензин",
    drive: "xDrive",
    status: "В наличии",
    description:
      "BMW X5 в отличном состоянии. Проверенный автомобиль, чистый салон, богатая комплектация, готов к осмотру и тест-драйву.",
    image: "https://pngimg.com/uploads/bmw/bmw_PNG99558.png"
  },
  {
    id: 2,
    brand: "Mercedes",
    name: "Mercedes GLE",
    year: 2021,
    mileage: 24000,
    mileageText: "24 000 км",
    price: 68500,
    priceText: "$68 500",
    engine: "3.0 дизель",
    drive: "4MATIC",
    status: "В наличии",
    description:
      "Mercedes GLE с премиальным салоном, комфортной подвеской и полным приводом. Отличный вариант для семьи и бизнеса.",
    image: "https://pngimg.com/uploads/mercedes/mercedes_PNG80135.png"
  },
  {
    id: 3,
    brand: "Audi",
    name: "Audi Q7",
    year: 2020,
    mileage: 41000,
    mileageText: "41 000 км",
    price: 54700,
    priceText: "$54 700",
    engine: "3.0 TDI",
    drive: "quattro",
    status: "В наличии",
    description:
      "Audi Q7 — большой комфортный SUV с полным приводом, просторным салоном и хорошей динамикой.",
    image: "https://pngimg.com/uploads/audi/audi_PNG1736.png"
  },
  {
    id: 4,
    brand: "Porsche",
    name: "Porsche Cayenne",
    year: 2022,
    mileage: 18000,
    mileageText: "18 000 км",
    price: 91000,
    priceText: "$91 000",
    engine: "3.0 бензин",
    drive: "AWD",
    status: "В наличии",
    description:
      "Porsche Cayenne в свежем состоянии. Спортивный характер, премиальный салон и яркая динамика.",
    image: "https://pngimg.com/uploads/porsche/porsche_PNG10622.png"
  }
];

let currentScreen = "home";
let previousScreen = "home";
let currentCarIndex = 0;
let selectedCarId = cars[0].id;

let activeBrand = "all";
let activeFilters = {
  brand: "all",
  price: null,
  year: null,
  mileage: null
};

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

const screens = document.querySelectorAll(".screen");
const navItems = document.querySelectorAll(".nav-item");

const backButton = document.querySelector(".back-button");
const menuToggle = document.querySelector(".menu-toggle");
const sideMenu = document.querySelector("#side-menu");
const themeToggle = document.querySelector(".theme-toggle");

const heroTitle = document.querySelector("#hero-car-title");
const heroMeta = document.querySelector("#hero-car-meta");
const heroPrice = document.querySelector("#hero-car-price");
const heroImage = document.querySelector("#hero-car-image");
const heroDots = document.querySelectorAll("#hero-dots .dot");

const popularCars = document.querySelector("#popular-cars");
const catalogList = document.querySelector("#catalog-list");
const catalogEmpty = document.querySelector("#catalog-empty");
const favoritesList = document.querySelector("#favorites-list");
const favoritesEmpty = document.querySelector("#favorites-empty");

const homeSearch = document.querySelector("#home-search");
const catalogSearch = document.querySelector("#catalog-search");

const successModal = document.querySelector("#success-modal");

const detailsImage = document.querySelector("#details-image");
const detailsStatus = document.querySelector("#details-status");
const detailsTitle = document.querySelector("#details-title");
const detailsMeta = document.querySelector("#details-meta");
const detailsPrice = document.querySelector("#details-price");
const detailsYear = document.querySelector("#details-year");
const detailsMileage = document.querySelector("#details-mileage");
const detailsEngine = document.querySelector("#details-engine");
const detailsDrive = document.querySelector("#details-drive");
const detailsDescription = document.querySelector("#details-description");

const filterBrand = document.querySelector("#filter-brand");
const filterPrice = document.querySelector("#filter-price");
const filterYear = document.querySelector("#filter-year");
const filterMileage = document.querySelector("#filter-mileage");

function saveFavorites() {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function formatCarMeta(car) {
  return `${car.year} • ${car.mileageText}`;
}

function isFavorite(carId) {
  return favorites.includes(carId);
}

function toggleFavorite(carId) {
  if (isFavorite(carId)) {
    favorites = favorites.filter((id) => id !== carId);
  } else {
    favorites.push(carId);
  }

  saveFavorites();
  renderCatalog();
  renderFavorites();
  renderPopularCars();
  updateDetailsFavoriteButton();
}

function getSelectedCar() {
  return cars.find((car) => car.id === selectedCarId) || cars[0];
}

function navigateTo(screenName) {
  if (!screenName) return;

  previousScreen = currentScreen;
  currentScreen = screenName;

  screens.forEach((screen) => {
    const isActive = screen.dataset.screen === screenName;

    screen.classList.toggle("active", isActive);

    if (isActive) {
      screen.classList.remove("screen-enter");
      void screen.offsetWidth;
      screen.classList.add("screen-enter");
    }
  });

  navItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.screenLink === screenName);
  });

  backButton.classList.toggle("visible", screenName !== "home");

  closeMenu();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  if (screenName === "catalog") renderCatalog();
  if (screenName === "favorites") renderFavorites();
  if (screenName === "details") renderDetails();
}

function goBack() {
  if (currentScreen === "home") return;
  navigateTo(previousScreen || "home");
}

function renderHeroCar(index) {
  const car = cars[index];

  currentCarIndex = index;
  selectedCarId = car.id;

  heroTitle.textContent = car.name;
  heroMeta.textContent = formatCarMeta(car);
  heroPrice.textContent = car.priceText;
  heroImage.src = car.image;
  heroImage.alt = car.name;

  heroDots.forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === index);
  });
}

function nextHeroCar() {
  const nextIndex = (currentCarIndex + 1) % cars.length;
  renderHeroCar(nextIndex);
}

function createCarCard(car, variant = "default") {
  const favoriteClass = isFavorite(car.id) ? "active" : "";
  const buttonText = variant === "compact" ? "Смотреть" : "Подробнее";

  return `
    <article class="car-card" data-car-id="${car.id}">
      <button class="favorite-button ${favoriteClass}" data-action="toggle-favorite" data-car-id="${car.id}">
        ${isFavorite(car.id) ? "♥" : "♡"}
      </button>

      <img src="${car.image}" alt="${car.name}" class="car-card-image" />

      <div class="car-card-content">
        <p class="eyebrow">${car.status}</p>

        <div class="car-card-title-row">
          <div>
            <h3>${car.name}</h3>
            <p>${formatCarMeta(car)}</p>
          </div>

          <strong>${car.priceText}</strong>
        </div>

        <div class="car-card-specs">
          <span>${car.engine}</span>
          <span>${car.drive}</span>
        </div>

        <button class="outline-button full-width" data-action="open-car" data-car-id="${car.id}">
          ${buttonText}
          <span>→</span>
        </button>
      </div>
    </article>
  `;
}

function renderPopularCars() {
  popularCars.innerHTML = cars
    .slice(0, 4)
    .map((car) => createCarCard(car, "compact"))
    .join("");
}

function getFilteredCars() {
  const searchValue = (catalogSearch?.value || "").trim().toLowerCase();

  return cars.filter((car) => {
    const matchesSearch =
      car.name.toLowerCase().includes(searchValue) ||
      car.brand.toLowerCase().includes(searchValue) ||
      String(car.year).includes(searchValue);

    const matchesBrand =
      activeBrand === "all" ? true : car.brand === activeBrand;

    const matchesFilterBrand =
      activeFilters.brand === "all" ? true : car.brand === activeFilters.brand;

    const matchesPrice =
      activeFilters.price === null ? true : car.price <= activeFilters.price;

    const matchesYear =
      activeFilters.year === null ? true : car.year >= activeFilters.year;

    const matchesMileage =
      activeFilters.mileage === null
        ? true
        : car.mileage <= activeFilters.mileage;

    return (
      matchesSearch &&
      matchesBrand &&
      matchesFilterBrand &&
      matchesPrice &&
      matchesYear &&
      matchesMileage
    );
  });
}

function renderCatalog() {
  const filteredCars = getFilteredCars();

  catalogList.innerHTML = filteredCars.map((car) => createCarCard(car)).join("");

  catalogEmpty.classList.toggle("visible", filteredCars.length === 0);
}

function renderFavorites() {
  const favoriteCars = cars.filter((car) => favorites.includes(car.id));

  favoritesList.innerHTML = favoriteCars.map((car) => createCarCard(car)).join("");

  favoritesEmpty.classList.toggle("visible", favoriteCars.length === 0);
}

function renderDetails() {
  const car = getSelectedCar();

  detailsImage.src = car.image;
  detailsImage.alt = car.name;
  detailsStatus.textContent = car.status;
  detailsTitle.textContent = car.name;
  detailsMeta.textContent = formatCarMeta(car);
  detailsPrice.textContent = car.priceText;
  detailsYear.textContent = car.year;
  detailsMileage.textContent = car.mileageText;
  detailsEngine.textContent = car.engine;
  detailsDrive.textContent = car.drive;
  detailsDescription.textContent = car.description;

  updateDetailsFavoriteButton();
}

function updateDetailsFavoriteButton() {
  const button = document.querySelector('[data-action="favorite-details"]');
  if (!button) return;

  const active = isFavorite(selectedCarId);

  button.classList.toggle("active", active);
  button.textContent = active ? "♥" : "♡";
}

function openCar(carId) {
  selectedCarId = Number(carId);
  navigateTo("details");
}

function openCurrentCar() {
  const car = cars[currentCarIndex];
  openCar(car.id);
}

function openMenu() {
  sideMenu.classList.add("active");
}

function closeMenu() {
  sideMenu.classList.remove("active");
}

function openModal() {
  successModal.classList.add("active");
}

function closeModal() {
  successModal.classList.remove("active");
}

function resetFilters() {
  activeBrand = "all";

  activeFilters = {
    brand: "all",
    price: null,
    year: null,
    mileage: null
  };

  filterBrand.value = "all";
  filterPrice.value = "";
  filterYear.value = "";
  filterMileage.value = "";

  document.querySelectorAll("#brand-chips .chip").forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.brand === "all");
  });

  if (catalogSearch) catalogSearch.value = "";

  renderCatalog();
}

function applyFilters() {
  activeFilters = {
    brand: filterBrand.value,
    price: filterPrice.value ? Number(filterPrice.value) : null,
    year: filterYear.value ? Number(filterYear.value) : null,
    mileage: filterMileage.value ? Number(filterMileage.value) : null
  };

  navigateTo("catalog");
  renderCatalog();
}

function submitLeadForm(form) {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  console.log("Новая заявка IS AUTO:", data);

  form.reset();
  openModal();
}

function handleGlobalClick(event) {
  const screenLink = event.target.closest("[data-screen-link]");
  const actionButton = event.target.closest("[data-action]");
  const carCard = event.target.closest(".car-card");

  if (screenLink) {
    navigateTo(screenLink.dataset.screenLink);
    return;
  }

  if (actionButton) {
    const action = actionButton.dataset.action;
    const carId = actionButton.dataset.carId;

    if (action === "back") goBack();
    if (action === "open-car") openCar(carId);
    if (action === "open-current-car") openCurrentCar();
    if (action === "favorite-current") toggleFavorite(cars[currentCarIndex].id);
    if (action === "favorite-details") toggleFavorite(selectedCarId);
    if (action === "toggle-favorite") toggleFavorite(Number(carId));
    if (action === "close-menu") closeMenu();
    if (action === "close-modal") closeModal();
    if (action === "reset-filters") resetFilters();

    if (action === "call-manager") {
      window.location.href = "tel:+380000000000";
    }

    if (action === "open-instagram") {
      window.open("https://www.instagram.com/isauto_dealership/", "_blank");
    }

    return;
  }

  if (carCard) {
    openCar(carCard.dataset.carId);
  }
}

document.addEventListener("click", handleGlobalClick);

heroDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    renderHeroCar(Number(dot.dataset.slide));
  });
});

menuToggle.addEventListener("click", openMenu);

sideMenu.addEventListener("click", (event) => {
  if (event.target === sideMenu) {
    closeMenu();
  }
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

homeSearch.addEventListener("input", () => {
  const query = homeSearch.value.trim().toLowerCase();

  if (!query) return;

  const foundCar = cars.find((car) =>
    car.name.toLowerCase().includes(query) ||
    car.brand.toLowerCase().includes(query)
  );

  if (foundCar) {
    const index = cars.findIndex((car) => car.id === foundCar.id);
    renderHeroCar(index);
  }
});

catalogSearch.addEventListener("input", renderCatalog);

document.querySelectorAll("#brand-chips .chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    activeBrand = chip.dataset.brand;

    document.querySelectorAll("#brand-chips .chip").forEach((item) => {
      item.classList.remove("active");
    });

    chip.classList.add("active");

    renderCatalog();
  });
});

document.querySelector("#filters-form").addEventListener("submit", (event) => {
  event.preventDefault();
  applyFilters();
});

document.querySelectorAll(".lead-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    submitLeadForm(form);
  });
});

successModal.addEventListener("click", (event) => {
  if (event.target === successModal) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    closeModal();
  }
});

let startX = 0;
let endX = 0;

document.querySelector(".hero-card").addEventListener("touchstart", (event) => {
  startX = event.touches[0].clientX;
});

document.querySelector(".hero-card").addEventListener("touchend", (event) => {
  endX = event.changedTouches[0].clientX;

  const diff = startX - endX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      nextHeroCar();
    } else {
      const previousIndex =
        currentCarIndex === 0 ? cars.length - 1 : currentCarIndex - 1;

      renderHeroCar(previousIndex);
    }
  }
});

setInterval(() => {
  if (currentScreen === "home") {
    nextHeroCar();
  }
}, 6000);

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
}

renderHeroCar(currentCarIndex);
renderPopularCars();
renderCatalog();
renderFavorites();