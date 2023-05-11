import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import React from 'react'

interface Props{
    options:any;
    onChange:(event:any)=>void;
    selectedValue:string;
}

const RadioButtonGroup = ({options,onChange,selectedValue}:Props) => {
    return (
        <FormControl component='fieldset'>
            <FormLabel id="demo-radio-buttons-group-label">Filter</FormLabel>
            <RadioGroup 
                onChange={onChange}
                value={selectedValue}
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
            >
                {options.map(({ value, label }:any) => (
                    <FormControlLabel key={value} value={value} control={<Radio />} label={label} />
                ))}
            </RadioGroup>
        </FormControl>
    )
}

export default RadioButtonGroup