import React from "react";
import { IconToggle } from "@evergis/ui";

import { FiltersContainer, Title, FilterItem, Label, Attention } from "./styled";

const filters = [
  { id: "1", label: "Поесть и выпить", icon: "phone", iconCode: "\\e978" },
  { id: "2", label: "Спорт и экстрим", icon: "phone", iconCode: "\\e97d" },
  { id: "3", label: "Развлечения и хобби", icon: "phone", iconCode: "\\e97a" },
  { id: "4", label: "Релакс", icon: "phone", iconCode: "\\e97b" },
  { id: "5", label: "Стиль", icon: "phone", iconCode: "\\e97c" }
];

export const Filters = ({ value, onFilterChange, onZoomToPoints, isVisible }) => {
  return (
    <FiltersContainer>
      <Title>
        Праздничное наступление
        <Attention isVisible={isVisible} onClick={() => onZoomToPoints()}>
          Приблизьте карту, чтобы увидеть объекты
        </Attention>
      </Title>
      {filters.map(({ id, label, icon, iconCode }) => (
        <FilterItem key={id} onClick={() => onFilterChange(id)} iconCode={iconCode}>
          <IconToggle kind={icon} accent isSelected={id === value} />
          <Label>{label}</Label>
        </FilterItem>
      ))}
    </FiltersContainer>
  );
};
