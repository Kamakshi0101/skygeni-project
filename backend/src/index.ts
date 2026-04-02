import express from "express";
import cors from "cors";
import {read_CSV} from "./utils/csvReader.js";
import {splitData,metrics, Q3Revenue, simulate} from "./services/csvService.js"

const app=express();
app.use(express.json());
app.use(cors({
  origin: "*"
}));
app.get("/",async(req, res)=>{
  try
  {
    const data=await read_CSV();
    res.json(
    {
      message: "CSV file is read successfully",
      totalRows: data.length,
      sample: data.slice(0,5)
    })

  } 
  catch(err)
  {
    res.status(500).json({ error: "Error reading CSV" });
  }
});
app.get("/data",async(req,res)=> 
{
  const{Q1,Q2,Q3}=await splitData()
    res.json({
      count_Q1:Q1.length,
      count_Q2:Q2.length,
      count_Q3:Q3.length
    })
})
app.get("/metrics",async(req,res)=> 
{
  const data=await metrics()
  res.json(data)
})
app.get("/predict",async(req,res)=> 
{
  const data=await Q3Revenue()
  res.json(data)
})
app.post("/simulate",async(req, res)=>{
  const conversion=req.body.conversion
  const dealSize=req.body.dealSize
  const data=await simulate(conversion,dealSize)
  res.json(data)
})
app.listen(5000,()=>
{
  console.log(`Server running on port http://localhost:5000`);
})