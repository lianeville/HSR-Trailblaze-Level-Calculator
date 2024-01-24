import React from 'react'
import { Badge } from '@/components/ui/badge'

interface DataRowProps {
	label: string
	exp: number
	quantity: number
	odd: boolean
	weekly?: boolean
	isCredits: boolean
}

const DataRow: React.FC<DataRowProps> = ({
	label,
	exp,
	quantity,
	odd,
	weekly = false,
	isCredits,
}) => {
	return (
		<li
			className={`flex justify-between px-3 py-2 ${odd ? 'bg-slate-700' : ''}`}
		>
			<div>
				{quantity != 1 && <span>×{quantity}</span>} {label}
			</div>
			<div>
				<span className="mx-2 font-bold">
					{exp * quantity * (isCredits ? 10 : 1)}{' '}
					{isCredits ? 'Credits' : 'EXP'}
				</span>
				<Badge variant="secondary">{weekly ? 'Weekly' : 'Daily'}</Badge>
			</div>
		</li>
	)
}

export default DataRow
