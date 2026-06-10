let currentPlanet = null;

export function initUI(planets, callbacks) {
    document.getElementById('btn-add-planet').addEventListener('click', () => {
        showEditView(null)
    })
    document.getElementById('btn-back').addEventListener('click', () => {
        showListView()
    })
    document.getElementById('btn-delete').addEventListener('click', () => {
        callbacks.onDelete(getCurrentPlanet())
    })
    document.getElementById('btn-playpause').addEventListener('click', () => {
      paused = !paused
      document.getElementById('btn-playpause').textContent = paused ? 'Play' : 'Pause'
    })
    document.getElementById('speed-slider').addEventListener('input', (e) => {
      simulationSpeed = parseFloat(e.target.value)
      document.getElementById('speed-label').textContent = `${simulationSpeed}x`
    })
    const inputs = ['edit-name', 'edit-size', 'edit-color', 'edit-distance', 'edit-year']
    inputs.forEach(id => {
        document.getElementById(id).addEventListener('input', () => {
            callbacks.onSave(getFormValues(), currentPlanet)
        })
    })
}

export function renderPlanetList(planets, onSelect) {
    const list = document.getElementById('planet-list')
    list.innerHTML = ''
    planets.forEach(planet => {
        const li = document.createElement('li')
        li.textContent = planet.name
        li.addEventListener('click', () => onSelect(planet))
        list.appendChild(li)
    })
}

export function showListView() {
    document.getElementById('edit-view').classList.add('hidden')
    document.getElementById('list-view').classList.remove('hidden')
}

export function showEditView(planet) {
    currentPlanet = planet;
    const isStar = planet?.isStar
    const isNew = planet === null
    document.getElementById('list-view').classList.add('hidden')
    document.getElementById('edit-view').classList.remove('hidden')
    document.getElementById('edit-title').textContent = isNew ? 'Add Planet' : 'Edit Planet'
    document.getElementById('btn-delete').classList.toggle('hidden', isStar || isNew)
    document.getElementById('edit-name').value = isNew ? '' : planet.name
    document.getElementById('edit-size').value = isNew ? 1 : planet.radius
    document.getElementById('edit-size').parentElement.classList.toggle('hidden', isStar)
    document.getElementById('edit-color').value = isNew ? '#ffffff' : '#' + planet.color.toString(16).padStart(6, '0')
    document.getElementById('edit-distance').value = isNew ? 5 : planet.orbitRadius
    document.getElementById('label-distance').classList.toggle('hidden', isStar)
    document.getElementById('edit-year').value = isNew ? 1 : planet.yearDuration
    document.getElementById('edit-year').parentElement.classList.toggle('hidden', isStar)
}

export function getCurrentPlanet() {
    return currentPlanet;
}

export function getFormValues() {
    return {
        name: document.getElementById('edit-name').value,
        radius: parseFloat(document.getElementById('edit-size').value),
        color: parseInt(document.getElementById('edit-color').value.replace('#', ''), 16),
        orbitRadius: parseFloat(document.getElementById('edit-distance').value),
        yearDuration: parseFloat(document.getElementById('edit-year').value),
    }
}