import { useEffect } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useSelector, useDispatch } from 'react-redux' // Import the useSelector hook
import InputLabel from './components/InputLabel'
import DataRow from './components/DataRow'
import store, {
	RootState,
	setIsHonkaiTerm,
	setTbLevel,
	setGoalEq,
	setCurrentExp,
	fetchTbLevels,
} from './store' // Import the actions and RootState from store
import './App.css'

function App() {
	const terminologyMap = useSelector(
		(state: RootState) => state.tbLevel.terminologyMap
	)
	const tbLevel = useSelector((state: RootState) => state.tbLevel.tbLevel)
	const currentExp = useSelector((state: RootState) => state.tbLevel.currentExp)
	const goalEq = useSelector((state: RootState) => state.tbLevel.goalEq)

	const daysUntilGoal = useSelector(
		(state: RootState) => state.tbLevel.daysUntilGoal
	)
	const equilibriumTbLevels = useSelector(
		(state: RootState) => state.tbLevel.equilibriumTbLevels
	)
	const equilibriumsData = useSelector(
		(state: RootState) => state.tbLevel.equilibriumsData
	)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchTbLevels())
	}, [])

	const dataRows = [
		{
			label: terminologyMap['Daily Training'],
			quantity: 5,
			exp: equilibriumsData[goalEq == 7 ? 6 : goalEq]?.training,
		},
		{ label: terminologyMap['Trailblaze Power'], quantity: 240, exp: 10 },
		{
			label: 'Immersifiers',
			quantity: goalEq > 1 ? 4 : 0,
			exp: 200,
			weekly: true,
		},
		{
			label: 'Total',
			quantity: 1,
			weekly: true,
			exp:
				equilibriumsData[goalEq == 7 ? 6 : goalEq]?.income * 7 +
				(goalEq > 1 ? 800 : 0),
		},
	]

	return (
		<div className="h-full w-full bg-slate-600 sm:h-auto sm:min-h-[720px] sm:min-w-[400px] sm:rounded-xl">
			<div className="flex flex-col items-center">
				<img
					src="/Honkai-Star-Rail-Logo.png"
					alt="HSR Logo"
					className="-mb-[6rem] -mt-[5rem] scale-50"
				/>
				<div className="flex w-full px-5">
					<form action="" className="w-full">
						<div className="flex w-full items-center justify-center">
							<InputLabel
								label="Trailblaze Level"
								value={tbLevel}
								set={(value) => store.dispatch(setTbLevel(value))}
							/>
							<img
								src="/trailblaze-power.webp"
								alt=""
								className="ml-2 mt-8 h-12 w-12 shrink-0"
							/>
						</div>
						<div className="flex items-center justify-center">
							<InputLabel
								label="Current EXP"
								value={currentExp}
								set={(value) => store.dispatch(setCurrentExp(value))}
							/>
							<img
								src="/exp-icon.webp"
								alt=""
								className="ml-2 mt-8 h-12 w-12 shrink-0"
							/>
						</div>
					</form>
				</div>
				<div className="p-1">
					<span className="font-bold">
						Goal {terminologyMap['Equilibrium']} Level
					</span>
					<Tabs
						defaultValue="1"
						className="py-1"
						onValueChange={switchWorldLevel}
					>
						<TabsList className="bg-slate-400">
							{equilibriumTbLevels.map((eqReqTbLevel, index) => (
								<TabsTrigger
									disabled={eqReqTbLevel <= tbLevel}
									value={(index + 1).toString()}
									key={index}
									data-state={index + 1 == goalEq ? 'active' : 'inactive'}
								>
									{index + 1 == 7 ? 'lv 70' : index + 1}
								</TabsTrigger>
							))}
						</TabsList>
					</Tabs>
				</div>

				{tbLevel != 70 && tbLevel > 0 && (
					<div className="flex w-full flex-col items-center">
						<div className="flex gap-x-5">
							<div className="flex flex-col p-1">
								<span>Goal {terminologyMap['Trailblaze Level']}</span>
								<span className="m-1 rounded-md bg-slate-500 p-1 text-2xl font-bold shadow-lg">
									{equilibriumsData[goalEq - 1]?.lvNeeded}
								</span>
							</div>

							<div>
								<div className="flex flex-col p-1">
									<span>Expected To Reach In</span>
									<span className="m-1 rounded-md bg-slate-500 p-1 text-2xl font-bold shadow-lg">
										{daysUntilGoal} days
									</span>
								</div>
							</div>
						</div>

						<div className="w-full">
							<div className="flex flex-col items-start">
								<span className="p-2">
									<span className="font-bold">
										{goalEq === 7 ? 'Credits' : 'EXP'} Earned
									</span>
									<span> at </span>
									{goalEq === 7
										? 'Level 70'
										: terminologyMap['Equilibrium'] + ' Level ' + goalEq}
								</span>
								<ul className="flex w-full flex-col text-left">
									{dataRows.map((row, index) => (
										<DataRow
											label={row.label}
											quantity={row.quantity}
											exp={row.exp}
											odd={index % 2 == 0}
											key={index}
											weekly={row.weekly}
											isCredits={goalEq == 7}
										/>
									))}
								</ul>
							</div>
						</div>
					</div>
				)}

				<div className="pb-3">
					<span className="font-bold">Terminology</span>
					<Tabs
						defaultValue="honkai"
						className="py-1"
						onValueChange={toggleTerminology}
					>
						<TabsList className="bg-slate-400">
							<TabsTrigger className="text-white" value="honkai">
								Honkai: Star Rail
							</TabsTrigger>
							<TabsTrigger value="genshin">Genshin Impact</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>
			</div>
		</div>
	)

	function toggleTerminology(term: string) {
		store.dispatch(setIsHonkaiTerm(term === 'honkai'))
	}

	function switchWorldLevel(level: string) {
		store.dispatch(setGoalEq(level))
	}
}

export default App
