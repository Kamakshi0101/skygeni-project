import fs from "fs";
// @ts-ignore
import csv from "csv-parser";
export const read_CSV=(): Promise<any[]>=> 
{
  return new Promise((res,rej)=> 
{
    const result:any[]=[];
    fs.createReadStream("deals.csv")
      .pipe(csv())
      .on("data",(data)=>{
        result.push(data)
      })
      .on("end",()=>{
        res(result);
      })
      .on("error",(err)=>{
        rej(err)
      })
  })
}