export const planetData = {
    earth: {
        image: "images/earth_banner.jpg",
        description: 'The only known planet to harbour life, Earth is a dynamic world of liquid oceans, shifting tectonic plates, and a protective magnetic field. From space it glows vivid blue, the colour of the water covering 71% of its surface.',
        stats: [
            { label: 'Diameter', value: '12,742 km', comparison: 'If Earth were hollow, you could fit 49 Moons inside it' },
            { label: 'Distance from Sun', value: '149.6 million km', comparison: 'A plane flying non-stop would take 17 years to get there' },
            { label: 'Year length', value: '365.25 days', comparison: 'You\'ve lapped the Sun as many times as your age' },
            { label: 'Surface temp', value: '15°C avg', comparison: 'The goldilocks zone — warm enough for liquid water' },
            { label: 'Image', value: 'December 7 1972', comparison: '"The Blue Marble From Apollo 17"' },
        ],
        facts: [
            'It accumulates space dust: Earth pulls in roughly 100 tonnes of cosmic debris and tiny meteoroids every single day, meaning the planet is constantly gaining mass.',
            'The core matches the Sun: The center of the planet reaches temperatures up to 6,000 degrees Celsius, which is just as hot as the surface of the Sun.',
            'It isn\'t a perfect sphere: Because Earth spins at over 1,600 kilometers per hour, gravity and centrifugal force push out its middle, creating a bulge at the equator. You weigh slightly less at the equator than at the poles.',
            'Tectonics keep it habitable: It is the only known planet with moving crustal plates. This constant recycling of carbon is the main reason Earth avoided turning into a runaway greenhouse wasteland like Venus.'
        ]
    },
    mercury: {
        image: "images/mercury_banner.jpg",
        description: 'The smallest planet and closest to the Sun, Mercury is a battered, cratered world with no atmosphere to protect it. Temperatures swing wildly — hotter than an oven by day, colder than Antarctica by night.',
        stats: [
            { label: 'Diameter', value: '4,879 km', comparison: 'Slightly wider than the continental United States' },
            { label: 'Distance from Sun', value: '57.9 million km', comparison: 'About a third of the distance from Earth to the Sun' },
            { label: 'Year length', value: '88 days', comparison: 'Four Mercury years pass in the time of one Earth year' },
            { label: 'Surface temp', value: '-180°C to 430°C', comparison: 'Swings more than any other planet — no atmosphere to even it out' },
            { label: 'Image', value: 'October 6 2008', comparison: 'minutes before NASA\'s MESSENGER spacecraft made its closest approach to Mercury' },
        ],
        facts: [
            'It is shrinking: As Mercury\'s massive iron core slowly cools down, the entire planet contracts. It has shrunk by roughly 14 kilometers in diameter over time, creating massive, towering cliffs across its surface.',
            'It hides frozen ice: Despite being closest to the Sun and reaching daytime temperatures of 430 degrees Celsius, Mercury has deep craters at its poles that never see sunlight. These permanent shadows act as super-freezers, preserving thick deposits of water ice.',
            'It has a metallic core: Mercury is essentially a giant metal ball wrapped in a thin rocky crust. Its iron-rich core makes up roughly 85 percent of the planet\'s total radius, a much higher percentage than any other planet in the solar system.',
            'It has a comet-like tail: Solar wind and micrometeorite impacts constantly blast sodium and other elements off the planet\'s surface, creating a faint, glowing tail that stretches millions of kilometers behind Mercury.'
        ]
    },
    venus: {
        image: "images/venus_banner.jpg",
        description: 'Venus is Earth\'s twisted twin — similar in size but a scorching hellscape beneath thick clouds of sulphuric acid. A day on Venus is longer than its year, and the Sun rises in the west.',
        stats: [
            { label: 'Diameter', value: '12,104 km', comparison: 'Almost exactly the same size as Earth' },
            { label: 'Distance from Sun', value: '108.2 million km', comparison: 'About 70% of Earth\'s distance from the Sun' },
            { label: 'Year length', value: '225 days', comparison: 'But a single day lasts 243 Earth days — longer than its year' },
            { label: 'Surface temp', value: '465°C avg', comparison: 'Hot enough to melt lead — hotter than Mercury despite being further away' },
            { label: 'Image', value: 'Feb 9. 1979', comparison: 'Venus in Ultraviolet Light From NASA\'s Pioneer Venus Orbiter' },
        ],
        facts: [
            'It rains sulfuric acid: The atmosphere of Venus is so thick and corrosive that it constantly rains pure acid. However, because the surface temperature is a scorching 475 degrees Celsius, the rain evaporates completely before it ever touches the ground.',
            'It spins backwards: Venus is one of only two planets in the solar system that rotates from east to west. If you could see through the dense clouds, the Sun would rise in the west and set in the east.',
            'The days are longer than years: Venus spins incredibly slowly on its axis. It takes 243 Earth days to complete just one rotation, but only 225 Earth days to travel all the way around the Sun, making its day longer than its year.',
            'It is a volcanic wasteland: Venus has more volcanoes than any other planet in the solar system, with over 1,600 major structures mapped on its surface. Scientists believe some of these volcanoes are still actively erupting today.'
        ]
    },
    mars: {
        image: "images/mars_banner.jpg",
        description: 'The red planet is a cold, dusty desert with the tallest volcano and longest canyon in the solar system. Mars has seasons, polar ice caps, and a day almost identical to Earth\'s — making it humanity\'s most likely next home.',
        stats: [
            { label: 'Diameter', value: '6,779 km', comparison: 'About half the width of Earth' },
            { label: 'Distance from Sun', value: '227.9 million km', comparison: 'One and a half times further from the Sun than Earth' },
            { label: 'Year length', value: '687 days', comparison: 'Nearly two Earth years for one lap around the Sun' },
            { label: 'Surface temp', value: '-60°C avg', comparison: 'Similar to winter in Antarctica' },
            { label: 'Image', value: 'February 25, 2007', comparison: 'European Space Agency\'s (ESA) Rosetta spacecraft executed a critical gravity assist flyby of Mars' },
        ],
        facts: [
            'It has a rusted surface: Mars is covered in iron oxide, which is the exact same chemical compound that forms rust. This fine, powdery dust hangs in the atmosphere and blankets the ground, giving the planet its iconic reddish appearance.',
            'It hosts the solar system\'s biggest volcano: Mars is home to Olympus Mons, a shield volcano that stands 21 kilometers high. It is roughly three times taller than Mount Everests and is so wide that its base would completely cover the entire country of Poland.',
            'It experiences global dust storms: When Mars gets closest to the Sun, solar heating causes intense winds that kick up giant clouds of dust. These storms can grow until they merge and completely trap the entire planet in a hazy shroud for months at a time.',
            'It has two captured asteroids for moons: Unlike Earth\'s large, spherical Moon, the two Martian moons, Phobos and Deimos, are small, lumpy, and heavily cratered. Scientists believe they were originally wandering asteroids that got trapped by Martian gravity.'
        ]
    },
    jupiter: {
        image: "images/jupiter_banner.jpg",
        description: 'Jupiter is a giant ball of gas so massive it could swallow all other planets combined. Its Great Red Spot is a storm that has been raging for over 350 years, wider than Earth itself.',
        stats: [
            { label: 'Diameter', value: '139,820 km', comparison: '11 Earths lined up side by side would stretch across it' },
            { label: 'Distance from Sun', value: '778.5 million km', comparison: 'Over 5 times further from the Sun than Earth' },
            { label: 'Year length', value: '12 Earth years', comparison: 'A child born today would be 12 before Jupiter finishes one lap' },
            { label: 'Moons', value: '95 known moons', comparison: 'More moons than any other planet — four are larger than our Moon' },
            { label: 'Image', value: 'Dec. 3, 1974', comparison: 'Pioneer 11 was the second spacecraft to observe Jupiter close up. The spacecraft’s closest approach to Jupiter, at a range of about 42,500 kilometer from the planet’s cloud tops' },
        ],
        facts: [
            'It is a failed star: Jupiter is made of the exact same elements, hydrogen and helium, as the Sun. If it had grown roughly 80 times more massive during the formation of the solar system, it would have triggered nuclear fusion and become a star itself.',
            'It has a century-old storm: The Great Red Spot is a giant, churning hurricane that is wider than the entire planet Earth. Humans have been actively observing this massive storm through telescopes for over 150 years, though recent data shows it is slowly shrinking.',
            'It acts as a cosmic shield: Because of its immense mass, Jupiter possesses a massive gravitational field. It acts like a giant vacuum cleaner for the solar system, pulling in or violently deflecting dangerous comets and asteroids that might otherwise head toward Earth.',
            'It has a moon with a hidden ocean: Jupiter\'s moon Europa is completely covered in a thick layer of water ice. Scientists have found strong evidence that beneath this frozen crust lies a liquid water ocean containing twice as much water as all of Earth\'s oceans combined.'
        ]
    },
    saturn: {
        image: "images/saturn_banner.jpg",
        description: 'Saturn\'s iconic rings are made of billions of chunks of ice and rock, stretching 282,000 km wide but only about 10 metres thick. Despite being enormous, Saturn is so light it would float in water.',
        stats: [
            { label: 'Diameter', value: '116,460 km', comparison: 'Nine Earths could fit across Saturn\'s equator' },
            { label: 'Distance from Sun', value: '1.43 billion km', comparison: 'Light takes 80 minutes to travel from the Sun to Saturn' },
            { label: 'Year length', value: '29 Earth years', comparison: 'Most adults have only seen Saturn complete one orbit in their lifetime' },
            { label: 'Ring width', value: '282,000 km', comparison: 'The rings are wider than the distance from Earth to the Moon' },
            { label: 'Image', value: 'Nov. 3, 1980', comparison: 'Voyager 1 was the second spacecraft to study Saturn up close. Launched Sept. 5, 1977, Voyager 1’s closest approach to Saturn was on Nov. 12, 1980, at a range of about 78,000 miles (126,000 km). A few days earlier, on Nov. 3, 1980, Voyager 1 took these images of Saturn and two of its moons, Tethys (above) and Dione. The spacecraft was 13 million kilometers away when it captured the images.' },
        ],
        facts: [
            'Its rings are mostly ice: Saturn\'s spectacular ring system is not solid, but rather made of billions of individual pieces of water ice, rocky debris, and dust. These pieces range in size from tiny dust grains to massive, house-sized boulders, all orbiting the planet together.',
            'It could float in water: Saturn is the second-largest planet in the solar system, but it has the lowest density of all. Because it is mostly made of lightweight gases like hydrogen and helium, its average density is less than water, meaning it would float in a giant bathtub.',
            'Its rings are paper-thin: While the main ring system spans roughly 282,000 kilometers across, it is incredibly thin, averaging only about 10 meters in thickness. If you scaled the planet down to the size of a smartphone, the rings would be thousands of times thinner than a single strand of hair.',
            'It has a permanent hexagonal storm: Saturn\'s north pole hosts a bizarre, six-sided jet stream that forms a near-perfect hexagon. This massive weather pattern has been spinning for decades, and each side of the hexagon is wide enough to fit the entire United States across it.'
        ]
    },
    uranus: {
        image: "images/uranus_banner.jpg",
        description: 'Uranus rolls around the Sun on its side, spinning at a 98-degree tilt — likely the result of a massive collision billions of years ago. It\'s an icy blue-green world so cold it holds the record for the lowest temperature of any planet.',
        stats: [
            { label: 'Diameter', value: '50,724 km', comparison: 'Four Earths would fit side by side across Uranus' },
            { label: 'Distance from Sun', value: '2.87 billion km', comparison: 'Light takes over 2.5 hours to reach it from the Sun' },
            { label: 'Year length', value: '84 Earth years', comparison: 'Most people will never live to see Uranus complete a full orbit' },
            { label: 'Surface temp', value: '-224°C', comparison: 'The coldest planetary temperature in the solar system' },
            { label: 'Image', value: 'January 24, 1986', comparison: 'Uranus in true colour, as captured by Voyager 2. Its pale, muted appearance is due to a shroud of haze above its clouds.' },
        ],
        facts: [
            'It rotates on its side: Uranus has a radical axial tilt of 98 degrees, meaning it literally rolls around the Sun on its side like a bowling ball. Scientists believe a colossal collision with an Earth-sized protoplanet billions of years ago knocked it over.',
            'It has vertical rings: Because the entire planet is tilted on its side, Uranus\'s system of 13 faint, dark rings orbits vertically relative to the rest of the solar system, making the planet look like a giant cosmic bullseye.',
            'It is the coldest planet: Even though Neptune is farther from the Sun, Uranus holds the record for the lowest temperature recorded on a planet, dropping to a freezing minus 224 degrees Celsius. It radiates almost no heat into space from its interior.',
            'It smells like rotten eggs: The upper atmosphere of Uranus is highly concentrated with hydrogen sulfide gas. This is the exact same chemical compound responsible for the foul stench of flatulence and decaying eggs.'
        ]
    },
    neptune: {
        image: "images/neptune_banner.jpg",
        description: 'Neptune is the windiest place in the solar system, with storms reaching 2,100 km/h. So far from the Sun that it took 165 years after its discovery to complete just one orbit, it was the first planet found through mathematical prediction rather than observation.',
        stats: [
            { label: 'Diameter', value: '49,244 km', comparison: 'Nearly four times wider than Earth' },
            { label: 'Distance from Sun', value: '4.5 billion km', comparison: 'Light takes over 4 hours to make the journey from the Sun' },
            { label: 'Year length', value: '165 Earth years', comparison: 'Neptune completed its first full orbit since discovery in 2011' },
            { label: 'Wind speed', value: '2,100 km/h', comparison: 'Six times faster than the strongest hurricanes on Earth' },
            { label: 'Image', value: 'October 30, 1998', comparison: 'This picture of Neptune was produced from the last whole planet images taken through the green and orange filters on NASA\'s Voyager 2 narrow angle camera. The images were taken at a range of 7.1 million miles from the planet, 4 days and 20 hours before closest approach.' },
        ],
        facts: [
            'It experiences supersonic winds: Neptune has the most violent weather in the solar system, with winds that can reach speeds of up to 2,100 kilometers per hour. These freezing gales move faster than the speed of sound, easily outstripping the power of Earth\'s strongest hurricanes.',
            'It has a backward-orbiting moon: Neptune\'s largest moon, Triton, is the only major moon in the solar system that orbits in the opposite direction of its planet\'s rotation. This unique path proves that Triton did not form around Neptune, but was instead a dwarf planet captured by its gravity.',
            'It radiates more heat than it receives: Because Neptune is so far from the Sun, it gets very little solar energy. However, its interior is intensely hot, and the planet actually radiates more than twice the amount of heat energy into space than it absorbs from sunlight.',
            'It rains diamonds: Deep inside Neptune\'s atmosphere, intense atmospheric pressure and extreme heat split methane molecules into pure carbon. The carbon atoms compress into solid diamonds, which then slowly sink through the mantle like sparkling hailstones.'
        ]
    },
    sun: {
        image: 'images/sun_banner.jpg',
        description: 'The Sun is the star at the heart of our solar system, accounting for 99.86% of all its mass. It has been burning for 4.6 billion years and has enough fuel left to last another 5 billion — at which point it will expand into a red giant and swallow the inner planets.',
        stats: [
            { label: 'Diameter', value: '1.39 million km', comparison: '109 Earths lined up would stretch across it' },
            { label: 'Distance from Earth', value: '149.6 million km', comparison: 'A plane would take 17 years to fly there non-stop' },
            { label: 'Surface temp', value: '5,500°C', comparison: 'Hot enough to vaporise any known material instantly' },
            { label: 'Age', value: '4.6 billion years', comparison: 'If Earth\'s history were a calendar year, humans appear in the last 10 minutes' },
            { label: 'Image', value: 'June 20, 2013, at 11:15 p.m', comparison: 'EDT shows the bright light of a solar flare on the left side of the sun and an eruption of solar material shooting through the sun’s atmosphere, called a prominence eruption. Shortly thereafter, this same region of the sun sent a coronal mass ejection out into space.' },
        ],
        facts: [
            'It makes up almost everything: The Sun contains roughly 99.86 percent of all the matter in the entire solar system. Its gravitational pull is so immense that it completely controls every single planet, asteroid, and piece of dust orbiting around it.',
            'It converts mass directly into light: Every second, the Sun fuses roughly 600 million tonnes of hydrogen into helium. In this process, about 4 million tonnes of matter are converted directly into pure energy, generating the intense light and heat that powers our solar system.',
            'It possesses a twisted magnetic field: Every 11 years, the Sun\'s magnetic field completely flips upside down, meaning the north and south poles switch places. This cycle triggers massive solar flares and sunspots that can disrupt satellite communications back on Earth.',
            'It travels in a massive cosmic orbit: Just like Earth orbits the Sun, the Sun orbits the center of the Milky Way galaxy. It travels at a staggering speed of 720,000 kilometers per hour, but the galaxy is so vast that it still takes about 230 million years to complete one full loop.'
        ]
    },
    pluto: {
        image: 'images/pluto_banner.jpg',
        description: 'Once considered the ninth planet, Pluto was reclassified as a dwarf planet in 2006 — a decision that still sparks debate. It\'s a surprisingly complex world with mountains of water ice, a heart-shaped nitrogen plain, and a thin atmosphere that freezes and falls as snow.',
        stats: [
            { label: 'Diameter', value: '2,377 km', comparison: 'You could fit Pluto inside Australia with room to spare' },
            { label: 'Distance from Sun', value: '5.9 billion km', comparison: 'Light takes over 5 hours to reach it from the Sun' },
            { label: 'Year length', value: '248 Earth years', comparison: 'Pluto hasn\'t completed a single orbit since it was discovered in 1930' },
            { label: 'Surface temp', value: '-230°C', comparison: 'Just 43 degrees above absolute zero — the coldest possible temperature' },
            { label: 'Image', value: 'July 13, 2015', comparison: 'Pluto nearly fills the frame in this image from NASA\'s New Horizons spacecraft, when the spacecraft was 768,000 kilometers from the surface. This is the last and most detailed image sent to Earth before the spacecraft\'s closest approach to Pluto on July 14. ' },
        ],
        facts: [
            'It was discovered by an amateur: Pluto was found in 1930 by Clyde Tombaugh, a 24-year-old self-taught astronomer who spent nights photographing the night sky and days manually comparing the images for moving objects.',
            'It has a giant frozen heart: The most prominent feature on Pluto\'s surface is a massive, bright region shaped exactly like a heart. Known as Tombaugh Regio, this feature is a colossal plain made of churning nitrogen and carbon monoxide ice.',
            'It shares an orbit with its moon: Pluto\'s largest moon, Charon, is so massive compared to Pluto that the two objects actually orbit around a point in empty space located between them, making them function like a double dwarf planet system.',
            'It has a chaotic orbit: Unlike the eight major planets which orbit the Sun in near-perfect, flat circles, Pluto has a highly tilted, oval-shaped orbit. For 20 years out of its 248-year journey, its path actually crosses inside Neptune\'s orbit, making Neptune farther from the Sun than Pluto during those times.'
        ]
    },
}