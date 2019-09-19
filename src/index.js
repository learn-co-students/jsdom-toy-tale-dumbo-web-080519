const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyDiv = document.querySelector('#toy-collection')
let jsonifyTheResponse = (res => res.json())
let addToy = false
let toyId = 0
let toyLikes = 0

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


document.addEventListener("DOMContentLoaded", function(){

	

	fetch('http://localhost:3000/toys')
		.then(jsonifyTheResponse)
		.then(arrOfToys => {
			arrOfToys.forEach(function(toy){ makeToyIntoCard(toy) })
		})

})

function makeToyIntoCard(toy){
		toyDiv.innerHTML += 
		`<div class="card">
    		<h2>${toy.name}</h2>
    		<img src=${toy.image} class="toy-avatar" alt="image of ${toy.name}" />
    		<p class="likes">${toy.likes} Likes </p>
    		<button class="like-btn" id='${toy.id}'>Like <3</button>
  		</div>`
	}

toyForm.addEventListener("submit", function(evt){
	evt.preventDefault()
	let form = evt.target
	let inputName = form.name.value
	let inputImage = form.image.value

	let dataToSendBack = {
		name: inputName,
		image: inputImage,
		likes: 0
	}
	fetch('http://localhost:3000/toys', {
		method: "POST",
		body: JSON.stringify(dataToSendBack),
		headers: {
			"Content-Type": "application/json"
		}
	})
	.then(jsonifyTheResponse)
	.then((toy) => {
		makeToyIntoCard(toy)
	})

})

toyDiv.addEventListener("click", function(e){
  if (e.target.className === "like-btn") {
  	toyId = e.target.id
    if (toyId !== "0")
    	likesText = e.target.parentNode.querySelector("P").textContent
  		textArray = likesText.split(" ")
  		toyLikes = parseInt(textArray[0]) + 1 
    	addLike(toyLikes)
    	slapItOnTheDOM(toyLikes)
  }

  	function slapItOnTheDOM(likes){
		likesText = e.target.parentNode.querySelector("P")
		likesText.innerText = `${likes} Likes`

	}

})

function addLike(value){
	
	console.log(toyLikes)

	fetch(`http://localhost:3000/toys/${toyId}`, {
		method: "PATCH",
		body: JSON.stringify({
			"likes": (value)
		}),
		headers: {
  			"Content-Type": "application/json",
  			Accept: "application/json"
  		}	

  	})


	
}








