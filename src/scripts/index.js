/* Desenvolva sua lógica aqui */

import { closeModal, handleModal } from "./modal.js";
import {insertedValues,valuesCategory} from "./valuesData.js"

let insertedValuesFiltered = [];

const sumAll = (array) =>{
	
	const resultSum = document.querySelector(".result-sun > span")
	
	let options = {
		
		minimumFractionDigits: 2,
		maximumFractionDigits: 4
		
	};
	
	const totalValue = array.reduce((acc, element) => {
		return acc = acc + element.value
	}, 0)
	
	resultSum.innerText = totalValue.toLocaleString(undefined,options)
	
}

sumAll(insertedValuesFiltered)


const cardInicial = (title, text) =>{
	const modalController = document.querySelector(".modal__main")
	const resultSum = document.querySelector(".result-sun > span")
	const containerList = document.querySelector(".container-card")
		
	const boxNull = document.createElement("div")
	const tittleNull = document.createElement("h3")
	const textNull = document.createElement("p")
	
	boxNull.addEventListener("click", () =>{
		modalController.showModal()
		closeModal()
	})
	
	tittleNull.classList.add("null__title")
	textNull.classList.add("null__text")
	
	boxNull.append(tittleNull,textNull)
	
	tittleNull.innerText = title
	textNull.innerText = text
	
	
	if(parseInt(resultSum.innerText) === 0){
		containerList.appendChild(boxNull)
		boxNull.classList.remove("disable")
		boxNull.classList.add("container__null")
		
		
	}else{
		boxNull.classList.remove("container__null")
		boxNull.classList.add("disable")
	}	
}

cardInicial("Nenhum valor cadastrado","Registrar novo valor")


const insert = (array) =>{
	const buttonSend = document.querySelector(".button__insert")
	const modal = document.querySelector(".modal__main")
	
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
			sumAll(array)
			
			modal.close()
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
	
	deleteCards(insertedValues)
	
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


const filteredValues = (array) =>{
	
	const buttonsFilters = document.querySelectorAll(".nav-bar__button")
	
	buttonsFilters.forEach(button => {
		
		button.addEventListener("click", (event)=>{
			
			let option = event.target.value
			
			const filteredElements = array.filter((element) => {
				
				
				if(option === "all"){
					
					return array
					
				}else if(element.categoryID == Number(option)){
					
					return element
					
				}	
			})
			
			let title = ""	
			let text = ""
			
			if (option === "all" ){
				
				title = "Nenhum valor cadastrado"
				text = "Registrar novo valor"
				
			}else if( option == 0 ){
				
				title = "Sem nenhum valor na categoria Entrada"
				text = "Registrar novo valor"
				
			}else{
				
				title = "Sem nenhum valor na categoria Saída"
				text = "Registrar novo valor"
				
			}
			
			renderCards(filteredElements)
			sumAll(filteredElements)
			cardInicial(title,text)
		})
	});
}

filteredValues(insertedValues)


const deleteCards = (array) => {
	
	const buttons = document.querySelectorAll(".trash_button")
	
	buttons.forEach(button => {
		
		button.addEventListener("click", (event) => {
			
			cardInicial("Nenhum valor cadastrado","Registrar novo valor")
			const buttonId = event.target.dataset.cardId
			
			const index = array.findIndex(card =>{
				return card.id === Number(buttonId)
			})
			
			array.splice(index,1)
			
			filteredValues(array)
			sumAll(array)
			
			renderCards(array)
		})
	})
	
}

handleModal()
