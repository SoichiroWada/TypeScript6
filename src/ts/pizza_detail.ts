import { Pizza, type PizzaProps } from './models/Pizza.js'

const rootElement = document.querySelector('.root')!

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
      
      <div class="detail-actions">
        <button class="edit-btn">EDIT</button>
        <button class="delete-btn">DELETE</button>
      </div>
    </div>
  `
}

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search)
  const id = params.get('id')
  console.log("id:",id)

  if (!id) {
    rootElement.innerHTML = '<p>Pizza ID not found.</p>'
    return
  }

  const pizza = await Pizza.loadOne(id)
  rootElement.innerHTML = createPizzaTemplate(pizza)

  const editButton = document.querySelector('.edit-btn') as HTMLButtonElement
  const deleteButton = document.querySelector('.delete-btn') as HTMLButtonElement

  editButton.addEventListener('click', () => {
    window.location.href = `pizza_edit.html?id=${id}`
  })

  deleteButton.addEventListener('click', async () => {
    const confirmed = confirm(`Delete "${pizza.title}"?`)

    if (!confirmed) {
      return
    }

    const res = await Pizza.delete(id)

    if (res.ok) {
      window.location.href = '/'
    } else {
      console.log('Unable to delete pizza')
    }
  })
})
