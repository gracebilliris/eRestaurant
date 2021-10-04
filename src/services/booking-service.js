import http from "../http-common";

class BookingDataService {
  getAll() {
    return http.get("/booking/view");
  }

  getByUsername(username) {
    return http.post(`/booking/my/${username}`, username);
  }

  get(id) {
    return http.get(`/booking/my/${id}`);
  }

  create(data, username) {
    return http.post("/booking/create/" + username, data);
  }

  update(data) {
    return http.put(`/booking/my/${data._id}`, data);
  }

  delete(id) {
    return http.delete(`/booking/my/${id}`);
  }
}

export default new BookingDataService();