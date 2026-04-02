import { useState } from "react"
import Chart from "./Chart";
function Simulation() 
{
  const [conversion, setConversion] = useState("")
  const [dealSize, setDealSize] = useState("")
  const [result, setResult] = useState<any>(null)

  const runSimulation=()=>{
    console.log("Button clicked")
    fetch("http://localhost:5000/simulate",{
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
      .then((data)=>setResult(data));
  }
  return(
    <div className="bg-white p-4 shadow">
      <h2 className="text-lg font-bold mb-4">Simulation</h2>

      <div className="space-y-3">
        <input
          className="w-full border p-2 rounded"
          type="number"
          placeholder="Conversion Change (%)"
          value={conversion}
          onChange={(e) => setConversion(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          type="number"
          placeholder="Deal Size Change (%)"
          value={dealSize}
          onChange={(e) => setDealSize(e.target.value)}
        />

        <button
          onClick={runSimulation}
          className="bg-red-500 text-white px-4 py-2 hover:bg-red-600"
        >
          Run Simulation
        </button>
      </div>

      {result && (
        <div className="mt-4 space-y-2">
          <h3 className="font-semibold">Result</h3>

          <p>
            Baseline:{" "}
            {Number(result.baseline.total_revenue).toFixed(2)}
          </p>

          <p>
            New:{" "}
            {Number(result.scenario.total_revenue).toFixed(2)}
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
export default Simulation;