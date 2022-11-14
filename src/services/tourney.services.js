import service from "./config.services";

// http://localhost:5005/api baseUrl

const listTourneysService = () => {
    return service.get("/tourney/list")
}
const createTourneyService = (newTourney) => {
    return service.post("/tourney/create", newTourney)
}
const detailsTourneyService = (tourneyId) => {
     return service.get(`/tourney/${tourneyId}/details`)
}
const updateTourneyService = (tourneyId, tourneyUpdate) => {
    return service.patch(`/tourney/${tourneyId}/edit`)
}
const deleteTourneyService = (tourneyId) => {
    return service.delete(`/tourney/${tourneyId}/delete`)
}
const addTeamToTourneyService = (tourneyId) => {
    return service.patch(`/tourney/${tourneyId}/add-team`)
}


export{
    listTourneysService,
    createTourneyService,
    updateTourneyService,
    deleteTourneyService,
    detailsTourneyService,
    addTeamToTourneyService
}