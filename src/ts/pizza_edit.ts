import { Pizza, type PizzaProps } from './models/Pizza.js'

const form = document.querySelector('.edit') as HTMLFormElement

const titleInput = form.querySelector(
    'input[name="title"]'
) as HTMLInputElement

const descriptionInput = form.querySelector(
    'textarea[name="description"]'
) as HTMLTextAreaElement

const priceInput = form.querySelector(
    'input[name="price"]'
) as HTMLInputElement

document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')

    if (!id) {
        return
    }

    const pizza = await Pizza.loadOne(id)

    titleInput.value = pizza.title
    descriptionInput.value = pizza.description
    priceInput.value = pizza.price.toString()

    const toppingInputs = form.querySelectorAll<HTMLInputElement>(
        'input[name="toppings"]'
    )

    toppingInputs.forEach((input) => {
        input.checked = pizza.toppings.includes(input.value)
    })

    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        const data = new FormData(form)

        const updatedPizza: Partial<PizzaProps> = {
            title: data.get('title') as string,
            description: data.get('description') as string,
            toppings: data.getAll('toppings') as string[],
            price: parseInt(data.get('price') as string),
        }

        const res = await Pizza.update(id, updatedPizza)

        if (res.ok) {
            window.location.href = `pizza_detail.html?id=${id}`
        } else {
            console.log('Unable to update pizza')
        }
    })
})