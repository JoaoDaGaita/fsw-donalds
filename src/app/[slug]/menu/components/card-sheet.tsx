import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet"
import { useContext } from "react"
import { CartContext } from "../contexts/cart"
import CartItem from "./cart-product-item"

const CardSheet = () => {
	const { isOpen, toggleCart, products } = useContext(CartContext)

	return (
		<Sheet open={isOpen} onOpenChange={toggleCart}>
			<SheetContent className="w-[80%]">
				<SheetHeader>
					<SheetTitle className="text-left">Sacola</SheetTitle>
				</SheetHeader>
				<div className="py-5 space-y-1.5">
					{products.map((product) => (
						<CartItem key={product.id} product={product} />
					))}
				</div>
			</SheetContent>
		</Sheet>
	)
}

export default CardSheet
