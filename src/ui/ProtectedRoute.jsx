import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useEffect } from "react";

// eslint-disable-next-line no-undef
const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ProtectedRoute({ children }) {
  // 1. Load authenticated user
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();


  // 2. If there is no authenticated user, redirect to the login page
  useEffect(function () {
    if (!isAuthenticated && !isLoading) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  // 3. While is loading, show a spinner
  if (isLoading) return (
    <FullPage>
      <Spinner />
    </FullPage>
  );

  // 4. If there is a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;