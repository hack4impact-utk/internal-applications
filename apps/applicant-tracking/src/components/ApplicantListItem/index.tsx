import { ApplicantResponse } from '@hack4impact-utk/internal-models';
import { Chip, TableCell, TableRow } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import Button from '@mui/material/Button';
interface ApplicantListItemProps {
  applicant: ApplicantResponse;
}
//Each row should display the applicant name (first and last), status, NetID and application
export default function ApplicantListItem(props: ApplicantListItemProps) {
  return (
    <TableRow>
      <TableCell align={'left'}>
        {props.applicant.firstName} {props.applicant.lastName}
      </TableCell>
      <TableCell align={'left'}>
        <Chip label={props.applicant.status} />
      </TableCell>
      <TableCell align={'left'}>{props.applicant.netid}</TableCell>
      <TableCell align={'left'}>
        <Button
          variant="outlined"
          color="inherit"
          size="small"
          endIcon={<LaunchIcon />}
        >
          View Application
        </Button>
      </TableCell>
    </TableRow>
  );
}
