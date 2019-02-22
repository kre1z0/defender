import React from "react";
import styled from "styled-components";

const Link = styled("a")`
  cursor: pointer;
  color: #00aaff;
  text-decoration: none;
  letter-spacing: normal;
  line-height: normal;
`;

const getUrl = value => {
  if (!value) {
    return;
  }

  const isHttp = value.toString().indexOf("http") === 0;
  const isWww = value.toString().indexOf("www") === 0;

  return isWww || isHttp ? value : `https://${value}`;
};

export const OutsideLink = ({ href, children, ...props }) => (
  <Link href={getUrl(href)} target="_blank" rel="noopener noreferrer" {...props}>
    {children}
  </Link>
);
