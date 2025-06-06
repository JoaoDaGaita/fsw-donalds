"use server"

import { db } from "@/lib/prisma"
import type { ConsumptionMethod } from "@prisma/client"
import { removeCpfPunctuation } from "../helpers/cpf"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

interface CreateOrderProps {
	customerName: string
	customerCpf: string
	products: Array<{
		id: string
		quantity: number
	}>
	consumptionMethod: ConsumptionMethod
	slug: string
}

export const createOrder = async (input: CreateOrderProps) => {
	const restaurant = await db.restaurant.findUnique({
		where: {
			slug: input.slug,
		},
	})

	if (!restaurant) {
		throw new Error("Restaurant not found")
	}

	const productsWithPrices = await db.product.findMany({
		where: {
			id: {
				in: input.products.map((product) => product.id),
			},
		},
		select: {
			id: true,
			price: true,
		},
	})

	const productsWithPricesAndQuantities = input.products.map((product) => ({
		productId: product.id,
		quantity: product.quantity,
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		price: productsWithPrices.find((p) => p.id === product.id)!.price,
	}))

	await db.order.create({
		data: {
			status: "PENDING",
			customerName: input.customerName,
			customerCpf: removeCpfPunctuation(input.customerCpf),
			orderProducts: {
				createMany: {
					data: productsWithPricesAndQuantities,
				},
			},
			total: productsWithPricesAndQuantities.reduce(
				(acc, product) => acc + product.price * product.quantity,
				0
			),
			consumptionMethod: input.consumptionMethod,
			restaurantId: restaurant.id,
		},
	})

	revalidatePath(`/${input.slug}/orders`)

	redirect(
		`/${input.slug}/orders?cpf=${removeCpfPunctuation(input.customerCpf)}`
	)
}
