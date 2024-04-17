import { ApplicantResponse } from '@hack4impact-utk/internal-models';
import { Chip, TableCell, TableRow } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import Button from '@mui/material/Button';

//Each row should display the applicant name (first and last), status, NetID and application
export default function ApplicantListItem(applicant: ApplicantResponse) {
  return (
    <TableRow>
      <TableCell align={'left'} style={{ top: 57, minWidth: 170 }}>
        {applicant.firstName} {applicant.lastName}
      </TableCell>
      <TableCell align={'left'} style={{ top: 57, minWidth: 170 }}>
        <Chip label={applicant.status} />
      </TableCell>
      <TableCell align={'left'} style={{ top: 57, minWidth: 170 }}>
        {applicant.netid}
      </TableCell>
      <TableCell align={'left'} style={{ top: 57, minWidth: 170 }}>
        <Button
          variant="outlined"
          style={{ color: 'black', borderColor: 'black' }}
          size="small"
        >
          View Application
          <LaunchIcon />
        </Button>
      </TableCell>
    </TableRow>
  );
}
