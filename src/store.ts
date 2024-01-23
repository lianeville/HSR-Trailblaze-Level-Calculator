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
type EqulibriumExpReq = Array<{
	levelNeeded: number
	expUntilNext: number
	income: number
}>
const equlibriumExpReq: EqulibriumExpReq = [
	{ levelNeeded: 20, expUntilNext: 18250, income: 2200 },
	{ levelNeeded: 30, expUntilNext: 39830, income: 2350 },
	{ levelNeeded: 40, expUntilNext: 73910, income: 2500 },
	{ levelNeeded: 50, expUntilNext: 121790, income: 2650 },
	{ levelNeeded: 60, expUntilNext: 201250, income: 2800 },
	{ levelNeeded: 65, expUntilNext: 318280, income: 2950 },
	{ levelNeeded: 70, expUntilNext: 680480, income: 3100 },
]
const equlibriums = [20, 30, 40, 50, 60, 65]

type TbLevelsCalcs = Array<{ current: string; total: string }> | null

let tbLevelCalcs: TbLevelsCalcs = null
fetch('/tb-levels.json')
	.then((response) => response.json())
	.then((data) => {
		tbLevelCalcs = data
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
}

// Create a slice
const tbLevelSlice = createSlice({
	name: 'tbLevel',
	initialState,
	reducers: {
		setTbLevel: (state, action) => {
			if (action.payload > 70) action.payload = 70
			state.tbLevel = action.payload
			state.dailyTbPower
			updateCalcs(state)
		},
		setCurrentExp: (state, action) => {
			state.currentExp = action.payload
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
		},
	},
})

const updateCalcs = (state: InitialState) => {
	console.log(state)
	const higherNumbers = equlibriums.filter((number) => number > state.tbLevel)
	const nextHighest = Math.min(...higherNumbers, 70)
	state.nextEquilibrium = nextHighest
	if (!tbLevelCalcs) return

	const goalLevel = tbLevelCalcs[nextHighest - 1]
	if (!goalLevel) return
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
