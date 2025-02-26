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
	const { isOpen, toggleCart } = useContext(CartContext)

	return (
		<Sheet open={isOpen} onOpenChange={toggleCart}>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Edit profile</SheetTitle>
					<SheetDescription>
						Make changes to your profile here. Click save when you're done.
					</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	)
}

export default CardSheet
