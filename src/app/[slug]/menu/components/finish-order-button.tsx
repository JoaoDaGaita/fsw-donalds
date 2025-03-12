import { Button } from "@/components/ui/button"
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { isValidCpf } from "../helpers/cpf"
import { useForm } from "react-hook-form"

const formSchema = z.object({
	name: z.string().trim().min(1, { message: "O nome é obrigatório" }),
	cpf: z
		.string()
		.refine((value) => isValidCpf(value), { message: "CPF invalido" }),
})

type FormSchema = z.infer<typeof formSchema>

const FinishOrderButton = () => {
	const {} = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
	})

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button className="w-full rounded-full">Finalizar Pedido</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Finalizar Pedido</DrawerTitle>
					<DrawerDescription>
						Insira suas informações abaixo para finalizar o pedido.
					</DrawerDescription>
				</DrawerHeader>
				<DrawerFooter>
					<Button>Submit</Button>
					<DrawerClose>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}

export default FinishOrderButton
