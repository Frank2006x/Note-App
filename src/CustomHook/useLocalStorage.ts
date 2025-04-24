import { useEffect, useState } from "react"

function useLocalStorage<T>(key:string,initalValue:T|(()=>T)){
    const [value,setValue]=useState<T>(()=>{
        let jsonData=localStorage.getItem(key);
        if (jsonData===null){
            if (typeof initalValue==="function" ){
                return (initalValue as ()=>T)()
            }else{
                return initalValue

            }
        }else{
            return JSON.parse(jsonData);
        }
    })

    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value))
    },[key,value])
    return [value,setValue] as [T,typeof setValue]
}

export default useLocalStorage