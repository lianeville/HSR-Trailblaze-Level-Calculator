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
	const tbLevel = useSelector((state: RootState) => state.tbLevel.tbLevel)
	const tbLevels = useSelector((state: RootState) => state.tbLevel.tbLevels)
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		// set(1)
	}, [])

	let max: number
	let min: number
	let scrollAmount: number

	function setValuesForLabel(label, tbLevels, tbLevel) {
		if (label === 'Trailblaze Level') {
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
		<label className="relative block pt-1 text-left" htmlFor="">
			<span className="font-bold">{terminologyMap[label] || label}</span>
			<div className="relative">
				<input
					ref={inputRef}
					className="border-slate-00 mt-1 block rounded-md border bg-slate-600 p-1 pr-8" // Added pr-8 for additional right padding
					type="text"
					value={value}
					onChange={handleInputChange}
					onWheel={handleScroll}
				/>
				{/* <div className="absolute right-2 top-1/2 -translate-y-1/2 transform">
					<div className="ml-2 inline-block h-0 w-0 border-b border-l border-r border-t border-solid border-white"></div>
					<div className="ml-2 inline-block h-0 w-0 rotate-180 transform border-b border-l border-r border-t border-solid border-white"></div>
				</div> */}
			</div>
		</label>
	)
}

export default InputLabel
