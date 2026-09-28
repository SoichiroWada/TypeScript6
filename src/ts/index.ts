import { Pizza } from "./models/Pizza.js"

document.addEventListener('DOMContentLoaded', async () => {
    //load the pizza data
    const pizzas = await Pizza.loadAll()

    console.log(pizzas)
})