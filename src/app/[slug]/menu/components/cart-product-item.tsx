import Image from "next/image"
import { CartContext, type CartProduct } from "../contexts/cart"
import { FormatCurrency } from "@/helpers/format-currency"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react"
import { useContext } from "react"

interface CartProductItemProps {
	product: CartProduct
}

const CartProductItem = ({ product }: CartProductItemProps) => {
	const { decreaseProductQuantity, increaseProductQuantity } =
		useContext(CartContext)

	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-3">
				<div className="relative h-20 w-20 bg-gray-100">
					<Image src={product.imageUrl} alt={product.name} fill />
				</div>
				<div className="space-y-1">
					<p className="text-xs max-w-[90%] truncate text-ellipsis">
						{product.name}
					</p>
					<p className="text-sm font-semibold">
						{FormatCurrency(product.price)}
					</p>
					{/* QUANTIDADE */}
					<div className="flex items-center gap-1 text-center">
						<Button
							className="w-7 h-7 rounded-lg"
							variant="outline"
							onClick={() => decreaseProductQuantity(product.id)}
						>
							<ChevronLeftIcon />
						</Button>

						<p className="w-7 text-xs">{product.quantity}</p>

						<Button
							className="w-7 h-7 rounded-lg"
							variant="destructive"
							onClick={() => increaseProductQuantity(product.id)}
						>
							<ChevronRightIcon />
						</Button>
					</div>
				</div>
			</div>
			{/* DIREITA */}
			<Button className="h-7 w-7 rounded-lg" variant="outline">
				<TrashIcon />
			</Button>
		</div>
	)
}

export default CartProductItem
