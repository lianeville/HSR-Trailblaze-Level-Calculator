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

// Define the initial state
const initialState: {
	terminologyMap: TerminologyMap
	tbLevel: number
	currentExp: number
	isHonkaiTerm: boolean
} = {
	terminologyMap: terminologyMapHSR,
	tbLevel: 1,
	currentExp: 0,
	isHonkaiTerm: true,
}

// Create a slice
const tbLevelSlice = createSlice({
	name: 'tbLevel',
	initialState,
	reducers: {
		setTbLevel: (state, action) => {
			state.tbLevel = action.payload
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
	},
})

// Export the action creators
export const { setTbLevel, setCurrentExp, setIsHonkaiTerm } =
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
