'use client'
import { Button, Checkbox, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material"

export default function NewFormQuestion() {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <TextField
                id="formId" 
                label="Form ID" 
                required
            />
            <TextField 
                id="title" 
                label="Title" 
                required 
            /> 
            <TextField 
                id="description" 
                label="Description" 
                multiline 
            />
            <FormControlLabel control={<Checkbox />} label="Required" required/>
            <FormControl required>
                <FormLabel id="question-type">Question Type</FormLabel>
                <RadioGroup>
                    <FormControlLabel value="numeric" control={<Radio/>} label="Numeric" />
                    <FormControlLabel value="text" control={<Radio/>} label="Text" />
                    <FormControlLabel value="file-upload" control={<Radio />} label="File Upload" />
                    <FormControlLabel value="multiple-choice" control={<Radio/>} label="Multiple Choice" />
                </RadioGroup>
            </FormControl> 
            <Button type="submit" variant="outlined">Submit</Button>  
        </div>
    ); 
}