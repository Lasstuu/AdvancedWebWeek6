const form = document.getElementById("offerForm");


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
        // headers: {
        //     "Content-Type": "application/json"
        // },
        // body: JSON.stringify({
        //     title: titleInput,
        //     description: descriptionInput,
        //     price: priceInput,
        //     image: imageInput
        // })
    })
    const messageText = await data.json()
    }catch(error){
        console.log(error)
    }

})