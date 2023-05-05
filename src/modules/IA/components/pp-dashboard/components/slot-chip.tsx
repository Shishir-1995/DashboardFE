import { Chip } from '@mui/material';
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

interface props {
    
    id?:string,
    isBooked:boolean,
    slotTime:string,
    handleDelete:()=>void

}




const SlotChip:React.FC<props>=({isBooked,slotTime,handleDelete})=>{
    
    if(isBooked){

        return(
            <>
                <Chip
                    color={"success" }
                    label={new Date(slotTime).toLocaleTimeString("en-us", {
                    timeZone: "Asia/Kolkata",   })} 
                />

            </>
        )

    }

        return(
            <>
                <Chip
                    color={"default" }
                    label={new Date(slotTime).toLocaleTimeString("en-us", {
                    timeZone: "Asia/Kolkata",   })} 
                    deleteIcon={<DeleteIcon/>}
                    onDelete={handleDelete}
                />

            </>
        )

}

export default SlotChip;