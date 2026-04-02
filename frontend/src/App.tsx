import { useEffect, useState } from "react"
import Metrics from "./components/Metrics"
import Prediction from "./components/Prediction"
import Simulation from "./components/Simulation"

function App() {
  const [metrics,setMetrics]=useState(null)
  const [prediction,setPrediction]=useState(null)

  useEffect(()=>{
    fetch("http://localhost:5000/metrics")
      .then(res=>res.json())
      .then(data=>setMetrics(data))

    fetch("http://localhost:5000/predict")
      .then(res=>res.json())
      .then(data=>setPrediction(data))
  }, [])

  return(
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-3xl mx-auto space-y-6">

        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Sales Dashboard
        </h1>

        <Metrics metrics={metrics} />
        <Prediction prediction={prediction} />
        <Simulation />

      </div>
    </div>
  )
}
export default App