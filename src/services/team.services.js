import service from "./config.services";

// http://localhost:5005/api baseUrl

const listTeamsService = () => {
    return service.get("/team/list")
}
const createTeamService = (teamToCreate) => {
    return service.post("/team/create",teamToCreate)
}
const detailsTeamService = (teamId) => {
     return service.get(`/team/${teamId}/details`)
}
const updateTeamService = (teamId, teamUpdate) => {
    return service.patch(`/team/${teamId}/edit`)
}
const deleteTeamService = (teamId) => {
    return service.delete(`/team/${teamId}/delete`)
}
const findTeamCreatorService = () => {
    return service.get("/team/find-creator")
}

const addMemberTeamService = (teamId) => {
    return service.patch(`/team/${teamId}/add-member`)
}

export{
    listTeamsService,
    createTeamService,
    detailsTeamService,
    updateTeamService,
    deleteTeamService,
    findTeamCreatorService,
    addMemberTeamService
}