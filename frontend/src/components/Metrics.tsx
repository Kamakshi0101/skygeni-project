const Metrics=({metrics}:any)=>
{
  if(!metrics) return null
  return(
    <div className="bg-white p-4 shadow">
      <h2 className="text-lg font-bold mb-2">Metrics</h2>

      <p>Conversion Rate: {metrics.conversion_rate.toFixed(2)}%</p>
      <p>Avg Deal Size: {metrics.avg_dealSize.toFixed(2)}</p>
      <p>Sales Cycle: {metrics.sales_cycle.toFixed(2)} days</p>
    </div>
  )
}
export default Metrics