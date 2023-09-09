 
        function fetchCharacterData(characterId) {
            const apiUrl = `https://swapi.dev/api/people/${characterId}/`;

            return fetch(apiUrl)
                .then(response => response.json())
                .then(characterData => {
                   
                    return fetch(characterData.homeworld)
                        .then(response => response.json())
                        .then(planetData => {
                            return {
                                name: characterData.name,
                                height: characterData.height,
                                hairColor: characterData.hair_color,
                                planet: {
                                    name: planetData.name,
                                    population: planetData.population,
                                },
                            };
                        });
                });
        }

         
        async function fetchCharacters() {
            const characterPromises = [];

            for (let i = 1; i <= 10; i++) {
                characterPromises.push(fetchCharacterData(i));
            }

            return Promise.all(characterPromises);
        }

         
        async function displayCharacters() {
            const characters = await fetchCharacters();
            const characterList = document.getElementById('characterList');

            characters.forEach(character => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${character.name}</td>
                    <td>${character.height}</td>
                    <td>${character.hairColor}</td>
                    <td>${character.planet.name}</td>
                    <td>${character.planet.population}</td>
                `;
                characterList.appendChild(row);
            });
        }

         
        displayCharacters().catch(error => {
            console.error('Error fetching or displaying data:', error);
        });