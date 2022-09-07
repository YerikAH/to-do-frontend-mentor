// modules
import React from "react";
import styled from "styled-components";

//images
import deletetask from "../images/icon-cross.svg";
import checkstatus from "../images/icon-check.svg";

//styles
const Div = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid var(--light-grayish-blue);
  overflow: auto;
`;
const Button = styled.button`
  width: 20px;
  height: 20px;
  background: ${(props) =>
    props.active ? "var(--check-background)" : "transparent"};

  border-radius: 255px;
  border: ${(props) =>
    props.active ? "none" : "1px solid var(--light-grayish-blue-hover)"};

  outline: none;
  margin-right: 10px;
  display: grid;
  place-items: center;
  place-content: center;
  cursor: pointer;
`;
const GroupDiv = styled.div`
  display: flex;
`;
const Par = styled.p`
  color: ${(props) =>
    props.active
      ? "var(--light-grayish-blue)"
      : "var(--very-dark-grayish-blue)"};
  align-items: center;
  font-size: 0.9rem;
  display: flex;
`;
const Img = styled.img`
  width: 14px;
  height: 14px;
  cursor: pointer;
`;
const ButtonDelete = styled.button`
  background: transparent;
  border: none;
`;
const ImgCheck = styled.img``;
export default function ToDo({
  work,
  state,
  ident,
  handleRemoveTask,
  handleEdit,
}) {
  return (
    <>
      <Div>
        <GroupDiv>
          {!state ? (
            <Button onClick={() => handleEdit(ident)}></Button>
          ) : (
            <Button active onClick={() => handleEdit(ident)}>
              <ImgCheck src={checkstatus} />
            </Button>
          )}
          {!state ? (
            <Par>{work}</Par>
          ) : (
            <Par active>
              <del>{work}</del>
            </Par>
          )}
        </GroupDiv>

        <Img src={deletetask} onClick={() => handleRemoveTask(ident)} />
      </Div>
    </>
  );
}
