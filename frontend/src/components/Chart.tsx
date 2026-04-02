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
    <div style={{marginTop:"30px"}}>
      <h3>Scenario Comparison</h3>

      <LineChart width={400} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="week" />
        <YAxis />
        <Tooltip />

        <Line type="monotone" dataKey="baseline" />
        <Line type="monotone" dataKey="scenario" />
      </LineChart>
    </div>
  )
}

export default Chart