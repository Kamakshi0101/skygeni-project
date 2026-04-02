import { read_CSV } from "../utils/csvReader.js";

export const splitData=async()=>
{
  const data = await read_CSV();
  const Q1:any[]=[],Q2:any[]=[],Q3:any[]=[]
  
  data.forEach((row)=>
  {
    const month=new Date(row.created_date).getMonth()+1
    if(month>=1 && month<=3)
    {
      Q1.push(row)
    } 
    else if(month>=4 && month<=6)
    {
      Q2.push(row)
    } 
    else if(month>=7 && month<=9)
    {
      Q3.push(row)
    }
  })
  return {Q1,Q2,Q3}
}
export const conversionRate=(data:any[])=> 
{
  let won=0
  data.forEach((row)=>
  {
    if(row.stage==="Closed Won") 
    {
      won++
    }
  })
  const total=data.length
  return ((won/total)*100)
}
export const avgDealSize=(data:any[])=>
{
  let totalValue=0,count=0
  data.forEach((row)=> 
{
    if(row.stage==="Closed Won") 
    {
      totalValue+=Number(row.deal_value)
      count++
    }
  })
  return (totalValue/count)
}
export const salesCycle=(data: any[])=>
{
  let totalDays=0,count=0
  data.forEach((row)=> 
  {
    if (row.stage==="Closed Won") 
    {
      const created=new Date(row.created_date),closed=new Date(row.closed_date)
      const diff=(closed.getTime()-created.getTime())/(1000*60*60*24)
      totalDays+=diff
      count++
    }
  })
  return totalDays/count
}
export const metrics=async()=>
{
  const{Q1,Q2}=await splitData()
  const pastDeals=[...Q1,...Q2]
  const conversion_rate=conversionRate(pastDeals)
  const avg_dealSize=avgDealSize(pastDeals)
  const sales_cycle=salesCycle(pastDeals)
  return {conversion_rate,avg_dealSize,sales_cycle}
}
export const Q3Revenue=async()=> 
{
  const {Q3}=await splitData()
  const totalDeals=Q3.length
  const {conversion_rate,avg_dealSize}=await metrics()
  const conversion=conversion_rate/100
  const revenue=totalDeals*conversion*avg_dealSize
  return{totalDeals,revenue}
}
export const simulate=async(conversionChange: number,dealSizeChange: number)=>
{
  const {Q3}=await splitData()
  const totalDeals=Q3.length
  const {conversion_rate,avg_dealSize}=await metrics()
  const baseConversion=conversion_rate/100;
  const newConversion=baseConversion*(1+conversionChange/100)
  const newDealSize=avg_dealSize*(1+ dealSizeChange/100)
  const baseline=await Q3Revenue()
  const baselineRevenue=baseline.revenue
  const scenarioRevenue=totalDeals*newConversion*newDealSize
  const absolute=scenarioRevenue-baselineRevenue
  const percentage=(absolute/baselineRevenue)*100
  let message=""

  if(percentage>0) 
  {
    message=`Revenue is expected to increase by ${percentage.toFixed(2)}%`
  } 
  else if(percentage<0) 
  {
    message=`Revenue may decrease by ${Math.abs(percentage).toFixed(2)}%`
  } 
  else 
  {
    message ="No significant change in revenue"
  }
  return {baseline:
    {
      total_revenue: baselineRevenue
    },scenario: 
    {
      total_revenue: scenarioRevenue
    },impact: 
    {
      absolute,
      percentage
    },
    insight: message
  }
}