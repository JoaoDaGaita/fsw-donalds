"use client"

import { Button } from "@/components/ui/button"
import { FormatCurrency } from "@/helpers/format-currency"
import type { Prisma } from "@prisma/client"
import { ChefHatIcon, ChevronLeftIcon, ChevronsRightIcon } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface ProductDetailsProps {
	product: Prisma.ProductGetPayload<{
		include: { restaurant: { select: { avatarImageUrl: true; name: true } } }
	}>
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
	const [quantity, setQuantity] = useState<number>(0)

	const handleDecreaseQuantity = () => {
		setQuantity((prev) => {
			if (prev === 1) {
				return 1
			}
			return prev - 1
		})
	}

	const handleIncreaseQuantity = () => {
		setQuantity((prev) => prev + 1)
	}

	return (
		<div className="relative flex flex-col z-50 mt-[-1.5rem] rounded-t-3xl p-5 flex-auto">
			<div className="flex-auto">
				{/* RESTAURANTE */}
				<div className="flex items-center gap-1.5">
					<Image
						src={product.restaurant.avatarImageUrl}
						alt={product.restaurant.name}
						width={16}
						height={16}
						className="rounded-full"
					/>
					<p className="gap-1 text-xs text-muted-foreground">
						{product.restaurant.name}
					</p>
				</div>

				{/* NOME DO PRODUTO */}
				<h2 className="mt-1 text-xl font-semibold">{product.name}</h2>

				{/* PREÇO E QUANTIDADE */}

				<div className="flex items-center justify-between">
					<h3 className="text-xl font-semibold">
						{FormatCurrency(product.price)}
					</h3>

					<div className="flex items-center gap-3 text-center">
						<Button
							variant="outline"
							className="h-98 w-8 rounded-xl"
							onClick={handleDecreaseQuantity}
						>
							<ChevronLeftIcon />
						</Button>

						<p className="w-4">{quantity}</p>

						<Button
							variant="destructive"
							className="h-8 w-8 rounded-xl"
							onClick={handleIncreaseQuantity}
						>
							<ChevronsRightIcon />
						</Button>
					</div>
				</div>

				{/* SOBRE */}
				<div className="mt-6 space-y-3">
					<h4 className="font-semibold">Sobre</h4>
					<p className="text-sm text-muted-foreground">{product.description}</p>
				</div>

				{/* INGREDIENTES */}
				<div className="mt-6 space-y-3">
					<div className="flex items-center gap-1">
						<ChefHatIcon size={18} />
						<h4 className="font-semibold">Ingredientes</h4>
					</div>
					<p className="text-sm text-muted-foreground">{product.description}</p>
				</div>
			</div>
			<Button className="w-full mt-6 rounded-full">Adicionar à sacola</Button>
		</div>
	)
}

export default ProductDetails
