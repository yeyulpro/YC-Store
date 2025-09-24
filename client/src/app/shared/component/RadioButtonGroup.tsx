import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import type { ChangeEvent } from "react";

type Props = {
  options: { value: string; label: string }[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  selectedValue: string;
};
export default function RadioButtonGroup({
  options,
  onChange,
  selectedValue,
}: Props) {
  return (
    <FormControl>
      <RadioGroup onChange={onChange} value={selectedValue} sx={{ my: 0 }}>
        {options.map(({ value, label }) => (
          <FormControlLabel
            control={<Radio color="default" sx={{ py: 0.7 }} />}
            key={label}
            label={label}
            value={value}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
