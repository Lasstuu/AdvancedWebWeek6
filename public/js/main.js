const form = document.getElementById("offerForm");


form.addEventListener("submit", async function(){
    event.preventDefault()
    const titleInput = document.getElementById("title").value;
    const descriptionInput = document.getElementById("description").value
    const priceInput = document.getElementById("price").value
    console.log(titleInput, descriptionInput, priceInput);
    const data = await fetch("/upload",{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: titleInput,
            description: descriptionInput,
            price: priceInput
        })
    })
    
})