/* Desenvolva sua lógica aqui */


import {insertedValues,valuesCategory} from "./valuesData.js"

let insertedValuesFiltered = [];

const sumAll = (array) =>{
	
	const resultSum = document.querySelector(".result-sun > span")
	
	let options = {
		minimumFractionDigits: 2,
		maximumFractionDigits: 4
	};
	
	const totalValue = array.reduce((acc, element) => {
		return acc = acc + element
	}, 0)
	
	resultSum.innerText = totalValue.toLocaleString(undefined,options)
	
}

sumAll(insertedValuesFiltered)






const insert = (array) =>{
	const buttonSend = document.querySelector(".button__insert")
	
	buttonSend.addEventListener("click", (event) =>{
		event.preventDefault();
		
		let object = {	}
		
		const inputValue = document.querySelector(".input__value");
		const inputRadio = document.querySelector("input[type='radio']:checked");
		
		if (inputValue.value === "") {
			alert("Por favor, preencha o campo de valor.");
			
		}else{
			object.id = array.length + 1
			object.value = parseFloat(inputValue.value)
			object.categoryID = inputRadio.value
			
			array.push(object)
			
			inputValue.value = ""

			renderCards(array)
			
		}
	})
}

insert(insertedValues)


const renderCards =(array) =>{
	
	const mainList = document.querySelector(".container-card")
	
	mainList.innerHTML = ""
	
	array.forEach(element => {
		
		const card = createCard(element)
		
		mainList.appendChild(card)
		
		
		
	});
	sumAll(insertedValuesFiltered)
	
	filteredValues()
}




function createCard(element){
	
	const card = document.createElement("li")
	const cardValue = document.createElement("p") 
	const boxDiv = document.createElement("div")
	const cardType = document.createElement("span")
	const imgTrash = document.createElement("img")
	
	let Category = element.categoryID
	
	card.classList.add("card")
	cardValue.classList.add("card__value")
	cardType.classList.add("card__type")
	imgTrash.classList.add("trash_button")
	imgTrash.src = "src/assets/trash.svg"
	
	cardValue.innerText =`R$ ${parseFloat(element.value).toFixed(2) }`
	imgTrash.dataset.cardId = element.id
	cardType.innerText = valuesCategory[Category]
	
	boxDiv.append(cardType,imgTrash)
	card.append(cardValue,boxDiv )
	
	return card
	
}	


const filteredValues = () =>{
	
	const buttonsFilters = document.querySelectorAll(".nav-bar__button")
	
	buttonsFilters.forEach(button => {
		
		button.addEventListener("click", (event)=>{
			
			let option = event.target.value
			
			const filteredElements = insertedValues.filter((element) => {
				
				
				if(option === "all"){
					
					// console.log(option)
					// console.log(element.categoryID)
					return insertedValues
					
				}else if(element.categoryID == Number(option)){
					// console.log(option)
					// console.log(element.categoryID)
					
					return element
				}
			})
			
			insertedValuesFiltered = []
			
			filteredElements.forEach(element => {
				
				insertedValuesFiltered.push(element.value)
				sumAll(insertedValuesFiltered)
				
			});
			
			renderCards(filteredElements)
			deleteCards(filteredElements)
			
		})
	});
}



const deleteCards = (array) => {
	
	const buttons = document.querySelectorAll(".trash_button")
	
	buttons.forEach(button => {
		
		button.addEventListener("click", (event) => {
			
			const buttonId = event.target.dataset.cardId
			
			
			const index = array.findIndex(card =>{
				return card.id === Number(buttonId)
			})
			array.splice(index,1)
			console.log(array)
			
			renderCards(array)
			sumAll(array)
			
		})
	})
}






