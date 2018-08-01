import React from "react";
import styled from "styled-components";

// language=LESS
const NotFoundPage = styled.div`// styled
  & {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    font-size: 32px;
    background-color: #f1f1f1;
  }
`;

const Floor = styled.div`// styled
  & {
    color: #fff;
    text-align: center;
    font-size: 128px;
    font-weight: bold;
    font-family: Helvetica;
    text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0, 0, 0, .1), 0 0 5px rgba(0, 0, 0, .1), 0 1px 3px rgba(0, 0, 0, .3), 0 3px 5px rgba(0, 0, 0, .2), 0 5px 10px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .2), 0 20px 20px rgba(0, 0, 0, .15);
  }
`;

const Lost = styled.h1`// styled
  & {
    font-size: 32px;
  }
`;

const Link = styled.a`// styled
  & {
    font-size: 16px;
    display: inline-block;
    margin: 16px;
  }
`;

export const NotFound = () =>
    <NotFoundPage>
        <Floor>404</Floor>
        <Lost>You are lost&hellip;</Lost>
        <div>
            <Link href="javascript:history.back()">Go Back</Link>
            <Link href="/">Go Home</Link>
        </div>
    </NotFoundPage>;

