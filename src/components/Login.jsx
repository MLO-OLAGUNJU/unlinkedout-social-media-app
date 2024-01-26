import React from "react";
import styled from "styled-components";

const Login = () => {
  return (
    <div className="container">
      <Nav>
        <a href="/">
          <img src="/images/unlink.png" alt="" />
        </a>
      </Nav>
    </div>
  );
};

const Container = styled.div`
  padding: 0px;
`;

const Nav = styled.nav`
  max-width: 1128px;
  margin: auto;
  padding: 12px 0 16;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-wrap: nowrap;
  & > a {
    width: 135px;
    height: 354px;
  }
`;
export default Login;
