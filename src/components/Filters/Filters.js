import React from "react";
import { darkTheme, ThemeProvider, RadioGroup, IconToggle } from "@evergis/ui";

import { FiltersContainer, Title } from "./styled";

const filters = [
  { id: "1", label: "Поесть и выпить", icon: "" },
  { id: "2", label: "Спорт и экстрим", icon: "" },
  { id: "3", label: "Развлечения и хобби", icon: "" },
  { id: "4", label: "Релакс", icon: "" },
  { id: "5", label: "Стиль", icon: "" }
];

export const Filters = ({ value, onFilterChange }) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <FiltersContainer>
        <Title>Праздничное наступление</Title>
        <RadioGroup name="filters" value={value} onChange={onFilterChange} column>
          {filters.map(({ label }) => (
            <IconToggle kind="zoom">{label}</IconToggle>
          ))}
        </RadioGroup>
      </FiltersContainer>
    </ThemeProvider>
  );
};
