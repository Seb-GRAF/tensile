import { Button, Card, Field, Input, Select, Tabs } from "tensile";
import { Settings } from "./Settings";

const teams = [
  { value: "design", label: "Design" },
  { value: "engineering", label: "Engineering" },
];

export default function Page() {
  return (
    <main>
      <Card>
        <form style={{ display: "grid", gap: 16, padding: 24 }}>
          <Field label="Email">
            <Input type="email" name="email" autoComplete="email" />
          </Field>
          <Field label="Team">
            <Select name="team" options={teams} defaultValue="design" />
          </Field>
          <Settings />
          <Button type="submit">Save</Button>
        </form>
      </Card>
      <Tabs
        items={[
          { value: "overview", label: "Overview", content: <p>Rendered on the server.</p> },
          { value: "activity", label: "Activity", content: <p>Switched on the client.</p> },
        ]}
      />
    </main>
  );
}
