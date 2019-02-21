import React from "react";
import { Chip, IconButton } from "@evergis/ui";

import { CardContainer, Header, Title, ChipsContainer } from "./styled";

export const ObjectCard = ({ title }) => {
  return (
    <CardContainer>
      <Header>
        <Title>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aspernatur corporis cupiditate, doloribus
          ducimus excepturi harum libero nesciunt nobis odit officiis quas quis quo reiciendis, saepe sequi temporibus
          unde ut!
        </Title>
        <IconButton kind="zoom-to" />
        <IconButton kind="close" />
      </Header>
      <ChipsContainer>
        <Chip text="Парки для водных видов спорта" />
        <Chip text="Спортивные секции" />
        <Chip text="Фитнес-клубы" />
      </ChipsContainer>
    </CardContainer>
  );
};
