import { DataResource } from '../services/DataResource.js'

export interface PizzaProps {
	title: string
	description: string
	toppings: string[]
	price: number
}

export const Pizza = new DataResource<PizzaProps>(
	'http://192.168.1.68:3000/pizzas'
)
