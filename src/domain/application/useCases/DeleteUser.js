export default class DeleteUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(id) {
    if (!id) {
      throw new Error("User ID é obrigatório");
    }

    return await this.userRepository.delete(id);
  }
}