// modules
import React from "react";
import styled from "styled-components";

//images
import deletetask from "../images/icon-cross.svg";
import checkstatus from "../images/icon-check.svg";

//styles
const Div = styled.div`
  display: flex;
`;
const Button = styled.button`
  width: 20px;
  height: 20px;
  background: ${(props) =>
    props.active ? "var(--check-background)" : "transparent"};
`;
const Par = styled.p``;
const Img = styled.img``;
const ImgCheck = styled.img``;
export default function ToDo({ work, state }) {
  return (
    <>
      <Div>
        {!state ? (
          <Button></Button>
        ) : (
          <Button active>
            <ImgCheck src={checkstatus} />
          </Button>
        )}
        {!state ? (
          <Par>{work}</Par>
        ) : (
          <Par active>
            <strike>
              <i>{work}</i>
            </strike>
          </Par>
        )}

        <Img src={deletetask} />
      </Div>
    </>
  );
}
