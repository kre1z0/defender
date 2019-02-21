import styled from "styled-components";
import { H3 } from "@evergis/ui";

import { Blank } from "../../components/Atoms/Blank";

export const CardContainer = styled(Blank)`
  max-width: 360px;
  padding: 20px;
  position: absolute;
  z-index: 4;
  top: 20px;
  right: 20px;
  flex-direction: column;
`;

export const Header = styled("div")`
  display: flex;
  align-items: center;
  margin: 0 0 5px 0;
`;

export const Title = styled(H3)`
  margin: 0;
  flex-shrink: 0;
  flex-grow: 1;
`;

export const ChipsContainer = styled("div")`
  display: flex;
`;
