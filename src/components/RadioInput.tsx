import { FormControl, FormLabel, HStack, Input, InputProps, Radio, RadioGroup } from "@chakra-ui/react";

interface RadioInputProps extends InputProps {
    onChange?: (value: any) => void
}
export function RadioInput({ onChange, ...props }: RadioInputProps) {
    return (
        <FormControl marginY="8"> 
        <FormLabel as='legend'>Produto perecível?</FormLabel>
        
        <RadioGroup name="isPerishable"  >
        
        <Radio value='true'>Sim</Radio>
        <Radio value='false'>Não</Radio>
        
        </RadioGroup>
        
        </FormControl>
    )
}