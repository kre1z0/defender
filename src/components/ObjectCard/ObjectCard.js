import React from "react";
import { IconButton } from "@evergis/ui";

import { OutsideLink } from "../../components/Atoms/OutsideLink";
import { CardContainer, Header, Title, ChipsContainer, Chip, FieldValue } from "./styled";

export const ObjectCard = ({ title, zoomToFeature, onClose }) => {
  return (
    <CardContainer>
      <Header>
        <Title>Супербар</Title>
        <IconButton kind="zoom-to" onClick={zoomToFeature} />
        <IconButton kind="close" onClick={onClose} />
      </Header>
      <ChipsContainer>
        <Chip text="Парки для водных видов спорта" />
        <Chip text="Спортивные секции" />
        <Chip text="Фитнес-клубы" />
      </ChipsContainer>
      <FieldValue field="Адрес" value="г. Москва, ул. Куйбышева, д. 23, стр.2" />
      <FieldValue field="Телефон" value="+7 (495) 666 66 66" />
      <FieldValue field="Сайт" value={<OutsideLink>www.coolbar.ru</OutsideLink>} />
      <OutsideLink href="https://2gis.ru/moscow">Смотреть на 2GIS</OutsideLink>
    </CardContainer>
  );
};
