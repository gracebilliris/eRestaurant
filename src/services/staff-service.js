import http from "../http-common";

class StaffDataService {
  getAllStaff() {
    return http.get("/staffdetails");
  }

  getStaff(id) {
    return http.get(`/staffdetails/${id}`);
  }

  updateStaff(data) {
    return http.put(`/staffdetails/${data._id}`, data);
  }
}

export default new StaffDataService();