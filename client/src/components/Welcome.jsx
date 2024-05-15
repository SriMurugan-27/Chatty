import React from "react";
import styled from "styled-components";

export default function Welcome({ currentUser }) {
  return (
    <Container>
      <img
        src="https://media.tenor.com/DcDYpWonGbIAAAAi/budding-pop-cute.gif"
        alt="hello.gif"
      />
      <h1>
        Welcome, <span>{currentUser.username}!</span>
      </h1>
      <h3>Please select a chat to start messaging !!!</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  gap: 0.5rem;

  img {
    height: 15rem;
  }

  span {
    color: #4e00ff;
  }
`;
