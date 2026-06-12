import Planet from './bodies.js';
import Moon from './moons.js';

export const planets = [
    new Planet('Sun', 109.1, 0xffffff, 0, 0.1, 0.04, 'sun.jpg', true),
    new Planet(
        'Mercury',
        0.383,
        0xffffff,
        0.387,
        0.240846,
        0.04,
        'mercury.jpg'
    ),
    new Planet(
        'Venus',
        0.949,
        0xffffff,
        0.723,
        0.615198,
        3.2,
        'venus_atmosphere.jpg',
        false,
        true
    ),
    new Planet('Earth', 1.0, 0xffffff, 1.0, 1.0, 1.0, 'earth.jpg'),
    new Planet('Mars', 0.532, 0xffffff, 1.52, 1.8808, 0.98, 'mars.jpg'),
    new Planet('Jupiter', 10.97, 0xffffff, 5.2, 11.862, 2.42, 'jupiter.jpg'),
    new Planet(
        'Saturn',
        9.14,
        0xffffff,
        9.58,
        29.457,
        0.54,
        'saturn.jpg',
        false,
        false,
        true
    ),
    new Planet(
        'Uranus',
        3.98,
        0xffffff,
        19.2,
        84.017,
        1.4,
        'uranus.jpg',
        false,
        true
    ),
    new Planet('Neptune', 3.86, 0xffffff, 30.05, 164.79, 1.49, 'neptune.jpg'),
    new Planet(
        'Pluto',
        0.187,
        0xffffff,
        39.5,
        248.0,
        0.16,
        'pluto.jpg',
        false,
        true
    ),
];

planets
    .find((p) => p.name === 'Earth')
    .moons.push(new Moon('Moon', 0.18, 0xffffff, 1.3, 1.5, 'moon.jpg'));
planets
    .find((p) => p.name === 'Jupiter')
    .moons.push(new Moon('Io', 0.4, 0xffffff, 4.2, 1.8, 'Io.webp'));
planets
    .find((p) => p.name === 'Jupiter')
    .moons.push(new Moon('Europa', 0.3, 0xffffff, 4.3, 0.95, 'europa.webp'));
