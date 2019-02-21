import styled from "styled-components";
import { H3 } from "@evergis/ui";

import { Blank } from "../../components/Atoms/Blank";

export const FiltersContainer = styled(Blank)`
  width: 316px;
  z-index: 4;
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 20px;
  flex-direction: column;
`;

export const Title = styled(H3)`
  margin-top: 0;
`;
