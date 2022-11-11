import service from "./config.services";

// http://localhost:5005/api baseUrl

const listTourneys = () => {
    return service.get("/tourney/list")
}
const createTourney = () => {
    return service.post("/tourney/create")
}
const detailsTourney = (tourneyId) => {
     return service.get(`/tourney/${tourneyId}/details`)
}
const updateTourney = (tourneyId, tourneyUpdate) => {
    return service.patch(`/tourney/${tourneyId}/edit`)
}
const deleteTourney = (tourneyId) => {
    return service.delete(`/tourney/${tourneyId}/delete`)
}


export{
    listTourneys,
    createTourney,
    updateTourney,
    deleteTourney,
    detailsTourney
}