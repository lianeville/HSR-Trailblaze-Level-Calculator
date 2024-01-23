import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useSelector } from 'react-redux' // Import the useSelector hook
import InputLabel from './components/InputLabel'
import store, {
	RootState,
	setIsHonkaiTerm,
	setTbLevel,
	setGoalEq,
	setCurrentExp,
} from './store' // Import the actions and RootState from store
import './App.css'
// import JsonFormatter from 'react-json-formatter'

function App() {
	// Use useSelector to access state values from the Redux store
	const terminologyMap = useSelector(
		(state: RootState) => state.tbLevel.terminologyMap
	)
	const tbLevel = useSelector((state: RootState) => state.tbLevel.tbLevel)
	const currentExp = useSelector((state: RootState) => state.tbLevel.currentExp)
	// const nextEquilibrium = useSelector(
	// 	(state: RootState) => state.tbLevel.nextEquilibrium
	// )
	// const remainingDays = useSelector(
	// 	(state: RootState) => state.tbLevel.remainingDays
	// )
	// const eqData = useSelector((state: RootState) => state.tbLevel)
	const daysUntilGoal = useSelector(
		(state: RootState) => state.tbLevel.daysUntilGoal
	)

	const eqLoop = [
		{ eq: '1', level: 20 },
		{ eq: '2', level: 30 },
		{ eq: '3', level: 40 },
		{ eq: '4', level: 50 },
		{ eq: '5', level: 60 },
		{ eq: '6', level: 65 },
		{ eq: '7', level: 70 },
	]

	// const jsonStyle = {
	// 	propertyStyle: { color: '#3498db' }, // Blue color for properties
	// 	stringStyle: { color: '#2ecc71' }, // Green color for strings
	// 	numberStyle: { color: '#e74c3c' }, // Red color for numbers
	// }

	return (
		<div className="flex flex-col items-center rounded-xl bg-slate-600 p-2">
			<div className="flex p-2">
				<form action="">
					<InputLabel
						label="Trailblaze Level"
						value={tbLevel}
						set={(value) => store.dispatch(setTbLevel(value))}
					/>
					<InputLabel
						label="Current EXP"
						value={currentExp}
						set={(value) => store.dispatch(setCurrentExp(value))}
					/>
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
						{eqLoop.map((item, index) => (
							<TabsTrigger
								disabled={item.level <= tbLevel}
								value={item.eq}
								key={index}
							>
								{item.eq == '7' ? 'lv 70' : item.eq}
							</TabsTrigger>
						))}
					</TabsList>
				</Tabs>
			</div>

			<span>Expected Finish Date:</span>
			<span className="text-xl font-bold">{daysUntilGoal} days</span>

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
