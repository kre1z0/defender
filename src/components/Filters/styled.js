import styled from "styled-components";
import { H3 } from "@evergis/ui";

import { Blank } from "../../components/Atoms/Blank";

export const FiltersContainer = styled(Blank)`
  width: 316px;
  z-index: 4;
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 20px 20px 30px 20px;
  flex-direction: column;
`;

export const Title = styled(H3)`
  margin: 0 0 25px 0;
`;

export const FilterItem = styled("div")`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const Label = styled("span")`
  font-size: 12px;
  margin-left: 8px;
`;
