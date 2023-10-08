/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Select from "react-select";

interface DropdownSelectProps {
  placholder: string;
  value?: string;
  options: DropdownSelectData[];
  maxHeight?: number;
  onChange: (value: string) => void;
}

interface DropdownSelectData {
  value: string;
  label: string;
}

const DropdownSelect = ({
  placholder,
  value,
  options,
  maxHeight = 120,
  onChange,
}: DropdownSelectProps) => {
  return (
    <Select
      maxMenuHeight={maxHeight}
      placeholder={placholder}
      isClearable
      options={options}
      value={value}
      onChange={(value) => {
        onChange(value && value.value);
      }}
      formatOptionLabel={(option: any) => (
        <div className="flex flex-row items-start gap-1 text-sm">
          <div>{option.label}</div>
        </div>
      )}
      classNames={{
        control: () => "p-1 border-1",
        input: () => "text-sm",
        option: () => "text-sm",
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 6,
        colors: {
          ...theme.colors,
          primary: "#5a8fd7",
          primary25: "#ffffff",
        },
        
      })}
    />
  );
};

export default DropdownSelect;
