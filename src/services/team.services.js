import service from "./config.services";

// http://localhost:5005/api baseUrl

const listTeams = () => {
    return service.get("/team/list")
}
const createTeam = () => {
    return service.post("/team/create")
}
const detailsTeam = (teamId) => {
     return service.get(`/team/${teamId}/details`)
}
const updateTeam = (teamId, teamUpdate) => {
    return service.patch(`/team/${teamId}/edit`)
}
const deleteTeam = (teamId) => {
    return service.delete(`/team/${teamId}/delete`)
}


export{
    listTeams,
    createTeam,
    detailsTeam,
    updateTeam,
    deleteTeam
}