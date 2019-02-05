document.addEventListener("DOMContentLoaded", function(){
	let pageCounter = 0;
	let div = document.querySelector("#create-monster")

	div.innerHTML = `<form id='create-form'>
	<input type = 'text' name = 'name' placeholder = 'name'>
	<input type = 'integer' name = 'age' placeholder = 'age'>
	<input type = 'text' name = 'description' placeholder = 'description'>
	<input type = 'submit' value = 'create'>
	</form> `

	let monsterCards = 'http://localhost:3000/monsters'
	let parent = document.querySelector("#monster-container")

	let form = document.querySelector("#create-form")

	let forwardButton = document.querySelector("#forward")
	let backButton = document.querySelector("#back")

fetch(monsterCards)
.then(res => res.json())
.then(data => {
	const firstFiftyMonsters= data.slice(0,50);
	parent.innerHTML = printFiftyMonsters(firstFiftyMonsters);
})

const printFiftyMonsters = (arrayOfMonsters) => {
	let giantString = "";

	arrayOfMonsters.forEach(monster => {
		let shortString=
		`<div>
		<h2> ${monster.name} </h2>
		<h4>${monster.age}</h4>
		<p>${monster.description}</p>
		</div>`

		giantString += shortString
	})
	return giantString;
}

form.addEventListener("submit",(event) => {
	event.preventDefault()
	console.log('I work')
	fetch("http://localhost:3000/monsters", {
		method: "POST",

		headers:{
			"Content-Type": "application/json"
		},

		body: JSON.stringify({
			"name": event.target.name.value,
			"age": event.target.age.value,
			"description": event.target.description.value
		 })
		})

	})




	const goingForward = (event) => {
		pageCounter += 1;
		const start = pageCounter*50;
		const end = start + 50;

		fetch(monsterCards)
		.then(res => res.json())
		.then(data => {
			const fiftyMonsters= data.slice(start,end);
			parent.innerHTML = printFiftyMonsters(fiftyMonsters);
		})
	}


	forwardButton.addEventListener('click', goingForward)

	const goingBackward = (event) => {
		pageCounter -= 1;
		const start = pageCounter*50;
		const end = start + 50;

		fetch(monsterCards)
		.then(res => res.json())
		.then(data => {
			const fiftyMonsters= data.slice(start,end);
			parent.innerHTML = printFiftyMonsters(fiftyMonsters);
		})
	}


	backButton.addEventListener('click', goingBackward)








})
