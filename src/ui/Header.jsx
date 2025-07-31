import React from 'react';
import styled from 'styled-components';
import Logaout from '../features/authentication/Logaout';

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
`;

function Header() {
  return <StyledHeader>
    <Logaout />
  </StyledHeader>;
}

export default Header;
