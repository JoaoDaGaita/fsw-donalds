"use client"

import { Button } from "@/components/ui/button"
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerTrigger,
} from "@/components/ui/drawer"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { isValidCpf } from "../helpers/cpf"
import { useForm } from "react-hook-form"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PatternFormat } from "react-number-format"
import { DialogTitle } from "@radix-ui/react-dialog"

const formSchema = z.object({
	name: z.string().trim().min(1, { message: "O nome é obrigatório" }),
	cpf: z
		.string()
		.min(1, { message: "O cpf é obrigatório" })
		.trim()
		.refine((value) => isValidCpf(value), { message: "CPF invalido" }),
})

type FormSchema = z.infer<typeof formSchema>

interface FinishOrderDialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
}

const FinishOrderDialog = ({ onOpenChange, open }: FinishOrderDialogProps) => {
	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			cpf: "",
		},
		shouldUnregister: true,
	})

	const onSubmit = (data: FormSchema) => {
		return console.log({ data })
	}

	return (
		<Drawer open={open} onOpenChange={onOpenChange}>
			<DrawerContent>
				<DialogTitle>Drawer de finalização de produto</DialogTitle>
				<div className="p-5">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Seu nome</FormLabel>
										<FormControl>
											<Input placeholder="Digire seu nome..." {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="cpf"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Seu CPF</FormLabel>
										<FormControl>
											<PatternFormat
												placeholder="Digite seu cpf"
												format="###.###.###-##"
												customInput={Input}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<DrawerFooter>
								<Button
									type="submit"
									variant="destructive"
									className="rounded-full"
								>
									Finalizar
								</Button>
								<DrawerClose asChild>
									<Button variant="outline" className="rounded-full">
										Cancelar
									</Button>
								</DrawerClose>
							</DrawerFooter>
						</form>
					</Form>
				</div>
			</DrawerContent>
		</Drawer>
	)
}

export default FinishOrderDialog
