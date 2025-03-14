import CpfForm from "./components/cpf-form"

interface OrdersPageProps {
	searchParams: Promise<{ cpf: string }>
}

const OrdersPage = async ({ searchParams }: OrdersPageProps) => {
	const { cpf } = await searchParams
	if (!cpf) {
		return <CpfForm />
	}
	return <div>123</div>
}

export default OrdersPage
