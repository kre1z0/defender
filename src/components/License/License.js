import React from "react";

import { LicenseContainer } from "./styled";

export const License = () => {
  return (
    <LicenseContainer>
      Работает на API{" "}
      <a href="http://www.everpoint.ru/#&panel1-1" target="_blank">
        EverGIS
      </a>{" "}
      | Данные предоставлены{" "}
      <a href="https://2gis.ru" target="_blank">
        2GIS
      </a>{" "}
      | Map tiles by{" "}
      <a href="http://stamen.com" target="_blank">
        Stamen Design
      </a>
      , under{" "}
      <a href="http://creativecommons.org/licenses/by/3.0" target="_blank">
        CC BY 3.0
      </a>
      . Data by{" "}
      <a href="http://openstreetmap.org" target="_blank">
        OpenStreetMap
      </a>
      , under{" "}
      <a href="http://www.openstreetmap.org/copyright" target="_blank">
        ODbLв
      </a>
    </LicenseContainer>
  );
};
