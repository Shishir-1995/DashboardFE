class CommonRepoImp {
  public async integrateZoom() {
    window.open("http://localhost:8081/zoom/authentication");
  }

  public async integrateGoogle() {
    window.open("http://localhost:8081/google/login");
  }
}
export const commonRepo = new CommonRepoImp();
