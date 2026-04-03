import { useState } from "react"
import Chart from "./Chart";
import VITE_API_URL from "../util/config";
function Simulation() 
{
  const [conversion, setConversion] = useState("")
  const [dealSize, setDealSize] = useState("")
  const [result, setResult] = useState<any>(null)

  const runSimulation=()=>
  {
    console.log("Button clicked")
    fetch(`${VITE_API_URL}/simulate`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        conversion:Number(conversion),
        dealSize:Number(dealSize),
      }),
    })
      .then((res)=>res.json())
      .then((data)=>setResult(data))
  }
  return(
    <div className="rounded-xl border border-white bg-[#2a2a2a] px-6 py-5">
      <h2 className="text-xl font-semibold text-white mb-3">SIMULATION</h2>

      <div className="space-y-2.5">
        <input className="w-full border border-white bg-[#2f2f2f] text-white p-2.5 rounded-lg placeholder:text-white" type="number"
          placeholder="Conversion Change (%)"
          value={conversion}
          onChange={(e)=>setConversion(e.target.value)}
        />

        <input className="w-full border border-white bg-[#2f2f2f] text-white p-2.5 rounded-lg placeholder:text-white "type="number"
          placeholder="Deal Size Change (%)"
          value={dealSize}
          onChange={(e)=>setDealSize(e.target.value)}
        />

        <button onClick={runSimulation} className="border border-white bg-[#343434] hover:bg-[#3e3e3e] text-white px-5 py-2.5 rounded-lg font-medium text-sm"
        >Run Simulation
        </button>
      </div>

      {result && (
        <div className="mt-5 space-y-2 text-white text-sm">
          <h3 className="font-semibold text-lg">Result</h3>

          <p>
            Baseline:{" "}{Number(result.baseline.total_revenue).toFixed(2)}
          </p>
          <p>
            New:{" "} {Number(result.scenario.total_revenue).toFixed(2)}
          </p>
          <p>
            Impact: {Number(result.impact.absolute).toFixed(2)} (
            {Number(result.impact.percentage).toFixed(2)}%)
          </p>

          <Chart result={result} />
        </div>
      )}
    </div>
  )
}
export default Simulation