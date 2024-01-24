import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { Slider } from '@/components/ui/slider'

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
	const currentExp = useSelector((state: RootState) => state.tbLevel.currentExp)
	const tbLevels = useSelector((state: RootState) => state.tbLevel.tbLevels)
	const inputRef = useRef<HTMLInputElement>(null)
	const [isLevel] = useState(label == 'Trailblaze Level')

	let max: number
	let min: number
	let scrollAmount: number

	function setValuesForLabel(label, tbLevels, tbLevel) {
		if (isLevel) {
			scrollAmount = 1
			max = 70
			min = 1
		} else {
			scrollAmount = 100
			max = Number(tbLevels[tbLevel].current)
			min = 0
		}
	}

	function handleInputChange() {
		if (!inputRef.current || !tbLevels) return

		setValuesForLabel(label, tbLevels, tbLevel)

		const inputValue = inputRef.current.value.replace(/\D/g, '')
		set(inputValue === '' ? 0 : Math.min(Number(inputValue), max))
	}

	function handleSlideChange(value: number[]) {
		if (!inputRef.current || !tbLevels) return

		inputRef.current.value = value[0].toString()
		handleInputChange()
		// set(inputValue === '' ? 0 : Math.min(Number(inputValue), max))
	}

	function handleScroll(e: WheelEvent) {
		if (!inputRef.current || !tbLevels) return

		setValuesForLabel(label, tbLevels, tbLevel)

		const val = Number(inputRef.current.value)
		const delta = e.deltaY
		if (delta > 0) {
			// Scroll down, decrease value
			inputRef.current.value = Math.max(val - scrollAmount, min).toString()
		} else if (delta < 0) {
			// Scroll up, increase value
			inputRef.current.value = Math.min(val + scrollAmount, max).toString()
		}
		handleInputChange()
	}

	return (
		<label className="relative block w-1/2 pt-1 text-left" htmlFor="">
			<span className="font-bold">{terminologyMap[label] || label}</span>
			<div className="relative flex w-full">
				{tbLevels && (
					<Slider
						value={isLevel ? [tbLevel] : [currentExp]}
						max={isLevel ? 70 : Number(tbLevels[tbLevel].current)}
						step={isLevel ? 1 : 10}
						onValueChange={handleSlideChange}
					/>
				)}
				<input
					ref={inputRef}
					className="border-slate-00 ml-2 mt-1 w-1/4 rounded-md border bg-slate-600 p-1"
					type="text"
					value={value}
					onChange={handleInputChange}
					onWheel={handleScroll}
				/>
			</div>
		</label>
	)
}

export default InputLabel
