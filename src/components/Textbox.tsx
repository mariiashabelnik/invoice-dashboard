import { TextField } from "@mui/material";
export const Textbox = ({ label, title, color }: TextboxProps) => {
  return (
    <>
      <TextField label={label} />
      <div style={{ color: color }}>{title}</div>
    </>
  );
};
