import {  FormControl, FormLabel, Input, InputProps } from  '@chakra-ui/react'
import { InputHTMLAttributes } from 'react';

interface InputFormProps extends InputProps {
    name: string;
    type: string;  
    
}
export function InputForm({ type, name, ...props }:InputFormProps) {
    return (
        <>
        
        <FormControl marginY="8">
        <FormLabel htmlFor={name}>{name}</FormLabel>
        <Input as='input' id={name} type={type} {...props} />
        </FormControl>
        {/* <FormControl marginY="8">
        </FormControl> */}
        </>
        
        )
    }