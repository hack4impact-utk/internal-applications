'use client'

import { FormControl, FormLabel, TextField, Button, FormControlLabel, Radio, RadioGroup, Checkbox } from "@mui/material"

export default function UpsertForm() {
    return (
        <FormControl>
            {/* Textboxs for a Title and Description */}
            <FormLabel>Title</FormLabel>
            <TextField></TextField>
            <FormLabel>Description</FormLabel>
            <TextField></TextField>

            {/* A radio group for a responder type */}
            <RadioGroup
                aria-labelledby="radio-group-responder-type" /* !! Unsure on naming convention to put here and line 17 */
                defaultValue="Member" /* !! Should this default to member*/
                name="responder type">
                    
                <FormControlLabel value="Member" control={<Radio />} label="Member" />
                <FormControlLabel value="Student" control={<Radio />} label="Student" />
                <FormControlLabel value="Anyone" control={<Radio />} label="Anyone" />
            </RadioGroup>

            {/* Textbox for a URL */}
            <FormLabel>URL</FormLabel>
            <TextField></TextField>

            {/* Checkbox for Anonymous responses */}
            <FormLabel>Anonymous</FormLabel> {/* !! How should I label this true false? Does the text field work or is there a function? */}
            <FormControlLabel control={<Checkbox />} label="True" />
            <FormControlLabel required control={<Checkbox defaultChecked/>} label="False" />
            {/* !! Required?
                React Native Elements vs MUI */}

            <Button>Add Question</Button>            
            <Button>Submit</Button>
        </FormControl>
    )
}