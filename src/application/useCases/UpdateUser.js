export default class UpdateUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(id, userData) {
    if (!id) {
      throw new Error("User ID é obrigatório");
    }

    if (!userData) {
      throw new Error("User data é obrigatório");
    }

    return await this.userRepository.update(id, userData);
  }
}