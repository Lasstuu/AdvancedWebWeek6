const form = document.getElementById("offerForm");
const divListElement = document.getElementById("offersContainer")

form.addEventListener("submit", async function(event){
    event.preventDefault()
    const formData = new FormData(this)
    const titleInput = document.getElementById("title").value;
    const descriptionInput = document.getElementById("description").value
    const priceInput = document.getElementById("price").value
    const imageInput = document.getElementById("image").files[0]
    formData.append("title", titleInput)
    formData.append("description", descriptionInput)
    formData.append("price", priceInput)
    formData.append("image", imageInput)
    console.log(titleInput, descriptionInput, priceInput, imageInput);
    try{
    const data = await fetch("/upload",{
        method: "POST",
        body: formData
    })
    const messageText = await data.json()
    }catch(error){
        console.log(error)
    }
    fetchOffers()
})
document.addEventListener("DOMContentLoaded", fetchOffers())


async function fetchOffers(){
    divListElement.innerHTML = ""
    try{
        const listData = await fetch("/offers")
        console.log(listData, listData.status);
        
        if(listData.status === 205){
            console.log("no offers");    
        }else{
            const listDataJson = await listData.json()
            console.log(listDataJson[0].title);
            
            listDataJson.forEach(offer => {
                const listElement = document.createElement("div")
                listElement.className = "offerDiv col s12 m6 l4"
                const cardDiv = document.createElement("div")
                cardDiv.className = "card hoverable"
                const imageDiv = document.createElement("div")
                imageDiv.className = "card-image"
                const pElementDiv = document.createElement("div")
                pElementDiv.className = "card-content"
                const listTitle = document.createElement("span")
                listTitle.className = "card-title"
                const listDescription = document.createElement("p")
                const listPrice = document.createElement("p")
                const listImage = document.createElement("img")
                listImage.className = "responsive-img"
                listTitle.textContent = offer.title
                listDescription.textContent = offer.description
                listPrice.textContent = offer.price
                listImage.src = `http://localhost:3000/${offer.imagePath}`
                imageDiv.appendChild(listImage)
                imageDiv.appendChild(listTitle)
                pElementDiv.appendChild(listDescription)
                pElementDiv.appendChild(listPrice)
                cardDiv.appendChild(imageDiv)
                cardDiv.appendChild(pElementDiv)
                listElement.appendChild(cardDiv)
                divListElement.appendChild(listElement)
            });
    }
    }catch(error){
        console.log(error)
    }
}