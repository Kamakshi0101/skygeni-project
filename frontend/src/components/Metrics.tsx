const Metrics = ({ metrics }: any) => {
  if (!metrics) return null

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold text-white">KEY METRICS</h2>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-white text-s mb-2">Conversion rate</p>
          <p className="text-3xl leading-none font-semibold text-white">
            {metrics.conversion_rate.toFixed(2)}%
          </p>
        </div>

        <div>
          <p className="text-white text-s mb-2">Avg deal size</p>
          <p className="text-3xl leading-none font-semibold text-white">
            {metrics.avg_dealSize.toFixed(2)}
          </p>
        </div>

        <div>
          <p className="text-white text-s mb-2">Sales cycle</p>
          <p className="text-3xl leading-none font-semibold text-white">
            {metrics.sales_cycle.toFixed(2)} days
          </p>
        </div>
      </div>
    </div>
  )
}

export default Metrics