import styled from "styled-components";
import { H3, Chip as ChipUI, FieldValue as FieldValueUI, PaginationSimple as PaginationSimpleUI } from "@evergis/ui";

import { Blank } from "../../components/Atoms/Blank";

export const CardContainer = styled(Blank)`
  max-width: 360px;
  width: 100%;
  padding: 20px;
  position: absolute;
  z-index: 4;
  top: 20px;
  right: 20px;
  flex-direction: column;
  transition: opacity 144ms ease;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
`;

export const Header = styled("div")`
  display: flex;
  margin: 0 0 5px 0;
`;

export const Title = styled(H3)`
  margin: 0;
  flex-grow: 1;
  display: flex;
  align-items: center;
`;

export const ChipsContainer = styled("div")`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 15px;
`;

export const Chip = styled(ChipUI)`
  margin-right: 10px;
  margin-bottom: 10px;
`;

export const FieldValue = styled(FieldValueUI)`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 20px;
  > span:first-of-type {
    display: block;
  }
`;

export const PaginationSimple = styled(PaginationSimpleUI)`
  align-self: flex-start;
`;
