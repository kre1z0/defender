import React from "react";
import { IconButton } from "@evergis/ui";

import { OutsideLink } from "../../components/Atoms/OutsideLink";
import { CardContainer, Header, Title, PaginationSimple, ChipsContainer, Chip, FieldValue } from "./styled";

export const ObjectCard = props => {
  const {
    isVisible,
    name,
    address,
    site,
    site_2gis,
    phone,
    rubrics_te,
    zoomToFeature,
    onClose,
    currentPage,
    extent,
    pageCount,
    onPrevObject,
    onNextObject
  } = props;

  const rubrics = rubrics_te && rubrics_te.split(";");

  return (
    <CardContainer isVisible={isVisible}>
      <Header>
        <Title>{name}</Title>
        {pageCount > 1 && (
          <PaginationSimple
            currentPage={currentPage}
            pageCount={pageCount}
            onPrev={onPrevObject}
            onNext={onNextObject}
          />
        )}
        {/*<IconButton kind="zoom-to" onClick={() => zoomToFeature(extent)} />*/}
        <IconButton kind="close" onClick={onClose} />
      </Header>
      <ChipsContainer>
        {rubrics && rubrics.map((rubric, index) => <Chip key={`${rubric}-${index}`} text={rubric} />)}
      </ChipsContainer>
      <FieldValue field="Адрес" value={address} />
      {site && site !== "-" && <FieldValue field="Сайт" value={<OutsideLink href={site}>{site}</OutsideLink>} />}
      {phone && phone !== "-" && <FieldValue field="Телефон" value={phone} />}
      {site_2gis && site_2gis !== "-" && <OutsideLink href={site_2gis}>Смотреть на 2GIS</OutsideLink>}
    </CardContainer>
  );
};
