import { DataResource } from '../services/DataResource.js'

export interface PizzaProps {
	title: string
	description: string
	toppings: string[]
	price: number
	id?: string
}

export const Pizza = new DataResource<PizzaProps>(
	'http://192.168.1.68:4000/pizzas'
)

console.log('Pizza:', Pizza)
