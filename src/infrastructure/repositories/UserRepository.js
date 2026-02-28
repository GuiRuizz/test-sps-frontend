import api from "../../services/api";

export default class UserRepository {
  async getAll() {
    const { data } = await api.get("/users");
    return data;
  }

  async getUserById(id) {

    const { data } = await api.get(`/users/${id}`);
    return data;
  }

  async create(user) {
    const { data } = await api.post("/users", user);
    return data;
  }

  async update(id, user) {
    const { data } = await api.put(`/users/${id}`, user);
    return data;
  }

  async delete(id) {
    await api.delete(`/users/${id}`);
  }
}