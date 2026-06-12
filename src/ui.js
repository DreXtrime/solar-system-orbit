import { setPreviewPlanet } from './preview';

let currentPlanet = null;
let currentMoon = null;
let currentMoonPlanet = null;
let isPopulating = false;

export function initUI(planets, callbacks) {
    // Planet Edit View
    document.getElementById('btn-add-planet').addEventListener('click', () => {
        showEditView(null);
    });
    document.getElementById('btn-back').addEventListener('click', () => {
        callbacks.onBack();
        showListView();
    });
    document.getElementById('btn-delete').addEventListener('click', () => {
        callbacks.onDelete(currentPlanet);
    });
    const inputs = [
        'edit-name',
        'edit-size',
        'edit-color',
        'edit-distance',
        'edit-year',
    ];
    inputs.forEach((id) => {
        document.getElementById(id).addEventListener('input', () => {
            if (isPopulating) return;
            callbacks.onSave(getFormValues(), currentPlanet);
        });
    });
    document.getElementById('edit-name').addEventListener('input', () => {
        const hasName =
            document.getElementById('edit-name').value.trim().length > 0;
        document
            .getElementById('extra-planet-fields')
            .classList.toggle('hidden', !hasName);
    });
    // Moon Edit View
    document.getElementById('btn-moon-back').addEventListener('click', () => {
        showEditView(currentMoonPlanet, false);
    });
    document.getElementById('btn-moon-delete').addEventListener('click', () => {
        callbacks.onMoonDelete(currentMoon, currentMoonPlanet);
    });
    const moonInputs = [
        'moon-edit-name',
        'moon-edit-size',
        'moon-edit-color',
        'moon-edit-distance',
        'moon-edit-speed',
    ];
    moonInputs.forEach((id) => {
        document.getElementById(id).addEventListener('input', () => {
            callbacks.onMoonSave(
                getMoonFormValues(),
                currentMoon,
                currentMoonPlanet
            );
        });
    });
    document.getElementById('btn-add-moon').addEventListener('click', () => {
        showMoonEditView(null, currentPlanet);
    });
    document.getElementById('moon-edit-name').addEventListener('input', () => {
        const hasName =
            document.getElementById('moon-edit-name').value.trim().length > 0;
        document
            .getElementById('extra-moon-fields')
            .classList.toggle('hidden', !hasName);
    });
    // Info panel
    document.getElementById('btn-close-info').addEventListener('click', () => {
        document.getElementById('info-panel').classList.remove('visible');
    });
}

export function renderPlanetList(planets, onSelect) {
    const list = document.getElementById('planet-list');
    list.innerHTML = '';
    planets.forEach((planet) => {
        const li = document.createElement('li');
        li.textContent = planet.name;
        li.addEventListener('click', () => onSelect(planet));
        list.appendChild(li);
    });
}

export function renderMoonList(planet, onSelect) {
    const list = document.getElementById('moon-list');
    list.innerHTML = '';
    planet.moons.forEach((moon) => {
        const li = document.createElement('li');
        li.textContent = moon.name;
        li.addEventListener('click', () => onSelect(moon));
        list.appendChild(li);
    });
    document
        .getElementById('moon-section')
        .classList.toggle('hidden', planet.isStar);
}

export function showListView() {
    isPopulating = true;
    currentPlanet = null;
    setPreviewPlanet(null);
    document.getElementById('edit-view').classList.add('hidden');
    document.getElementById('list-view').classList.remove('hidden');
    isPopulating = false;
}

export function showMoonEditView(moon, planet) {
    currentMoon = moon;
    currentMoonPlanet = planet;
    const isNew = moon === null;
    document
        .getElementById('extra-moon-fields')
        .classList.toggle('hidden', isNew);
    document.getElementById('edit-view').classList.add('hidden');
    document.getElementById('moon-edit-view').classList.remove('hidden');
    document.getElementById('moon-edit-title').textContent = isNew
        ? 'Add Moon'
        : 'Edit Moon';
    document
        .getElementById('btn-moon-delete')
        .classList.toggle('hidden', isNew);
    document.getElementById('moon-edit-name').value = isNew ? '' : moon.name;
    document.getElementById('moon-edit-size').value = isNew ? 0.1 : moon.radius;
    document.getElementById('moon-edit-color').value = isNew
        ? '#ffffff'
        : '#' + moon.color.toString(16).padStart(6, '0');
    document.getElementById('moon-edit-distance').value = isNew
        ? 2
        : moon.orbitRadius;
    document.getElementById('moon-edit-speed').value = isNew
        ? 0.5
        : moon.orbitSpeed;
}

export function getCurrentMoon() {
    return currentMoon;
}

export function getCurrentMoonPlanet() {
    return currentMoonPlanet;
}

export function showEditView(planet, updatePreview = true) {
    document.getElementById('moon-edit-view').classList.add('hidden');
    currentPlanet = planet;
    const isStar = planet?.isStar;
    const isNew = planet === null;
    document
        .getElementById('extra-planet-fields')
        .classList.toggle('hidden', isNew);
    document.getElementById('list-view').classList.add('hidden');
    document.getElementById('edit-view').classList.remove('hidden');
    document.getElementById('edit-title').textContent = isNew
        ? 'Add Planet'
        : 'Edit Planet';
    document
        .getElementById('btn-delete')
        .classList.toggle('hidden', isStar || isNew);
    document.getElementById('edit-name').value = isNew ? '' : planet.name;
    document.getElementById('edit-size').value = isNew ? 1 : planet.radius;
    document
        .getElementById('edit-size')
        .parentElement.classList.toggle('hidden', isStar);
    document.getElementById('edit-color').value = isNew
        ? '#ffffff'
        : '#' + planet.color.toString(16).padStart(6, '0');
    document.getElementById('edit-distance').value = isNew
        ? 5
        : planet.orbitRadius;
    document
        .getElementById('label-distance')
        .classList.toggle('hidden', isStar);
    document.getElementById('edit-year').value = isNew
        ? 1
        : planet.yearDuration;
    document
        .getElementById('edit-year')
        .parentElement.classList.toggle('hidden', isStar);
    if (updatePreview) setPreviewPlanet(planet);
    if (!isNew)
        renderMoonList(planet, (moon) => showMoonEditView(moon, planet));
}

export function showInfoPanel(planetName, data) {
    if (!data) return;

    document.getElementById('planet-image').src = data.image;
    document.getElementById('planet-title').textContent = planetName;
    document.getElementById('planet-description').textContent =
        data.description;

    const statsList = document.getElementById('planet-stats');
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
    const factsList = document.getElementById('planet-facts');
    factsList.innerHTML = '';
    data.facts.forEach((fact) => {
        const li = document.createElement('li');
        li.textContent = fact;
        factsList.appendChild(li);
    });

    document.getElementById('info-panel').classList.add('visible');
}

export function getCurrentPlanet() {
    return currentPlanet;
}

export function getFormValues() {
    return {
        name: document.getElementById('edit-name').value,
        radius: parseFloat(document.getElementById('edit-size').value),
        color: parseInt(
            document.getElementById('edit-color').value.replace('#', ''),
            16
        ),
        orbitRadius: parseFloat(document.getElementById('edit-distance').value),
        yearDuration: parseFloat(document.getElementById('edit-year').value),
    };
}

export function getMoonFormValues() {
    return {
        name: document.getElementById('moon-edit-name').value,
        radius: parseFloat(document.getElementById('moon-edit-size').value),
        color: parseInt(
            document.getElementById('moon-edit-color').value.replace('#', ''),
            16
        ),
        orbitRadius: parseFloat(
            document.getElementById('moon-edit-distance').value
        ),
        orbitSpeed: parseFloat(
            document.getElementById('moon-edit-speed').value
        ),
    };
}
