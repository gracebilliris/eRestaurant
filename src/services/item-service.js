import http from "../http-common";

class ItemDataService {
  getLunch(type) {
    return http.get("/lunchmenu", type);
  }

  getDinnner(type) {
    return http.get("/dinnermenu", type);
  }
}

export default new ItemDataService();