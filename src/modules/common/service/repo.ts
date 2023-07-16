import httpClient from "utils/http-client/http-client";

class CommonRepoImp {
  public async integrateZoom() {
    window.open("");
  }

  public async integrateGoogle() {
    await httpClient.get("/google/login");
  }
}
export const commonRepo = new CommonRepoImp();
