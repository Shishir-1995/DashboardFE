import httpClient from "utils/http-client/http-client";

class CommonRepoImp {
  public async integrateZoom() {
    await httpClient.get("/zoom/authentication");
  }

  public async integrateGoogle() {
    await httpClient.get("/google/login");
  }
}
export const commonRepo = new CommonRepoImp();
