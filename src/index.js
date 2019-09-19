const addBtn = document.querySelector('#new-toy-btn')
const formContainer = document.querySelector(".container")
const toyForm = document.querySelector('.add-toy-form')
const divToyCollection = document.querySelector("#toy-collection")


let addToy = false

// YOUR CODE HERE
let jsonifierTheResponse = res => res.json()

fetch("http://localhost:3000/toys")
.then(jsonifierTheResponse)
.then(function(toysArray){
  toysArray.forEach(makeToyDiv)
})

toyForm.addEventListener("submit",function(event){                     event.preventDefault()
  let nameValue = event.target.name.value
  let imgValue = event.target.image.value

   fetch("http://localhost:3000/toys", {
     method: "POST",
     headers: {"Content-Type": "application/json"},
     body: JSON.stringify({
       name: nameValue,
       image: imgValue,
     })
   })
   .then(jsonifierTheResponse)
   .then(makeToyDiv)
})

function makeToyDiv(toyItem){
  let div = document.createElement("div")
  div.className = "card"
  div.id = `${toyItem.id}`
    div.innerHTML += `<h2>${toyItem.name} </h2>
      <img src="${toyItem.image}"/>
      <p> <span>${toyItem.likes}</span> likes </p>
      <button class="like-btn"> Like </button>
    `
  divToyCollection.append(div)

}

divToyCollection.addEventListener("click", function(event){
  if (event.target.className === "like-btn"){
     let toyDiv = event.target.parentNode
     let toySpan = toyDiv.querySelector("span")
     let numLike = parseInt(toySpan.innerText)
     numLike += 1
     // console.log(toyDiv)
    fetch(`http://localhost:3000/toys/${toyDiv.id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        likes: numLike
      })
    })
    .then(jsonifierTheResponse)
    .then(function(object){
     toySpan.innerText = object.likes 
    })
  }
})

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    formContainer.style.display = 'block'
  } else {
    formContainer.style.display = 'none'
  }
})


// OR HERE!
