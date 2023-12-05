import { FormQuestionResponse, FormSubmissionResponse } from "@hack4impact-utk/internal-models";
import { List, ListItem, ListItemText } from "@mui/material";


interface Props{
    question: FormQuestionResponse,
    responses: FormSubmissionResponse[]
}

export default function TextQuestionAnalytics({question, responses}: Props){
    console.log(question)
    return (
        <List
        sx = {{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            position: "relative",
            overflow: "auto",
            maxHeight: 300,
            "& ul": { padding: 0 }
        }}
        subheader = {<li/>}
        >
            <ListItem>
                <ListItemText>
                    <ul>
                        {responses.map(item => <li>{item.questionResponses[1].answer}</li>)} 
                    </ul>
                </ListItemText>
        </ListItem>
    </List>
  );
}