"use client"

import { z } from "zod"
import { isValidCpf } from "../../menu/helpers/cpf"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
	Drawer,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
} from "@/components/ui/drawer"

import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PatternFormat } from "react-number-format"
import { useRouter } from "next/navigation"

const formSchema = z.object({
	cpf: z
		.string()
		.trim()
		.min(1, {
			message: "O CPF é obrigatório.",
		})
		.refine((value) => isValidCpf(value), {
			message: "CPF inválido.",
		}),
})

type FormSchema = z.infer<typeof formSchema>

const CpfForm = () => {
	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
	})

	const router = useRouter()

	const onSubmit = (data: FormSchema) => {
		console.log(data)
	}

	const handleCancel = () => {
		router.back()
	}
	return (
		<Drawer open>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerHeader>Drawer Title</DrawerHeader>
				<div className="px-5">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<FormField
								control={form.control}
								name="cpf"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Seu CPF</FormLabel>
										<FormControl>
											<PatternFormat
												placeholder="Digite seu CPF..."
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
								<Button variant="destructive" className="rounded-full w-full">
									Confirmar
								</Button>
								<Button variant="outline" onClick={handleCancel}>
									Cancelar
								</Button>
							</DrawerFooter>
							<Button type="submit">Submit</Button>
						</form>
					</Form>
				</div>
			</DrawerContent>
		</Drawer>
	)
}

export default CpfForm
