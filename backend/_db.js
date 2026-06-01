let games = [
    { id: '1', title: "Baldur's Gate 3", platform: ["PC", "Xbox", "PS5"], status: "Playing", genre: "RPG" },
    { id: '2', title: "Dispatch", platform: ["PC", "PS5", "Xbox"], status: "Completed", genre: "Action" },
    { id: '3', title: "Elden Ring", platform: ["PS5", "Xbox", "PC"], status: "Not Started", genre: "RPG" },
    { id: '4', title: "Mario Kart", platform: ["Switch"], status: "Playing", genre: "Racing" },
    { id: '5', title: "Pokemon Scarlet", platform: ["PS5", "Xbox", "PC"], status: "Not Started", genre: "RPG" },
    { id: '6', title: "Cyberpunk 2077", platform: ["PC", "PS5", "Xbox"], status: "Completed", genre: "RPG" },
]

let authors = [
    { id: '1', name: 'mario', verified: true },
    { id: '2', name: 'yoshi', verified: false },
    { id: '3', name: 'peach', verified: true },
    { id: '4', name: 'conny', verified: false },
]

let reviews = [
    { id: '1', rating: 9, content: 'lorem ipsum', author_id: '1', game_id: '2' },
    { id: '2', rating: 10, content: 'lorem ipsum', author_id: '2', game_id: '1' },
    { id: '3', rating: 7, content: 'lorem ipsum', author_id: '3', game_id: '3' },
    { id: '4', rating: 5, content: 'lorem ipsum', author_id: '2', game_id: '4' },
    { id: '5', rating: 8, content: 'lorem ipsum', author_id: '2', game_id: '5' },
    { id: '6', rating: 7, content: 'lorem ipsum', author_id: '1', game_id: '2' },
    { id: '7', rating: 10, content: 'lorem ipsum', author_id: '3', game_id: '6' },
]

export default { games, authors, reviews }