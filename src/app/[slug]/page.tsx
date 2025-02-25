import { db } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import dine_in from "@/../public/dine_in.svg"
import takeaway from "@/../public/takeaway.svg"
import ConsumptionMethodOption from "./components/consumption-method-option"

interface RestaurantPageProps {
	params: Promise<{ slug: string }>
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
	const { slug } = await params
	const restaurant = await db.restaurant.findUnique({
		where: {
			slug,
		},
	})

	if (!restaurant) {
		return notFound()
	}
	return (
		<div className="flex h-dvh flex-col items-center justify-center px-6 pt-24">
			{/* LOGO */}
			<div className="flex flex-col items-center gap-2">
				<Image
					src={restaurant.avatarImageUrl}
					alt={restaurant.name}
					width={82}
					height={82}
				/>
			</div>
			{/* BEM VINDO */}
			<div className="space-y-2 pt-24 text-center">
				<h3 className="text-2xl font-semibold">{restaurant.name}</h3>
				<p className="opacity-55">
					Escolha como prefere aproveitar sua refeição. Estamos aqui para
					oferecer praticidade e sabor em cada detalhe!
				</p>
			</div>
			<div className="pt-14 grid grid-cols-2 gap-4">
				<ConsumptionMethodOption
					imageSvg={dine_in}
					imageAlt="Para comer aqui"
					buttonText="Para comer aqui"
					option="DINE_IN"
					slug={slug}
				/>

				<ConsumptionMethodOption
					imageSvg={takeaway}
					imageAlt="Levar para comer"
					buttonText="Levar para comer"
					option="TAKEAWAY"
					slug={slug}
				/>
			</div>
		</div>
	)
}

export default RestaurantPage
