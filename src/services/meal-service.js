import http from "../http-common";

class MealDataService {
  getAllMeals() {
    return http.get("/menuitems");
  }

  getAllLunchMeals() {
    return http.get("/lunchmenu");
  }

  getAllDinnerMeals() {
    return http.get("/dinnermenu");
  }

  getMeal(id) {
    return http.get(`/menuitems/${id}`);
  }

  updateMeal(data) {
    return http.put(`/menuitems/${data._id}`, data);
  }
}

export default new MealDataService();