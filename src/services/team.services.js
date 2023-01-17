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

const addMemberTeamService = (teamId,pass) => {
    return service.patch(`/team/${teamId}/add-member`,pass)
}

const removeMemberTeamService = (teamId) => {
    return service.patch(`/team/${teamId}/remove-member`)
}

const findTeamUserService = () => {
    return service.get("/team/find-team-user")
}

const creatorTeamDeleteService = () => {
    return service.post("/team/own-team/delete")
}


export{
    listTeamsService,
    createTeamService,
    detailsTeamService,
    updateTeamService,
    deleteTeamService,
    findTeamCreatorService,
    addMemberTeamService,
    findTeamUserService,
    removeMemberTeamService,
    creatorTeamDeleteService
}