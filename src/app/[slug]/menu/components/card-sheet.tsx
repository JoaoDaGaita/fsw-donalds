import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet"
import { useContext } from "react"
import { CartContext } from "../contexts/cart"
import CartProductItem from "./cart-product-item"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FormatCurrency } from "@/helpers/format-currency"
import FinishOrderButton from "./finish-order-button"

const CardSheet = () => {
	const { isOpen, toggleCart, products, total } = useContext(CartContext)

	return (
		<Sheet open={isOpen} onOpenChange={toggleCart}>
			<SheetContent className="w-[80%]">
				<SheetHeader>
					<SheetTitle className="text-left">Sacola</SheetTitle>
				</SheetHeader>
				<div className="flex h-full flex-col py-5 space-y-1.5">
					<div className="flex-auto">
						{products.map((product) => (
							<CartProductItem key={product.id} product={product} />
						))}
					</div>
					<Card className="mb-6">
						<CardContent className="p-5">
							<div className="flex justify-between">
								<p className="text-muted-foreground text-sm">Total</p>
								<p className="font-semibold text-sm">{FormatCurrency(total)}</p>
							</div>
						</CardContent>
					</Card>
					<FinishOrderButton />
				</div>
			</SheetContent>
		</Sheet>
	)
}

export default CardSheet
