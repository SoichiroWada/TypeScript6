import { Pizza, type PizzaProps } from './models/Pizza.js'

const rootElement = document.querySelector('.root')!

function createPizzaTemplate(pizza: PizzaProps): string {
	return `
    <a href="pizza_detail.html?id=${pizza.id}" class="pizza-link">
		<div class="pizza">
			<h2>${pizza.title}...</h2>
			<p class="toppings">${pizza.toppings.join(', ')}</p>
			<p>${pizza.description}</p>
			<span>£${pizza.price}</span>
		</div>
	</a>
  `
}

function renderTemplates(templates: string[], parent: Element): void {
	const templateElement = document.createElement('template')

	for (const t of templates) {
		templateElement.innerHTML += t
	}

	parent.append(templateElement.content)
}

document.addEventListener('DOMContentLoaded', async () => {
	// load the pizza data
	const pizzas = await Pizza.loadAll()
	console.log("pizzas:",pizzas)
	// create template string for each pizza
	const pizzaTemplates = pizzas.map(createPizzaTemplate)
	console.log("pizzaTemplates:",pizzaTemplates)
	// render pizza templates to DOM
	renderTemplates(pizzaTemplates, rootElement)
})