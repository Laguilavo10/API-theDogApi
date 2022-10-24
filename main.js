const URL = 'https://api.thedogapi.com/v1/images/search'


bAleatorio.addEventListener('click', ()=>{
    
    fetch(URL)
        .then((res)=>res.json())
        .then((data)=>data[0].url)
        // .then((data)=>console.log(data))
        .then((img)=>{
            imgPerro.src = img
        })
})
