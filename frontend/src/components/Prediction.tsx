function Prediction({prediction}:any)
{
  if (!prediction) return null
  return(
    <div className="bg-white p-4 shadow">
      <h2 className="text-lg font-bold mb-2">Q3 Prediction</h2>
      <p>
        Total Revenue: {prediction.revenue.toFixed(2)}
      </p>
    </div>
  )
}
export default Prediction