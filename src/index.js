const addBtn = document.querySelector('#new-toy-btn')
const toyFormCont = document.querySelector('.container')
const toyForm = toyFormCont.querySelector("form");
let addToy = false
const toysColl = document.querySelector("#toy-collection");

fetch("http://localhost:3000/toys")
.then(res => res.json())
.then(toys => {
  toys.forEach(makeToyDiv)
});

function makeToyDiv(toy) {

  let toyDiv = document.createElement("div");
  toyDiv.className = "card";
  toyDiv.id = `toy-${toy.id}`;

  let toyDivHeader = document.createElement("h2");
  toyDivHeader.innerText = `${toy.name}`;

  let toyDivImg = document.createElement("img");
  toyDivImg.src = `${toy.image}`;

  let toyDivP = document.createElement("p");
  toyDivP.innerText = " likes";

  let toyDivPSpan = document.createElement("span");
  toyDivPSpan.dataset.toySpanId = toy.id
  toyDivPSpan.innerText = `${toy.likes ? toy.likes : "0"}`;
  toyDivP.prepend(toyDivPSpan);

  let toyDivButton = document.createElement("button");
  toyDivButton.innerText = "Like <3";
  toyDivButton.classList.add("like-btn")
  toyDivButton.dataset.toyButtonId = toy.id

  toyDiv.append(toyDivHeader, toyDivImg, toyDivP, toyDivButton);
  toysColl.append(toyDiv);

};

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyFormCont.style.display = 'block'
  } else {
    toyFormCont.style.display = 'none'
  }
})

toyForm.addEventListener("submit", function(e) {
  e.preventDefault();
  let nameInput = e.target.name;
  let nameValue = nameInput.value;
  let imageInput = e.target.image;
  let imageValue = imageInput.value;

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": nameValue,
      "image": imageValue,
      "likes": "0"
    })
  }).then(res => res.json())
  .then(makeToyDiv)
});

toysColl.addEventListener("click", function(e) {
  if (e.target.classList.contains("like-btn")) {
    let toyId = e.target.dataset.toyButtonId;
    let likeCountContainer = document.querySelector(`[data-toy-span-id="${toyId}"]`);
    let likeCount = parseInt(likeCountContainer.innerText);
    likeCount++;

    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": likeCount
      })
    }).then(res => res.json())
      .then(updatedToy => {likeCountContainer.innerText = updatedToy.likes});
  };
});
