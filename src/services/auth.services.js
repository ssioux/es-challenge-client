import service from "./config.services";

const singupService = (newUser) => {
  return service.post("/auth/signup", newUser);
};

const loginService = (userInfo) => {
  return service.post("/auth/login", userInfo);
};

const verifyService = () => {
  return service.get("/auth/verify");
};

export { singupService, loginService, verifyService };
