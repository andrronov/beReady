import $api from "@/settings/axios.js";

export default class UserService {
  static fetchUsers() {
    return $api.get("/users");
  }
}
