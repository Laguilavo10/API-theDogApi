const $ = (etiqueta) => document.querySelector(etiqueta)

let botonAleatorio = $('#random-button')
let perro1 = $('#perro1')
let perro2 = $('#perro2')
let perro3 = $('#perro3')
let btnFav1 = Array.from(document.querySelectorAll('.perro-random1'))
let btnFav2 = Array.from(document.querySelectorAll('.perro-random2'))
let btnFav3 = Array.from(document.querySelectorAll('.perro-random3'))
let perrosFav = $('.perros-fav')

const API_URL_BASE = 'https://api.thedogapi.com/v1'
const API_KEY = 'api_key=live_JUdVCLuZgYC8IHc2WbwAA25MhERsutpTFGK5MCfP23Zk9xUNwf8Dk88vQDEI6DpI'



//usando fetch 

function perrosAleatorios() {
    fetch(`${API_URL_BASE}/images/search?limit=3`)
        .then((res)=>res.json())
        .then((data)=>{
            perro1.src = data[0].url
            perro2.src = data[1].url
            perro3.src = data[2].url
            
            perro1.alt = data[0].id
            perro2.alt = data[1].id
            perro3.alt = data[2].id
            
        })
}

async function agregarFavorito(id) {
    let info = await fetch(`${API_URL_BASE}/favourites?${API_KEY}`,
    {
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
             image_id: id 
        }),
    })
    renderFavoritos()
}

// }


function renderFavoritos() {
    perrosFav.innerHTML = ""
    fetch(`${API_URL_BASE}/favourites?${API_KEY}&limit=2&page=5`)
        .then((res)=>res.json())
        .then((data)=>{
            let arrayPerrosFav = []
            for (const iterator of data) {
                if (!iterator.image.url) {
                    console.log('')
                }else{
                    let img = document.createElement('img')
                    img.src = (iterator.image.url)
                    img.width = 200
                    arrayPerrosFav.push(img)
                }

            }
            perrosFav.append(...arrayPerrosFav)

        })
}
    
    
    

botonAleatorio.addEventListener('click', perrosAleatorios)
btnFav1[1].addEventListener('click', ()=>{
    agregarFavorito(btnFav1[0].alt)
})
btnFav2[1].addEventListener('click', ()=>{
    agregarFavorito(btnFav2[0].alt)
})
btnFav3[1].addEventListener('click', ()=>{
    agregarFavorito(btnFav3[0].alt)
})


perrosAleatorios()

renderFavoritos()

// async function ke() {
//     const res = await fetch(`${API_URL_BASE}/images/search?limit=3`)
//     console.log(res)
//     const data = await res.json()
//     console.log(data)

// }
// ke()
// agregarFavoritos()

const API_URL = ''

fetch(API_URL)
    .then((res)=>res.json())
    .then((data)=>console.log(data))