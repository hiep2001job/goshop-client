import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material'
import React, { useState } from 'react'
import { Control, FieldValues, UseControllerProps, useController } from 'react-hook-form';

interface Props extends UseControllerProps {
    name: string
    label: string;
    items: string[];
}

const AppSelectList = (props: Props) => {

    const { fieldState, field } = useController({
        ...props, defaultValue: ''
    });

    return (
        <FormControl fullWidth error={!!fieldState.error}>
            <InputLabel >{props.label}</InputLabel>
            <Select
                value={field.value}
                label="Age"
                onChange={field.onChange}
            >
                {props.items.map((item, index) => (
                    <MenuItem key={index} value={item}>{item}</MenuItem>
                ))}
            </Select>
            <FormHelperText>{fieldState.error?.message}</FormHelperText>
        </FormControl>
    )
}

export default AppSelectList