import service from "./config.services";

// http://localhost:5005/api baseUrl

const listUserService = () => {
    return service.get("/profile/user-list")
}


const detailsUserService = (userId) => {
     return service.get(`/profile/${userId}/details`)
}
const updateUserService = (userId, userUpdate) => {
    return service.patch(`/profile/${userId}/edit`,userUpdate)
}
const deleteUserService = (userId) => {
    return service.delete(`/profile/${userId}/delete`)
}


export{
    listUserService,
    detailsUserService,
    updateUserService,
    deleteUserService
}