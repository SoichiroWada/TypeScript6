import { Pizza, type PizzaProps } from './models/Pizza.js'

const rootElement = document.querySelector('.root')!

// function createPizzaTemplate(pizza: PizzaProps): string {
//     return `
//     <div class="pizza">
//       <h2>${pizza.title}</h2>
//       <p class="toppings">${pizza.toppings.join(', ')}</p>
//       <p>${pizza.description}</p>
//       <span>£${pizza.price}</span>
//     </div>
//   `
// }

function createPizzaTemplate(pizza: PizzaProps): string {
  return `
    <div class="pizza-detail">
      <h2>${pizza.title}</h2>

      <div class="detail-section">
        <h3>Toppings</h3>
        <p class="detail-toppings">${pizza.toppings.join(', ')}</p>
      </div>

      <div class="detail-section description-section">
        <h3>Description</h3>
        <p class="detail-description">${pizza.description}</p>
      </div>

      <div class="detail-section">
        <h3>Price</h3>
        <p class="detail-price">£${pizza.price}</p>
      </div>
    </div>
  `
}

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search)

  const id = params.get('id')

  if (!id) {
    rootElement.innerHTML = '<p>Pizza ID not found.</p>'
    return
  }

  const pizza = await Pizza.loadOne(id)

  rootElement.innerHTML = createPizzaTemplate(pizza)
})