import { DashboardListApplicantResponse } from '@hack4impact-utk/internal-models';
import { List, ListItem } from '@mui/material';
interface DashboardListProps {
  applicants: DashboardListApplicantResponse[];
}

export default function DashboardList(props: DashboardListProps) {
  return (
    <List>
      {props.applicants.map((applicant) => {
        return (
          <ListItem key={applicant._id}>
            {applicant.firstName} {applicant.lastName}
          </ListItem>
        );
      })}
    </List>
  );
}
