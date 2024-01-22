import { useEffect, useRef } from 'react'
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
	const TbLevel = useSelector((state: RootState) => state.tbLevel.tbLevel)
	const currentExp = useSelector((state: RootState) => state.tbLevel.currentExp)

	const inputRef = useRef<HTMLInputElement>(null)

	// useEffect(() => {
	// 	if (inputRef.current) {
	// 		inputRef.current.focus()
	// 	}
	// }, [value])

	function handleInputChange() {
		if (!inputRef.current) return
		let limit = null
		if (label === 'Trailblaze Level') {
			limit = 70
		} else {
			limit = 79710
		}
		const inputValue = inputRef.current.value.replace(/\D/g, '')
		console.log(set, inputValue)
		set(inputValue === '' ? 0 : Math.min(Number(inputValue), limit))
		console.log(TbLevel)
		console.log(currentExp)
	}

	return (
		<label className="block pt-1 text-left" htmlFor="">
			<span className="font-bold">{terminologyMap[label] || label}</span>
			<input
				ref={inputRef}
				className="border-slate-00 mt-1 block rounded-md border bg-slate-600 p-1"
				type="text"
				value={value}
				onChange={handleInputChange}
			/>
		</label>
	)
}

export default InputLabel
