const $ = (etiqueta) => document.querySelector(etiqueta)

let botonAleatorio = $('#random-button')
let perro1 = $('#perro1')
let perro2 = $('#perro2')
let perro3 = $('#perro3')

const API_URL_BASE = 'https://api.thedogapi.com/v1'
const API_KEY = 'api_key=live_JUdVCLuZgYC8IHc2WbwAA25MhERsutpTFGK5MCfP23Zk9xUNwf8Dk88vQDEI6DpI'


function perrosAleatorios() {
    fetch(`${API_URL_BASE}/images/search?limit=3`)
        // .then((data)=>console.log(data))
        .then((res)=>res.json())
        .then((data)=>{
            perro1.src = data[0].url
            perro2.src = data[1].url
            perro3.src = data[2].url
        })
}

async function agregarFavoritos() {
    let info = await fetch(`${API_URL_BASE}/favourites?${API_KEY}`,
    {
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
             image_id: 'YmHQa7tTt' 
        }),

    })


}


// function renderFavoritos(params) {
//     fetch(`${API_URL_BASE}/favourites?${API_KEY}`)
//         .then((res)=>res.json())
//         .then((data)=>console.log(data))
// }
    
    
    

botonAleatorio.addEventListener('click', perrosAleatorios)

perrosAleatorios()
// renderFavoritos()


async function ke() {
    const res = await fetch(`${API_URL_BASE}/images/search?limit=3`)
    console.log(res)
    const data = await res.json()
    console.log(data)

}
ke()
// agregarFavoritos()

