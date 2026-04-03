import {LineChart,Line,XAxis,YAxis,Tooltip,CartesianGrid} from "recharts"

function Chart({result}:any) 
{
  if (!result) return null
  const baseline=result.baseline.total_revenue
  const scenario=result.scenario.total_revenue
  const data=[
    { week:"Week 1",baseline:baseline*0.2,scenario: scenario*0.2},
    { week:"Week 2",baseline:baseline*0.25, scenario:scenario*0.25},
    { week:"Week 3",baseline:baseline*0.25, scenario:scenario*0.25},
    { week:"Week 4",baseline:baseline*0.3,scenario: scenario*0.3},
  ]
  return(
    <div style={{marginTop:"20px"}}>
      <h3 className="text-white mb-2 text-sm">Scenario Comparison</h3>

      <LineChart width={360} height={240} data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#4a4a4a" />
        <XAxis dataKey="week" stroke="#b8b8b8" />
        <YAxis stroke="#b8b8b8" />
        <Tooltip />

        <Line type="monotone" dataKey="baseline" stroke="#d4d4d4" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="scenario" stroke="#8ad1ff" strokeWidth={2} dot={false} />
      </LineChart>
    </div>
  )
}

export default Chart