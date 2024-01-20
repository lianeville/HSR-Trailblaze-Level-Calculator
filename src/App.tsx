import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import "./App.css"

function App() {
	const terminologyMap: {
		[key in
			| "TrailBlaze Level"
			| "Trailblaze Power"
			| "Daily Training"
			| "Stellar Jade"
			| "Fuel"]: string
	} = {
		"TrailBlaze Level": "Adventure Rank",
		"Trailblaze Power": "Resin",
		"Daily Training": "Commission",
		"Stellar Jade": "Primogem",
		Fuel: "Fragile Resin",
	}

	const [isHonkaiTerm, setIsHonkaiTerm] = useState(true)

	return (
		<div className="bg-slate-600 p-2 rounded-xl">
			<div className="flex">
				<form action="">
					<label className="block text-left" htmlFor="">
						{getTerminology("TrailBlaze Level")}
						<input
							className="block rounded-md bg-slate-600 border-slate-00 border"
							id="trailblazeLevel"
							type="text"
						/>
					</label>
				</form>
			</div>
			<label>
				<Switch onCheckedChange={handleToggle} />
				Using {isHonkaiTerm ? "Honkai" : "Genshin"} Terminology
			</label>
		</div>
	)

	function getTerminology(term: string) {
		if (isHonkaiTerm) return term
		return (terminologyMap as { [key: string]: string })[term]
	}

	function handleToggle() {
		setIsHonkaiTerm(!isHonkaiTerm)
	}
}

export default App
