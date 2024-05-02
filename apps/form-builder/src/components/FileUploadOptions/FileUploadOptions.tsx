import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import React from 'react';

export default function FileUploadOptions() {
  const [value, setValue] = React.useState('KB');

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  const fileTypes = [
    'PDF',
    'TXT',
    'DOC/DOCX',
    'XLS',
    'XLSX',
    'HTML',
    'PPT/PPTX',
    'JPEG',
    'PNG',
    'GIF',
    'MP4',
    'AVI',
    'MOV',
    'MP3',
  ];

  const [fileType, setFileType] = React.useState<string[]>([]);

  const handleFileChange = (event: SelectChangeEvent<typeof fileType>) => {
    const {
      target: { value },
    } = event;
    setFileType(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <Box>
      <Box>
        <FormControl sx={{ mt: 2, minWidth: 175 }}>
          <InputLabel id="fileType">File Type</InputLabel>
          <Select
            labelId="fileType"
            id="fileType"
            multiple
            value={fileType}
            onChange={handleFileChange}
            input={<OutlinedInput label="File Type" />}
            renderValue={(selected) => selected.join(', ')}
          >
            {fileTypes.map((type) => (
              <MenuItem key={type} value={type}>
                <Checkbox checked={fileType.indexOf(type) > -1} />
                <ListItemText primary={type} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <FormControl sx={{ mt: 2, maxWidth: 170, minWidth: 150 }}>
          <TextField id="size" label="File Size" variant="outlined"></TextField>
        </FormControl>

        <FormControl sx={{ mt: 2, maxWidth: 170, minWidth: 80 }}>
          <InputLabel id="select-label">File Size</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            value={value}
            onChange={handleChange}
            autoWidth
            label="FileSize"
          >
            <MenuItem value="KB">KB</MenuItem>
            <MenuItem value="MB">MB</MenuItem>
            <MenuItem value="GB">GB</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}
