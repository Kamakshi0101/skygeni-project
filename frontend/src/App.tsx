import { useEffect, useState } from "react"
import Metrics from "./components/Metrics"
import Prediction from "./components/Prediction"
import Simulation from "./components/Simulation"
import VITE_API_URL from "./util/config"

function App() {
  const [metrics,setMetrics]=useState(null)
  const [prediction,setPrediction]=useState(null)

  useEffect(()=>{
    fetch(`${VITE_API_URL}/metrics`)
      .then(res=>res.json())
      .then(data=>setMetrics(data))

    fetch(`${VITE_API_URL}/predict`)
      .then(res=>res.json())
      .then(data=>setPrediction(data))
  }, [])

  return(
    <div className="min-h-screen bg-[#1b1b1b] text-white p-5 border ">
      <div className="max-w-4xl mx-auto space-y-5">

        <h1 className="text-3xl font-bold text-white mb-6">
          SALES DASHBOARD
        </h1>

        <Metrics metrics={metrics} />
        <Prediction prediction={prediction} />
        <Simulation />

      </div>
    </div>
  )
}
export default App