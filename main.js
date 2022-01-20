console.log("connected");

const getAllBtn = document.querySelector("#all");
const charBtns = document.querySelectorAll(".char-btns");
const ageForm = document.querySelector("#age-form");
const ageInput = document.querySelector("#age-input");
const createForm = document.querySelector("#create-form");
const newFirstInput = document.querySelector("#first");
const newLastInput = document.querySelector("#last");
const newGenderDropDown = document.querySelector("select");
const newAgeInput = document.querySelector("#age");
const newLikesText = document.querySelector("textarea");
const charContainer = document.querySelector("section");

const baseURL = "http://localhost:4000";

function createCharacterCard(char) {
  let charCard = document.createElement("div");
  charCard.innerHTML = `<h3>${char.firstName} ${char.lastName}</h3>
  <p>gender: ${char.gender} | age: ${char.age}</p>
  <h4>Likes</h4>
  <ul>
    <li>${char.likes[0]}</li>
    <li>${char.likes[1]}</li>
    <li>${char.likes[2]}</li>
  </ul>`;

  charContainer.appendChild(charCard);
}

function clearCharacters() {
  charContainer.innerHTML = ``;
}

// GET ALL CHARACTERS
function getAllChars() {
  axios
    .get(baseURL + "/characters")
    .then((res) => {
      clearCharacters();
      res.data.forEach((charObj) => createCharacterCard(charObj));
    })
    .catch((err) => console.log(err));
}

getAllBtn.addEventListener("click", getAllChars);

const getOneChar = (evt) => {
  axios
    .get(baseURL + "/character/" + evt.target.getAttribute("id"))
    .then((res) => {
      clearCharacters();
      createCharacterCard(res.data);
    })
    .catch((error) => console.log(error));
};

charBtns.forEach((btn) => {
  btn.addEventListener("click", getOneChar);
});

const submitNewChar = (evt) => {
  evt.preventDefault();

  const body = {
    firstName: newFirstInput.value,
    lastName: newLastInput.value,
    gender: newGenderDropDown.value,
    age: newAgeInput.value,
    likes: newLikesText.value.split(","),
  };

  axios
    .post(baseURL + "/character", body)
    .then((res) => {
      clearCharacters();

      res.data.forEach((charObj) => createCharacterCard(charObj));
    })
    .catch((error) => console.log(error));
};

createForm.addEventListener("submit", submitNewChar);
