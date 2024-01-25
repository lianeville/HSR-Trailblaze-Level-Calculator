import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

function InputLabel({
	label,
	value,
	set,
}: {
	label: string
	value: number
	set: React.Dispatch<React.SetStateAction<number>>
}) {
	const terminologyMap = useSelector(
		(state: RootState) => state.tbLevel.terminologyMap
	)
	const tbLevel = useSelector((state: RootState) => state.tbLevel.tbLevel)
	const tbLevels = useSelector((state: RootState) => state.tbLevel.tbLevels)
	const inputRef = useRef<HTMLInputElement>(null)
	const [isLevel] = useState(label === 'Trailblaze Level')

	function handleInputChange() {
		if (!inputRef.current || !tbLevels) return

		let max = isLevel ? 70 : Number(tbLevels[tbLevel].current)

		inputRef.current.value = inputRef.current.value
			.replace(/^0+/, '')
			.replace(/\D/g, '')

		const inputValue = inputRef.current.value

		set(inputValue === '' ? 0 : Math.min(Number(inputValue), max))
	}

	function handleInputClick() {
		inputRef.current?.select()
	}

	return (
		<label className="relative block w-full pt-1 text-left" htmlFor="">
			<span className="font-bold">{terminologyMap[label] || label}</span>
			<div className="relative flex">
				<input
					ref={inputRef}
					className="ml-2 mt-1 w-full rounded-md border border-none bg-slate-500 p-2"
					type="number"
					value={value}
					onChange={handleInputChange}
					onClick={handleInputClick}
					step={isLevel ? 1 : 100}
				/>
			</div>
		</label>
	)
}

export default InputLabel
