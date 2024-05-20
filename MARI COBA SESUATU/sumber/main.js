
const toggleBtn = document.querySelector(".sidebar-toggle")
const closeBtn = document.querySelector(".close-btn")
const sidebar = document.querySelector(".sidebar")

toggleBtn.addEventListener("click", function () {
    sidebar.classList.toggle("show-sidebar")
})

closeBtn.addEventListener("click", function () {
    sidebar.classList.remove("show-sidebar")
})

let shop = document.getElementById("shop")
let product = document.getElementById("product")
let basket = JSON.parse(localStorage.getItem("data")) || []

const initSlider = () =>{
    const imageList = document.querySelector(".promo-slide .promo-img")
    const slideButtons = document.querySelectorAll(".promo-slide .promo-button")

    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1
            const scrollAmount = imageList.clientWidth * direction
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" })
        })
    })
}
window.addEventListener("load", initSlider)

let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map((x) => {
        let { id, name, price, desc, img } = x
        let search = basket.find((x) => x.id === id) || []
        return `
        <h2 class="menu-title">Menu</h2>
        <div id="product-id-${id}" class="item">
            <img width="220" src="${img}" alt="">
            <div class="details">
             <h3>${name}</h3>
             <p>${desc}</p>
             <div class="price-quantity">
              <h2>$ ${price}</h2>
              <button id="eye" <i class="bi bi-eye-fill"></i></button>
              <div class="buttons">
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">
                ${search.item === undefined ? 0 : search.item}
                </div>
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
              </div>
             </div>
            </div>
        </div>`
    }).join(""))
}
generateShop()

let increment = (id) => {
    let selectedItem = id
    let search = basket.find((x) => x.id === selectedItem.id)

    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1
        })
    } else {
        search.item += 1
    }
    update(selectedItem.id)
    localStorage.setItem("data", JSON.stringify(basket))
}

let decrement = (id) => {
    let selectedItem = id
    let search = basket.find((x) => x.id === selectedItem.id)

    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1
    }

    update(selectedItem.id)
    basket = basket.filter((x) => x.item !== 0)
    localStorage.setItem("data", JSON.stringify(basket))
}

let update = (id) => {
    let search = basket.find((x) => x.id === id)
    console.log(search.item)
    document.getElementById(id).innerHTML = search.item
}

let generateProduct = () => {
    return (product.innerHTML = productItemsData.map((x) => {
        let { id, name, price, desc, img } = x
        let search = basket.find((x) => x.id === id) || []
        return `
        <h2 class="product-title">Produk unggulan <span>Kami</span></h2>
            <div id="product-card-${id}" class="card">
                <img width="220" src="${img}" alt="">               
                <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="price-quantity">
                <h2>$ ${price}</h2>
                    <button></button>
                    <div class="buttons">
                     <i onclick="decrement1(${id})" class="bi bi-dash-lg"></i>
                     <div id=${id} class="quantity">
                     ${search.card === undefined ? 0 : search.card}
                     </div>
                     <i onclick="increment1(${id})" class="bi bi-plus-lg"></i> 
                    </div>
                   </div>
                </div>
            </div>`
    }).join(""))
}
generateProduct()

let increment1 = (id) => {
    let selectedCard = id
    let search = basket.find((x) => x.id === selectedCard.id)

    if (search === undefined) {
        basket.push({
            id: selectedCard.id,
            card: 1
        })
    } else {
        search.card += 1
    }
    update1(selectedCard.id)
    localStorage.setItem("data", JSON.stringify(basket))
}

let decrement1 = (id) => {
    let selectedCard = id
    let search = basket.find((x) => x.id === selectedCard.id)

    if (search === undefined) return;
    else if (search.card === 0) return;
    else {
        search.card -= 1
    }

    update1(selectedCard.id)
    basket = basket.filter((x) => x.card !== 0)
    localStorage.setItem("data", JSON.stringify(basket))
}

let update1 = (id) => {
    let search = basket.find((x) => x.id === id)
    console.log(search.card)
    document.getElementById(id).innerHTML = search.card
}

