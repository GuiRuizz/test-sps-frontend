import IAuthRepository from "../../domain/repositories/IAuthRepository";
import api from "../../services/api";

export default class AuthRepository extends IAuthRepository {
  async login(email, password) {
    const { data } = await api.post("/auth/login", { email, password });
    return data;
  }
}