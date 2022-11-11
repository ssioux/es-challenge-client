import service from "./config.services";

// http://localhost:5005/api baseUrl

const listGames = () => {
    return service.get("/game/list")
}
const createGame = () => {
    return service.post("/game/create")
}
const detailsGame = (gameId) => {
     return service.get(`/game/${gameId}/details`)
}
const updateGame = (gameId, gameUpdate) => {
    return service.patch(`/game/${gameId}/edit`)
}
const deleteGame = (gameId) => {
    return service.delete(`/game/${gameId}/delete`)
}


export{
    listGames,
    createGame,
    detailsGame,
    updateGame,
    deleteGame

}