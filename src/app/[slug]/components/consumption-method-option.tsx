import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { ConsumptionMethod } from "@prisma/client"

import Image from "next/image"
import Link from "next/link"

interface ConsumptionMethodOptionProps {
	imageSvg: string
	imageAlt: string
	buttonText: string
	option: ConsumptionMethod
	slug: string
}

const ConsumptionMethodOption = ({
	buttonText,
	imageAlt,
	imageSvg,
	option,
	slug,
}: ConsumptionMethodOptionProps) => {
	return (
		<Card>
			<CardContent className="flex flex-col items-center gap-8 py-8">
				<div className="relative w-[80px] h-[80px]">
					<Image
						src={imageSvg}
						alt={imageAlt}
						fill
						className="object-contain"
					/>
				</div>
				<Button variant="secondary" className="rounded-full" asChild>
					<Link href={`/${slug}/menu?consumptionMethod=${option}`}>
						{buttonText}
					</Link>
				</Button>
			</CardContent>
		</Card>
	)
}

export default ConsumptionMethodOption
