import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet"
import { useContext } from "react"
import { CartContext } from "../contexts/cart"
const CardSheet = () => {
	const { isOpen, toggleCart, products } = useContext(CartContext)

	return (
		<Sheet open={isOpen} onOpenChange={toggleCart}>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Edit profile</SheetTitle>
					<SheetDescription>
						Make changes to your profile here. Click save when you're done.
					</SheetDescription>
				</SheetHeader>
				{products.map((product) => (
					<h1 key={product.id}>{product.quantity}</h1>
				))}
			</SheetContent>
		</Sheet>
	)
}

export default CardSheet
