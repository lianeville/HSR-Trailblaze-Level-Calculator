import { useEffect } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useSelector, useDispatch } from 'react-redux' // Import the useSelector hook
import InputLabel from './components/InputLabel'
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

	return (
		<div className="flex flex-col items-center rounded-xl bg-slate-600 p-2">
			<img
				src="/Honkai-Star-Rail-Logo.png"
				alt="HSR Logo"
				className="-my-9 h-1/2 w-1/2"
			/>
			{/* <h2 className="text-xl font-bold">Trailblazer Level Calculator</h2> */}
			<div className="flex w-full p-2">
				<form action="" className="w-full">
					<div className="flex items-center justify-center">
						<InputLabel
							label="Trailblaze Level"
							value={tbLevel}
							set={(value) => store.dispatch(setTbLevel(value))}
						/>
						<img
							src="/trailblaze-power.webp"
							alt=""
							className="ml-2 mt-5 h-12 w-12"
						/>
					</div>
					<div className="flex items-center justify-center">
						<InputLabel
							label="Current EXP"
							value={currentExp}
							set={(value) => store.dispatch(setCurrentExp(value))}
						/>
						<img src="/exp-icon.webp" alt="" className="ml-2 mt-5 h-12 w-12" />
					</div>
				</form>
			</div>
			<div className="p-1">
				<span className="font-bold">
					Goal {terminologyMap['Equilibrium']} Level
				</span>
				<Tabs
					defaultValue="1"
					className="w-[400px] py-1"
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

			{tbLevel != 70 && (
				<div>
					<div className="flex flex-col items-start p-1">
						<span>{terminologyMap['Equilibrium']} Level</span>
						<span className="text-xl font-bold">
							{equilibriumsData[goalEq - 1]?.lvNeeded}
						</span>
					</div>

					<div>
						<div className="flex flex-col items-start p-1">
							<span>Expected To Reach In:</span>
							<span className="m-1 rounded-md bg-slate-500 p-1 text-2xl font-bold">
								{daysUntilGoal} days
							</span>
						</div>
					</div>
				</div>
			)}

			{/* <span>goal eq {goalEq}</span> */}

			{/* <div className="text-left">
				<JsonFormatter
					json={JSON.stringify(eqData)}
					tabWith={4}
					jsonStyle={jsonStyle}
				/>
			</div> */}

			{/* {nextEquilibrium < 71 && (
				<>
					<span className="mb-1 font-bold">
						Next {terminologyMap['Equilibrium']} Level {nextEquilibrium}
					</span>
					<span>{remainingDays} days</span>
				</>
			)} */}
			<div className="p-1">
				<span className="font-bold">Terminology</span>
				<Tabs
					defaultValue="honkai"
					className="w-[400px] py-1"
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
	)

	function toggleTerminology(term: string) {
		store.dispatch(setIsHonkaiTerm(term === 'honkai'))
	}

	function switchWorldLevel(level: string) {
		store.dispatch(setGoalEq(level))
	}
}

export default App
