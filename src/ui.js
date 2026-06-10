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

export function showEditView(planet) {
    document.getElementById('list-view').classList.add('hidden')
    document.getElementById('edit-view').classList.remove('hidden')

    const isNew = planet === null
    document.getElementById('edit-title').textContent = isNew ? 'Add Planet' : 'Edit Planet'
    document.getElementById('btn-delete').classList.toggle('hidden', isNew)

    document.getElementById('edit-name').value = isNew ? '' : planet.name
    document.getElementById('edit-size').value = isNew ? 1 : planet.radius
    document.getElementById('edit-color').value = isNew ? '#ffffff' : '#' + planet.color.toString(16).padStart(6, '0')
    document.getElementById('edit-distance').value = isNew ? 5 : planet.orbitRadius
    document.getElementById('edit-year').value = isNew ? 1 : planet.yearDuration
}