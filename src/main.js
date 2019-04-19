class App {
  constructor() {
    this.repositories = [];
    this.formElement = document.querySelector("#repo-form");
    this.registraEventos();
  }
  registraEventos() {
    this.formElement.onsubmit = event => this.adicionaRepositorio(event);
  }
  adicionaRepositorio(event) {
    event.preventDefault();
    this.repositories.push({
      name: "RocketSeat",
      description: "Tira sua idéia do papel e crie sua startup.",
      avatar_url: "https://avatars0.githubusercontent.com/u/28929274?v=4",
      html_url: "http://github.com/rocketseat/"
    });
    console.log(this.repositories);
  }
}
new App();
