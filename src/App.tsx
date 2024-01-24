import { useEffect, useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useSelector, useDispatch } from 'react-redux' // Import the useSelector hook
import { Badge } from '@/components/ui/badge'
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
		<div className="h-full w-full bg-slate-600 sm:h-auto sm:min-h-[720px] sm:min-w-[400px] sm:rounded-xl">
			<div className="flex flex-col items-center">
				<img
					src="/Honkai-Star-Rail-Logo.png"
					alt="HSR Logo"
					className="-mb-[6rem] -mt-[5rem] scale-50"
				/>
				{/* <h2 className="text-xl font-bold">Trailblazer Level Calculator</h2> */}
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
								{goalEq < 7 && (
									<>
										<span className="p-2">
											<span className="font-bold">Exp Earned</span> at{' '}
											{terminologyMap['Equilibrium']} Level{' '}
											{goalEq == 7 ? 6 : goalEq}:
										</span>
										<ul className="flex w-full flex-col text-left">
											<li className="flex justify-between bg-slate-700 p-2">
												×5 {terminologyMap['Daily Training']}
												<div>
													<span className="mx-1 font-bold">
														{equilibriumsData[goalEq == 7 ? 6 : goalEq]
															?.training * 5}{' '}
														EXP
													</span>
													<Badge variant="secondary">Daily</Badge>
												</div>
											</li>

											<li className="flex justify-between p-2">
												×240 Daily {terminologyMap['Trailblaze Power']}
												<div>
													<span className="mx-1 font-bold">2400 EXP</span>
													<Badge variant="secondary">Daily</Badge>
												</div>
											</li>

											{goalEq > 1 && (
												<li className="flex justify-between bg-slate-700 p-2">
													×4 Immersifiers
													<div>
														<span className="mx-1 font-bold">800 EXP</span>
														<Badge variant="secondary">Weekly</Badge>
													</div>
												</li>
											)}

											<li
												className={`flex justify-between p-2 ${goalEq > 1 ? '' : 'bg-slate-700'}`}
											>
												Total
												<div>
													<span className="mx-1 font-bold">
														{equilibriumsData[goalEq]?.income * 7 + 800} EXP
													</span>
													<Badge variant="secondary">Weekly</Badge>
												</div>
											</li>
										</ul>
									</>
								)}

								{goalEq == 7 && (
									<>
										<span className="p-2">
											<span className="font-bold">Credits Earned</span> at Level
											70:
										</span>
										<ul className="flex w-full flex-col text-left">
											<li className="flex justify-between bg-slate-700 p-2">
												×5 {terminologyMap['Daily Training']}
												<div>
													<span className="mx-1 font-bold">
														{equilibriumsData[6]?.training * 5 * 10} Credits
													</span>
													<Badge variant="secondary">Daily</Badge>
												</div>
											</li>

											<li className="flex justify-between p-2">
												×240 Daily {terminologyMap['Trailblaze Power']}
												<div>
													<span className="mx-1 font-bold">24000 Credits</span>
													<Badge variant="secondary">Daily</Badge>
												</div>
											</li>

											<li className="flex justify-between bg-slate-700 p-2">
												×4 Immersifiers
												<div>
													<span className="mx-1 font-bold">8000 Credits</span>
													<Badge variant="secondary">Weekly</Badge>
												</div>
											</li>

											<li
												className={`flex justify-between p-2 ${goalEq > 1 ? '' : 'bg-slate-700'}`}
											>
												Total:
												<div>
													<span className="mx-1 font-bold">
														{(equilibriumsData[6]?.income * 7 + 800) * 10}{' '}
														Credits
													</span>
													<Badge variant="secondary">Weekly</Badge>
												</div>
											</li>
										</ul>
									</>
								)}
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
