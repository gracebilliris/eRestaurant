import http from "../http-common";

class ReportDataService {
  getAll() {
    return http.get("/report/view");
  }

  get(date) {
    return http.get(`/report/my/${date}`);
  }
}

export default new ReportDataService();