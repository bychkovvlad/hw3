import React, { useEffect, useState } from "react";

import styles from "./SingleDropdown.module.scss";

export type Option = {
  value: string;
};

export type SingleDropdownProps = {
  options: string[];
  value?: string;
  onOptionClick: (option: string | undefined) => void;
  className?: string;
};

export const SingleDropdown: React.FC<SingleDropdownProps> = ({
  options,
  value,
  onOptionClick,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | undefined>(value);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  const handleClickOption = (option: string) => {
    if (option === selected) {
      onOptionClick(undefined);
      setSelected(undefined);
    } else {
      onOptionClick(option);
      setSelected(option);
    }
    setIsOpen(false);
  };

  return (
    <div className={className}>
      <div
        className={styles.dropdown_wrapper}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <img
          className={styles.filterIcon}
          src={"../images/filter.svg"}
          alt="filterIcon"
        />
        {selected || "Filter"}
      </div>
      {isOpen && (
        <div className={styles.options_wrapper}>
          {options.map((option) => {
            return (
              <span
                className={styles.dropdown_option_wrapper}
                onClick={() => handleClickOption(option)}
              >
                {option}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};
