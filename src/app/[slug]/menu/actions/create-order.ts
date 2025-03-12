"use server"

import { db } from "@/lib/prisma"
import type { ConsumptionMethod } from "@prisma/client"

interface CreateOrderProps {
	customerName: string
	customerCpf: string
	products: Array<{
		id: string
		quantity: number
	}>
	consumptionMethod: ConsumptionMethod
	restaurantId: string
}

export const createOrder = async (input: CreateOrderProps) => {
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
	await db.order.create({
		data: {
			consumptionMethod: input.consumptionMethod,
			status: "PENDING",
			customerName: input.customerName,
			customerCpf: input.customerCpf,
			restaurantId: input.restaurantId,
		},
	})
}
