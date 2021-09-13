import http from "../http-common";

class MealDataService {
  getAllMeals() {
    return http.get("/menuitems");
  }

  getMeal(id) {
    return http.get(`/menuitems/${id}`);
  }

  updateMeal(data) {
    return http.put(`/menuitems/${data._id}`, data);
  }
}

export default new MealDataService();