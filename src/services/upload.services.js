import service from "./config.services"

const uploadPictureService = (pictureFile) => {
 return service.post("/upload",pictureFile)
}
export {
    uploadPictureService
}