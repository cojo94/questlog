let games = [
    { id: '1', title: "Baldur's Gate 3", platform: ["PC", "Xbox", "PS5"], status: "Playing", genre: "RPG", personalRating: 9 },
    { id: '2', title: "Dispatch", platform: ["PC", "PS5", "Xbox"], status: "Completed", genre: "Action", personalRating: 8 },
    { id: '3', title: "Elden Ring", platform: ["PS5", "Xbox", "PC"], status: "Not Started", genre: "RPG", personalRating: 10 },
    { id: '4', title: "Mario Kart", platform: ["Switch"], status: "Playing", genre: "Racing", personalRating: 7 },
    { id: '5', title: "Pokemon Scarlet", platform: ["PS5", "Xbox", "PC"], status: "Not Started", genre: "RPG", personalRating: 6 },
    { id: '6', title: "Cyberpunk 2077", platform: ["PC", "PS5", "Xbox"], status: "Completed", genre: "RPG", personalRating: 9 },
]

let notes = [
    { id: '1', content: 'lorem ipsum', game_id: '2' },
    { id: '2', content: 'lorem ipsum', game_id: '1' },
    { id: '3', content: 'lorem ipsum', game_id: '3' },
    { id: '4', content: 'lorem ipsum', game_id: '4' },
    { id: '5', content: 'lorem ipsum', game_id: '5' },
    { id: '6', content: 'lorem ipsum', game_id: '2' },
    { id: '7', content: 'lorem ipsum', game_id: '6' },
]

export default { games, notes }