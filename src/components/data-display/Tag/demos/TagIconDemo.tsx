import { Tag, Icon } from "tensile";

export function TagIconDemo() {
  return (
    <Tag
      label="Design"
      icon={
        <Icon size={14}>
          <path d="m4 16 12-12 4 4L8 20H4Z" />
        </Icon>
      }
    />
  );
}
