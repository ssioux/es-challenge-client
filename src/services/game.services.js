import service from "./config.services";

// http://localhost:5005/api baseUrl

const listGamesService = () => {
    return service.get("/game/list")
}
const createGameService = (gameToAdd) => {
    return service.post("/game/create", gameToAdd)
}
const detailsGameService = (gameId) => {
     return service.get(`/game/${gameId}/details`)
}
const updateGameService = (gameId, gameUpdate) => {
    return service.patch(`/game/${gameId}/edit`)
}
const deleteGameService = (gameId) => {
    return service.delete(`/game/${gameId}/delete`)
}


export{
    listGamesService,
    createGameService,
    detailsGameService,
    updateGameService,
    deleteGameService

}