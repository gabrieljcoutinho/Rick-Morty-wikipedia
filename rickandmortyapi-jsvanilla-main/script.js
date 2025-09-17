let page = 1;

const modalImage = document.querySelector("#modal-image");
const modalName = document.querySelector("#modal-name");
const modalSpecies = document.querySelector("#modal-species");
const modalGender = document.querySelector("#modal-gender");
const modalOrigin = document.querySelector("#modal-origin");
const modalLocation = document.querySelector("#modal-location");
const modalStatus = document.querySelector("#modal-status");

async function getCharacters() {
  const resp = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}`
  );
  const data = await resp.json();

  if (resp.status == 404) {
    document.querySelector("#more").style.display = "none";
  }

  data.results.forEach((character) => {
    document.querySelector("#character-list").insertAdjacentHTML(
      "beforeend",
      `<div class="card">
            <img class="image-character" src=${
              character.image
            } alt=${`Imagem do ${character.name}`} />
            <div>
                <h2 class="name-character">${character.name}</h2>
                <p class="species-character">${character.species}</p>
                <h4>Gender</h4>
                <p class="species-character">${character.gender}</p>
                <h4>Origin</h4>
                <p class="species-origin">${character.origin.name}</p>
                <span class="character-id">${character.id}</span>
            </div>
        </div>
        `
    );
  });

  const cards = document.querySelectorAll(".card");
  const modal = document.querySelector("#modal-overlay");
  cards.forEach((card) => {
    card.addEventListener("click", async function (event) {
      const cardElement = event.path.filter((item) => item.className == "card");
      const idCard = cardElement[0].children[1].children[6].innerHTML;
      const resp = await fetch(
        `https://rickandmortyapi.com/api/character/${idCard}`
      );
      const data = await resp.json();

      modal.style.display = "flex";

      modalImage.setAttribute("src", data.image);
      modalName.innerText = data.name;
      modalSpecies.innerText = data.species;
      modalGender.innerText = data.gender;
      modalOrigin.innerText = data.origin.name;
      modalLocation.innerText = data.location.name;
      modalStatus.innerText = data.status;
    }); 
  });

  // Fechar modal

  window.addEventListener("click", function (event) {
    if (!event.target.classList.contains("modal-item")) {
      modal.style.display = "none";
    }
  });
}

getCharacters();

// Ver mais (Paginação)

function viewMore() {
  page++;
  getCharacters();
}

// Scroll infinito

window.addEventListener("scroll", function () {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 200) {
    viewMore();
  }
});
