import http from "../http-common";

class CodeDataService {
  getAllCodes() {
    return http.get("/account");
  }

  getCodes() {
    return http.get(`/codes`);
  }

  get(id) {
    return http.get(`/codes/${id}`);
  }

  update(data) {
    return http.put(`/codes/${data._id}`, data);
  }

  delete(id) {
    return http.delete(`/codes/${id}`);
  }
}

export default new CodeDataService();