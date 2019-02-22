import styled from "styled-components";

import { Blank } from "../../components/Atoms/Blank";

export const GridLegendContainer = styled(Blank)`
  align-items: center;
  height: 100%;
  padding: 0 20px;
  flex-direction: column;
  justify-content: center;
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
`;

export const ColorsContainer = styled("div")`
  display: flex;
  align-items: flex-end;
  flex-shrink: 0;
  flex-grow: 1;
`;

export const ColorItem = styled("div")`
  width: 57px;
  height: 8px;
  background-color: ${({ color }) => color};
  &:first-child {
    border-radius: 2px 0 0 2px;
  }
  &:last-child {
    border-radius: 0 2px 2px 0;
  }
`;

export const LabelsContainer = styled("div")`
  padding: 4px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Label = styled("span")`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.7);
`;
