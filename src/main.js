import api from "./api";
class App {
  constructor() {
    this.repositories = [];
    this.formElement = document.querySelector("#repo-form");
    this.listElement = document.querySelector("#repo-list");
    this.inputElement = document.querySelector("input[name=repository]");
    this.registraEventos();
  }
  registraEventos() {
    this.formElement.onsubmit = event => this.adicionaRepositorio(event);
  }
  setLoading(loading = true) {
    if (loading == true) {
      let loadingElement = document.createElement("span");
      loadingElement.setAttribute("id", "loading");
      loadingElement.appendChild(document.createTextNode("carregando"));
      this.formElement.appendChild(loadingElement);
    } else {
      document.querySelector("#loading").remove();
    }
  }
  async adicionaRepositorio(event) {
    event.preventDefault();
    const novoRepositorio = this.inputElement.value;

    if (novoRepositorio.lenght === 0) return;
    this.setLoading();
    try {
      const response = await api.get(`/repos/${novoRepositorio}`);
      //console.log(response.data);
      const {
        name,
        description,
        html_url,
        owner: { avatar_url }
      } = response.data;
      //desestruturação para coletar os atributos do response
      this.repositories.push({
        name,
        description,
        avatar_url,
        html_url
      });
      this.inputElement.value = "";
      this.render();
    } catch (err) {
      alert("o repositorio não existe");
    }
    this.setLoading(false);
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
