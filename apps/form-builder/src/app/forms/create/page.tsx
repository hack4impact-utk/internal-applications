//This is the modified page to show dropdown
import MultipleChoiceOptions from '@/components/MultipleChoiceOptions';

export default function NewFormPage() {
  return (
    <div>
      <MultipleChoiceOptions
        onChange={(value) => console.log(`Selected: ${value}`)}
      />
    </div>
  );
}

//This is the original Code
//export default async function NewFormPage() {
//  return <h1>New form page</h1>;
//}
