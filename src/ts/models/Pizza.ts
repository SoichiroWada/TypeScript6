import { DataResource } from '../services/DataResource.js'

export interface PizzaProps {
	title: string
	description: string
	toppings: string[]
	price: number
}

export const Pizza = new DataResource<PizzaProps>(
	'http://localhost:3000/pizzas'
)

// Pizza.save({
// 	title: 'my new pizza',
// 	description: 'yummy',
// 	toppings: ['mushrooms', 'peppers', 'olives'],
// 	price: 10,
// })