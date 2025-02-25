import { notFound } from "next/navigation"

import { db } from "@/lib/prisma"
import RestaurantHeader from "./components/Restaurantheader"

interface RestaurantMenuPageProps {
	params: Promise<{ slug: string }>
	searchParams: Promise<{ consumptionMethod: string }>
}

const isConsumptionMethodValid = (consumptionMethod: string) => {
	return ["TAKEAWAY", "DINE_IN"].includes(consumptionMethod.toUpperCase())
}

const RestaurantMenuPage = async ({
	params,
	searchParams,
}: RestaurantMenuPageProps) => {
	const { slug } = await params
	const { consumptionMethod } = await searchParams

	const restaurant = await db.restaurant.findUnique({ where: { slug } })

	if (!isConsumptionMethodValid(consumptionMethod)) {
		return notFound()
	}

	if (!restaurant) {
		return notFound()
	}
	return (
		<div>
			<RestaurantHeader restaurant={restaurant} />
		</div>
	)
}

export default RestaurantMenuPage
