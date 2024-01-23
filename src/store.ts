import { createSlice, configureStore } from '@reduxjs/toolkit'

type TerminologyMap = Record<string, string>
const terminologyMapHSR: TerminologyMap = {
	'Trailblaze Level': 'Trailblaze Level',
	'Trailblaze Power': 'Trailblaze Power',
	'Daily Training': 'Daily Training',
	'Stellar Jade': 'Stellar Jade',
	'Equilibrium': 'Equilibrium',
	'Fuel': 'Fuel',
}
const terminologyMapGenshin: TerminologyMap = {
	'Trailblaze Level': 'Adventure Rank',
	'Trailblaze Power': 'Resin',
	'Daily Training': 'Commission',
	'Stellar Jade': 'Primogem',
	'Equilibrium': 'World',
	'Fuel': 'Fragile Resin',
}
type Equilibriums = Array<{
	startingLv: number
	lvNeeded: number
	expUntilNext: number
	income: number
}>
const equilibriums: Equilibriums = [
	{ startingLv: 1, lvNeeded: 20, expUntilNext: 18250, income: 2200 },
	{ startingLv: 20, lvNeeded: 30, expUntilNext: 21580, income: 2350 },
	{ startingLv: 30, lvNeeded: 40, expUntilNext: 34080, income: 2500 },
	{ startingLv: 40, lvNeeded: 50, expUntilNext: 47880, income: 2650 },
	{ startingLv: 50, lvNeeded: 60, expUntilNext: 79460, income: 2800 },
	{ startingLv: 60, lvNeeded: 65, expUntilNext: 117030, income: 2950 },
	{ startingLv: 66, lvNeeded: 70, expUntilNext: 362200, income: 3100 },
]
const equilibriumTbLevels = [20, 30, 40, 50, 60, 65, 70]

type TbLevels = Array<{ current: string; total: string; income: string }> | null

let tbLevels: TbLevels = null
fetch('/tb-levels.json')
	.then((response) => response.json())
	.then((data) => {
		tbLevels = data
	})
	.catch((error) => console.error('Error loading JSON file:', error))

interface InitialState {
	terminologyMap: TerminologyMap
	tbLevel: number
	nextEquilibrium: number
	currentExp: number
	isHonkaiTerm: boolean
	dailyTbPower: number
	remainingDays: number
	// daysUntil: EqulibriumExpReq
	goalEq: number
	daysUntilGoal: number
}
const initialState: InitialState = {
	terminologyMap: terminologyMapHSR,
	tbLevel: 1,
	nextEquilibrium: 20,
	currentExp: 0,
	isHonkaiTerm: true,
	dailyTbPower: 3100,
	remainingDays: 0,
	// daysUntil: equlibriumExpReq,
	goalEq: 1,
	daysUntilGoal: 8.3,
}

// Create a slice
const tbLevelSlice = createSlice({
	name: 'tbLevel',
	initialState,
	reducers: {
		setTbLevel: (state, action) => {
			if (action.payload > 70) action.payload = 70
			if (action.payload < 1) action.payload = 1
			state.tbLevel = action.payload
			state.dailyTbPower
			updateCalcs(state)
		},
		setCurrentExp: (state, action) => {
			// if (!tbLevels) return
			// const currentExp = tbLevels[state.tbLevel - 1].total
			// state.currentExp = Number(currentExp) + action.payload
			state.currentExp = action.payload
			updateCalcs(state)
		},
		setIsHonkaiTerm: (state, action) => {
			state.isHonkaiTerm = action.payload
			if (action.payload == true) {
				state.terminologyMap = terminologyMapHSR
			} else {
				state.terminologyMap = terminologyMapGenshin
			}
		},
		setGoalEq: (state, action) => {
			state.goalEq = Number(action.payload)
			updateCalcs(state)
		},
	},
})

const updateCalcs = (state: InitialState) => {
	const goal = state.goalEq
	const startingLevel = state.tbLevel
	const startingExp = state.currentExp

	if (!tbLevels) return

	const nextEqLevel = equilibriumTbLevels.filter(
		(num) => num > startingLevel
	)[0]
	const expTillNextEq = Number(tbLevels[nextEqLevel].total)
	const expIntoEq = Number(tbLevels[startingLevel - 1].total) + startingExp
	const dailyIncome = Number(tbLevels[startingLevel - 1].income)

	const currentEq = equilibriumTbLevels.indexOf(nextEqLevel) + 1

	let days = (expTillNextEq - expIntoEq) / dailyIncome

	for (let i = currentEq; i < goal; i++) {
		const equilibrium = equilibriums[i]
		days += equilibrium.expUntilNext / equilibrium.income
	}

	state.daysUntilGoal = Math.round(days * 1e1) / 1e1
}

// Export the action creators
export const { setTbLevel, setCurrentExp, setIsHonkaiTerm, setGoalEq } =
	tbLevelSlice.actions

// Export the reducer
export const tbLevelReducer = tbLevelSlice.reducer

// Configure the Redux store
const store = configureStore({
	reducer: {
		tbLevel: tbLevelReducer,
	},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: { tbLevel: { tbLevel: string | null, isHonkaiTerm: boolean } }
export type AppDispatch = typeof store.dispatch

export default store
