

let jsonifyTheResponse = res => res.json()
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let toyCollectionDiv = document.querySelector("#toy-collection")
let newToyForm = document.querySelector(".add-toy-form")



fetch("http://localhost:3000/toys")
  .then(jsonifyTheResponse)
  .then(toyArray => {
    toyArray.forEach(function(item){makeJSONIntoDiv(item)})
 
  })

newToyForm.addEventListener("submit", function(e){
  e.preventDefault()
  let form = e.target;
  let inputName = form.name.value
  let inputImg = form.image.value

  let data = {
    name: inputName,
    image: inputImg,
    likes: 0
  }

  
  fetch("http://localhost:3000/toys", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      'Content-Type': "application/json"
    }
  })
  .then(jsonifyTheResponse)
  .then((item) => {
      makeJSONIntoDiv(item)
  })

})


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

toyCollectionDiv.addEventListener("click", function(e){
    if(e.target.className === "likebtn")
    {
   
      //get the data
      let newLikes =  parseInt(((e.target.previousElementSibling.innerText).split(" "))[0]) + 1
      fetch(`https://localhost:3000/toys/${e.target.id}`, 
      
      {
            method: "PATCH",
            body: JSON.stringify({
              "likes": newLikes
            }),
            headers: {
              "Content-Type": "application/json"
            }
      })

      e.target.previousElementSibling.innerText = `${newLikes} likes`

    }
})


function makeJSONIntoDiv(item){

    toyCollectionDiv.innerHTML += 
    `<div class = "card">
      <h2>${item.name}</h2>
      <img src="${item.image}" class="toy-avatar">
      <p>${item.likes} likes</p>
      <button id="${item.id}" class="likebtn">Like <3</button>
    </div>`

}

