/* Desenvolva sua lógica aqui */
export const handleModal = () => {
	
	const buttons = document.querySelectorAll(".open__modal")
	const modalController = document.querySelector(".modal__main")
	
	buttons.forEach(button => {
		
		button.addEventListener("click", ()=>{
			
			modalController.classList.add("modalOpen")
			modalController.classList.remove("modalClose")

			modalController.showModal()
			
			closeModal()
			
		})
		
	});
	
} 

export const closeModal = () =>{
	
	const button = document.querySelector(".modal__close")
	const modal = document.querySelector(".modal__main")
	
	button.addEventListener("click", () =>{
		modal.close()
	})
}



