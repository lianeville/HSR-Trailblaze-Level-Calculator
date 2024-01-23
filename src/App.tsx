import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useSelector } from 'react-redux' // Import the useSelector hook
import InputLabel from './components/InputLabel'
import store, {
	RootState,
	setIsHonkaiTerm,
	setTbLevel,
	setCurrentExp,
} from './store' // Import the actions and RootState from store
import './App.css'

function App() {
	// Use useSelector to access state values from the Redux store
	const terminologyMap = useSelector(
		(state: RootState) => state.tbLevel.terminologyMap
	)
	const tbLevel = useSelector((state: RootState) => state.tbLevel.tbLevel)
	const currentExp = useSelector((state: RootState) => state.tbLevel.currentExp)
	const nextEquilibrium = useSelector(
		(state: RootState) => state.tbLevel.nextEquilibrium
	)
	const remainingDays = useSelector(
		(state: RootState) => state.tbLevel.remainingDays
	)

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

			{nextEquilibrium < 71 && (
				<>
					<span className="mb-1 font-bold">
						Next {terminologyMap['Equilibrium']} Level {nextEquilibrium}
					</span>
					<span>{remainingDays} days</span>
				</>
			)}

			<span className="mb-1 font-bold">Terminology</span>
			<Tabs
				defaultValue="honkai"
				className="w-[400px]"
				onValueChange={handleToggle}
			>
				<TabsList className="bg-slate-400">
					<TabsTrigger className="text-white" value="honkai">
						Honkai: Star Rail
					</TabsTrigger>
					<TabsTrigger value="genshin">Genshin Impact</TabsTrigger>
				</TabsList>
			</Tabs>
		</div>
	)

	function handleToggle(term: string) {
		// Dispatch the action to set the isHonkaiTerm value
		store.dispatch(setIsHonkaiTerm(term === 'honkai'))
	}
}

export default App
