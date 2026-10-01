import { Link } from "tensile";
import { Example } from "./Example";

const base = import.meta.env.BASE_URL;

export function Forms() {
  return (
    <>
      <section id="modes">
        <h2>Controlled or uncontrolled</h2>
        <p>Every value works like a native input. Pass <code>value</code> and <code>onValueChange</code> to keep it in your state. Leave <code>value</code> out and the component keeps it, starting from <code>defaultValue</code>. The callback runs either way.</p>
        <p>The names follow the value: <code>checked</code> and <code>defaultChecked</code> for Toggle and Checkbox, <code>open</code> and <code>defaultOpen</code> for overlays. Values that mirror something outside the component, such as a video's time, are controlled only.</p>
        <Example label="Uncontrolled form" code={`import { Button, Field, Input, Select, Toggle } from "tensile";

const teams = [
  { value: "design", label: "Design" },
  { value: "engineering", label: "Engineering" },
];

export function Settings() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data.get("email"), data.get("team"), data.get("digest"));
      }}
    >
      <Field label="Email">
        <Input type="email" name="email" autoComplete="email" />
      </Field>
      <Field label="Team">
        <Select name="team" options={teams} defaultValue="design" />
      </Field>
      <Toggle label="Weekly digest" name="digest" />
      <Button type="submit">Save</Button>
    </form>
  );
}`} />
      </section>
      <section id="form-data">
        <h2>Form data</h2>
        <p>Input, Textarea, Checkbox, Toggle, RadioGroup and ColorSwatches render native inputs, so <code>name</code>, <code>required</code>, <code>disabled</code> and <code>autoComplete</code> work as usual.</p>
        <p>Composite controls, such as Select, MultiSelect, DatePicker, Slider, TimePicker, ColorPicker, TagInput and OTPInput, take <code>name</code> and render hidden inputs. <code>new FormData(form)</code> holds their values.</p>
      </section>
      <section id="reset">
        <h2>Reset</h2>
        <p>Uncontrolled values don't follow a native form reset. If your form has a reset button, keep its values in state and set them back in the form's <code>onReset</code>; the hidden inputs follow.</p>
      </section>
      <section id="field">
        <h2>Labels and errors</h2>
        <p><Link href={`${base}docs/field/`}>Field</Link> gives one control a visible label, a description and an error, and wires <code>aria-labelledby</code>, <code>aria-describedby</code> and <code>aria-invalid</code>. Text controls draw the label inside their shape by default; pass <code>labelPlacement="above"</code> to put it on top.</p>
        <p><Link href={`${base}docs/fieldset/`}>Fieldset</Link> groups controls under a legend and can disable all of them. TextField and Checkbox have their own visible label, so they don't go inside a Field.</p>
      </section>
      <section id="validation">
        <h2>Validation</h2>
        <p>Validate in your submit handler and pass the message to Field's <code>error</code>. Set <code>noValidate</code> on the form, or the browser shows its own bubbles for required fields. Move focus to the first invalid control yourself.</p>
        <p>Errors are linked to their control, but not announced the moment they appear. See <Link href={`${base}docs/patterns/#field`}>a field with validation</Link>.</p>
      </section>
    </>
  );
}
