import React, { useEffect, useState } from "react";
import "./MultiDropdown.module.scss";

export type Option = {
  key: string;
  value: string;
};

export type MultiDropdownProps = {
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  disabled?: boolean;
  pluralizeOptions: (value: Option[]) => string;
};

export const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options,
  value,
  onChange,
  disabled,
  pluralizeOptions,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  const handleClickOption = (option: Option) => {
    setSelected((prevState) => {
      const connd = prevState.some((el) => el.key === option.key);
      if (connd) {
        const newState = prevState.filter((el) => el.key !== option.key);
        onChange(newState);
        return newState;
      }
      const newState = [...prevState, option];
      onChange([option]);
      return newState;
    });
  };

  return (
    <div>
      <div
        className="dropdown_wrapper"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {pluralizeOptions(selected)}{" "}
      </div>
      {isOpen && !disabled && (
        <div className="options_wrapper">
          {options.map((option) => {
            return (
              <span
                className="dropdown_option_wrapper"
                key={option.key}
                onClick={() => handleClickOption(option)}
              >
                {option.value}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};
