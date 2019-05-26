export class AppConfig {
  static BASE_URL = "https://open-copyright-platform2.herokuapp.com";

  static get API_BASE_URL(): string {
    return `${this.BASE_URL}/api/v1`;
  }
}
