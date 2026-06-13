import { setPreviewPlanet } from './preview';

let currentPlanet = null;
let currentMoon = null;
let currentMoonPlanet = null;
let isPopulating = false;

const dom = {
    editView: document.getElementById('edit-view'),
    editSize: document.getElementById('edit-size'),
    editColor: document.getElementById('edit-color'),
    editTitle: document.getElementById('edit-title'),
    editDistance: document.getElementById('edit-distance'),
    editName: document.getElementById('edit-name'),
    editYear: document.getElementById('edit-year'),
    listView: document.getElementById('list-view'),
    planetList: document.getElementById('planet-list'),
    planetStats: document.getElementById('planet-stats'),
    planetFacts: document.getElementById('planet-facts'),
    planetImage: document.getElementById('planet-image'),
    planetTitle: document.getElementById('planet-title'),
    planetDescription: document.getElementById('planet-description'),
    extraPlanetFields: document.getElementById('extra-planet-fields'),
    extraMoonFields: document.getElementById('extra-moon-fields'),
    moonEditName: document.getElementById('moon-edit-name'),
    moonEditView: document.getElementById('moon-edit-view'),
    moonEditTitle: document.getElementById('moon-edit-title'),
    moonEditColor: document.getElementById('moon-edit-color'),
    moonEditDistance: document.getElementById('moon-edit-distance'),
    moonEditSpeed: document.getElementById('moon-edit-speed'),
    moonSection: document.getElementById('moon-section'),
    moonList: document.getElementById('moon-list'),
    btnMoonDelete: document.getElementById('btn-moon-delete'),
    btnDelete: document.getElementById('btn-delete'),
    btnCloseInfo: document.getElementById('btn-close-info'),
    btnAddMoon: document.getElementById('btn-add-moon'),
    btnAddPlanet: document.getElementById('btn-add-planet'),
    btnMoonBack: document.getElementById('btn-moon-back'),
    btnBack: document.getElementById('btn-back'),
    infoPanel: document.getElementById('info-panel'),
    labelDistance: document.getElementById('label-distance'),
    moonEditSize: document.getElementById('moon-edit-size'),
};

export function initUI(planets, callbacks) {
    document.addEventListener(
        'mousedown',
        () => {
            setTimeout(removeHint, 3000);
        },
        { once: true }
    );

    dom.btnAddPlanet.addEventListener('click', () => {
        showEditView(null);
    });
    dom.btnBack.addEventListener('click', () => {
        callbacks.onBack();
        showListView();
    });
    dom.btnDelete.addEventListener('click', () => {
        callbacks.onDelete(currentPlanet);
    });
    const inputs = [
        dom.editName,
        dom.editSize,
        dom.editColor,
        dom.editDistance,
        dom.editYear,
    ];
    inputs.forEach((i) => {
        i.addEventListener('input', () => {
            if (isPopulating) return;
            callbacks.onSave(getFormValues(), currentPlanet);
        });
    });
    dom.editName.addEventListener('input', () => {
        const hasName = dom.editName.value.trim().length > 0;
        dom.extraPlanetFields.classList.toggle('hidden', !hasName);
    });
    // Moon Edit View
    dom.btnMoonBack.addEventListener('click', () => {
        showEditView(currentMoonPlanet, false);
    });
    dom.btnMoonDelete.addEventListener('click', () => {
        callbacks.onMoonDelete(currentMoon, currentMoonPlanet);
    });
    const moonInputs = [
        dom.moonEditName,
        dom.moonEditSize,
        dom.moonEditColor,
        dom.moonEditDistance,
        dom.moonEditSpeed,
    ];
    moonInputs.forEach((i) => {
        i.addEventListener('input', () => {
            callbacks.onMoonSave(
                getMoonFormValues(),
                currentMoon,
                currentMoonPlanet
            );
        });
    });
    dom.btnAddMoon.addEventListener('click', () => {
        showMoonEditView(null, currentPlanet);
    });
    dom.moonEditName.addEventListener('input', () => {
        const hasName = dom.moonEditName.value.trim().length > 0;
        dom.extraMoonFields.classList.toggle('hidden', !hasName);
    });
    // Info panel
    dom.btnCloseInfo.addEventListener('click', () => {
        dom.infoPanel.classList.remove('visible');
    });
}

function removeHint() {
    const hint = document.getElementById('hint');
    if (!hint) return;
    hint.style.opacity = '0';
    hint.addEventListener('transitionend', () => hint.remove());
}

export function renderPlanetList(planets, onSelect) {
    const list = dom.planetList;
    list.innerHTML = '';
    planets.forEach((planet) => {
        const li = document.createElement('li');
        li.textContent = planet.name;
        li.addEventListener('click', () => onSelect(planet));
        list.appendChild(li);
    });
}

export function renderMoonList(planet, onSelect) {
    const list = dom.moonList;
    list.innerHTML = '';
    planet.moons.forEach((moon) => {
        const li = document.createElement('li');
        li.textContent = moon.name;
        li.addEventListener('click', () => onSelect(moon));
        list.appendChild(li);
    });
    dom.moonSection.classList.toggle('hidden', planet.isStar);
}

export function showListView() {
    currentPlanet = null;
    setPreviewPlanet(null);
    dom.editView.classList.add('hidden');
    dom.listView.classList.remove('hidden');
    isPopulating = false;
}

export function showMoonEditView(moon, planet) {
    currentMoon = moon;
    currentMoonPlanet = planet;
    const isNew = moon === null;
    dom.extraMoonFields.classList.toggle('hidden', isNew);
    dom.editView.classList.add('hidden');
    dom.moonEditView.classList.remove('hidden');
    dom.moonEditTitle.textContent = isNew ? 'Add Moon' : 'Edit Moon';
    dom.btnMoonDelete.classList.toggle('hidden', isNew);
    dom.moonEditName.value = isNew ? '' : moon.name;
    dom.moonEditSize.value = isNew ? 0.1 : moon.radius;
    dom.moonEditColor.value = isNew
        ? '#ffffff'
        : '#' + moon.color.toString(16).padStart(6, '0');
    dom.moonEditDistance.value = isNew ? 2 : moon.orbitRadius;
    dom.moonEditSpeed.value = isNew ? 0.5 : moon.orbitSpeed;
}

export function getCurrentMoon() {
    return currentMoon;
}

export function getCurrentMoonPlanet() {
    return currentMoonPlanet;
}

export function showEditView(planet, updatePreview = true) {
    dom.moonEditView.classList.add('hidden');
    dom.listView.classList.add('hidden');
    dom.editView.classList.remove('hidden');
    currentPlanet = planet;
    const isNew = planet === null;
    const isStar = planet?.isStar;
    dom.editName.parentElement.classList.remove('hidden');
    dom.editName.parentElement.classList.toggle('hidden', !!isStar);
    dom.extraPlanetFields.classList.toggle('hidden', isNew || isStar);
    dom.editTitle.textContent = isNew ? 'Add Planet' : 'Edit Planet';
    dom.btnDelete.classList.toggle('hidden', isStar || isNew);
    if (isNew) resetPlanetForm();
    else populatePlanetForm(planet);
    if (updatePreview) setPreviewPlanet(planet);
    if (!isNew)
        renderMoonList(planet, (moon) => showMoonEditView(moon, planet));
}

function populatePlanetForm(planet) {
    const isStar = planet?.isStar;
    dom.editName.value = planet.name;
    dom.editSize.value = planet.radius;
    dom.editColor.value = '#' + planet.color.toString(16).padStart(6, '0');
    dom.editDistance.value = planet.orbitRadius;
    dom.editYear.value = planet.yearDuration;
    dom.editSize.parentElement.classList.toggle('hidden', isStar);
    dom.labelDistance.classList.toggle('hidden', isStar);
    dom.editYear.parentElement.classList.toggle('hidden', isStar);
}

function resetPlanetForm() {
    dom.editName.value = '';
    dom.editSize.value = 1;
    dom.editColor.value = '#ffffff';
    dom.editDistance.value = 5;
    dom.editYear.value = 1;
}

export function showInfoPanel(planetName, data) {
    if (!data) return;

    dom.planetImage.src = data.image;
    dom.planetTitle.textContent = planetName;
    dom.planetDescription.textContent = data.description;

    const statsList = dom.planetStats;
    statsList.innerHTML = '';
    data.stats.forEach((stat) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <div class="stat-label">${stat.label}</div>
                <div class="stat-value">${stat.value}</div>
            </div>
            <div class="stat-comparison">${stat.comparison}</div>
        `;
        statsList.appendChild(li);
    });
    const factsList = dom.planetFacts;
    factsList.innerHTML = '';
    data.facts.forEach((fact) => {
        const li = document.createElement('li');
        li.textContent = fact;
        factsList.appendChild(li);
    });

    dom.infoPanel.classList.add('visible');
}

export function getCurrentPlanet() {
    return currentPlanet;
}

export function getFormValues() {
    return {
        name: dom.editName.value,
        radius: parseFloat(dom.editSize.value),
        color: parseInt(dom.editColor.value.replace('#', ''), 16),
        orbitRadius: parseFloat(dom.editDistance.value),
        yearDuration: parseFloat(dom.editYear.value),
    };
}

export function getMoonFormValues() {
    return {
        name: dom.moonEditName.value,
        radius: parseFloat(dom.moonEditSize.value),
        color: parseInt(dom.moonEditColor.value.replace('#', ''), 16),
        orbitRadius: parseFloat(dom.moonEditDistance.value),
        orbitSpeed: parseFloat(dom.moonEditSpeed.value),
    };
}
