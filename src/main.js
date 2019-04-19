class App {
  constructor() {
    this.repositories = [];
    this.formElement = document.querySelector("#repo-form");
    this.listElement = document.querySelector("#repo-list");
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
    this.render();
  }
  render() {
    this.listElement.innerHTML = "";
    this.repositories.forEach(repo => {
      let imagemItem = document.createElement("img");
      imagemItem.setAttribute("src", repo.avatar_url);

      let nameItem = document.createElement("strong");
      nameItem.appendChild(document.createTextNode(repo.name));

      let descriptionItem = document.createElement("p");
      descriptionItem.appendChild(document.createTextNode(repo.description));

      let urlItem = document.createElement("a");
      urlItem.setAttribute("href", repo.html_url);
      urlItem.setAttribute("target", "_blank");
      urlItem.appendChild(document.createTextNode("Acessar"));

      let listItemElement = document.createElement("li");
      listItemElement.appendChild(imagemItem);
      listItemElement.appendChild(nameItem);
      listItemElement.appendChild(descriptionItem);
      listItemElement.appendChild(urlItem);

      this.listElement.appendChild(listItemElement);
    });
  }
}
new App();
