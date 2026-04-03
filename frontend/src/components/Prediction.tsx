function Prediction({prediction}:any)
{
  if (!prediction) return null
  return(
    <div className="rounded-lg border border-white bg-[#2a2a2a] px-6 py-5">
      <h2 className="text-xl font-semibold text-whitemb-3">Q3 PREDICTION</h2>
      <p className="text-5xl  font-semibold text-white mb-2">
        {prediction.revenue.toFixed(2)}
      </p>
      <p className="text-white text-lg">Projected revenue</p>
    </div>
  )
}
export default Prediction