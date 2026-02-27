export default class User {
  constructor({ id, name, email, type }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.type = type;
  }

  isAdmin() {
    return this.type === "admin";
  }
}