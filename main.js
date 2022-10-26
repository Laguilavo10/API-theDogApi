const $ = (etiqueta) => document.querySelector(etiqueta)

let botonAleatorio = $('#random-button')
let perro1 = $('#perro1')
let perro2 = $('#perro2')
let perro3 = $('#perro3')
let btnFav1 = Array.from(document.querySelectorAll('.perro-random1'))
let btnFav2 = Array.from(document.querySelectorAll('.perro-random2'))
let btnFav3 = Array.from(document.querySelectorAll('.perro-random3'))
let perrosFav = $('.perros-fav-images')

const API_URL_BASE = 'https://api.thedogapi.com/v1'
const API_KEY = 'api_key=live_JUdVCLuZgYC8IHc2WbwAA25MhERsutpTFGK5MCfP23Zk9xUNwf8Dk88vQDEI6DpI'


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


function renderFavoritos() {
    perrosFav.innerHTML = ""
    let h2 = document.h2
    fetch(`${API_URL_BASE}/favourites?${API_KEY}`)
        .then((res)=>res.json())
        .then((data)=>{
            let arrayPerrosFav = []


            for (const iterator of data) {

                let div = document.createElement('div')
                let btn = document.createElement('button')
                let img = document.createElement('img')
                btn.innerText='sacar de favoritos'
                btn.onclick = ()=>eliminarFavorito(iterator.id)
                img.src = (iterator.image.url)
                img.width = 200
                div.append(img, btn)

                arrayPerrosFav.push(div)

            }
            
            perrosFav.append(...arrayPerrosFav)
        }
    )
}

async function eliminarFavorito(id){
    let a = await fetch(`${API_URL_BASE}/favourites/${id}?${API_KEY}`, {
        'method': 'DELETE'
    })

    renderFavoritos()

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
