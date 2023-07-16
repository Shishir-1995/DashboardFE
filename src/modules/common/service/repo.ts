import httpClient from "utils/http-client/http-client";

class CommonRepoImp {
  public async integrateZoom() {
<<<<<<< HEAD
    window.open("");
=======
    window.open("http://localhost:8081/zoom/authentication")
>>>>>>> 1a24b8c5430191b1338bcebf304a14915b4d13a0
  }

  public async integrateGoogle() {
    window.open("http://localhost:8081/google/login");
  }
}
export const commonRepo = new CommonRepoImp();
