import React from "react";
import { IconToggle } from "@evergis/ui";

import { FiltersContainer, Title, FilterItem, Label } from "./styled";

const filters = [
  { id: "1", label: "Поесть и выпить", icon: "password-show" },
  { id: "2", label: "Спорт и экстрим", icon: "share" },
  { id: "3", label: "Развлечения и хобби", icon: "phone" },
  { id: "4", label: "Релакс", icon: "social_github" },
  { id: "5", label: "Стиль", icon: "image" }
];

export const Filters = ({ value, onFilterChange }) => {
  return (
    <FiltersContainer>
      <Title>Праздничное наступление</Title>
      {filters.map(({ id, label, icon }) => (
        <FilterItem key={id} onClick={() => onFilterChange(id)}>
          <IconToggle kind={icon} accent isSelected={id === value} />
          <Label>{label}</Label>
        </FilterItem>
      ))}
    </FiltersContainer>
  );
};
