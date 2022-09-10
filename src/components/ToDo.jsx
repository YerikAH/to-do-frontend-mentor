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
  padding: 1.39rem;
  border-bottom: ${(props) =>
    props.darkTheme === "dark"
      ? "1px solid var(--very-dark-grayish-blue)"
      : "1px solid var(--light-grayish-blue)"};

  transition: 0.3s;
  overflow: auto;
  &:hover img {
    opacity: 1;
  }
`;
const Button = styled.button`
  width: 20px;
  height: 20px;
  background: ${(props) =>
    props.active ? "var(--check-background)" : "transparent"};

  border-radius: 255px;
  border: ${(props) =>
    props.darkTheme === "dark"
      ? props.active
        ? "none"
        : "1px solid var(--very-dark-grayish-blue)"
      : props.active
      ? "none"
      : "1px solid var(--light-grayish-blue-hover)"};
  outline: none;
  margin-right: 10px;
  display: grid;
  place-items: center;
  place-content: center;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    border: ${(props) =>
      props.active ? "" : "1px solid rgba(86, 221, 255, 1)"};
  }
  @media (min-width: 710px) {
    width: 25px;
    height: 25px;
    margin-right: 1.5rem;
  }
`;
const GroupDiv = styled.div`
  display: flex;
`;
const Par = styled.p`
  color: ${(props) =>
    props.darkTheme === "dark"
      ? props.active
        ? "var(--dark-grayish-blue)"
        : "var(--light-grayish-blue)"
      : props.active
      ? "var(--light-grayish-blue)"
      : "var(--very-dark-grayish-blue)"};
  align-items: center;
  font-size: 0.9rem;
  display: flex;
  transition: 0.3s;
  @media (min-width: 710px) {
    font-size: 1.125rem;
  }
`;
const Img = styled.img`
  width: 14px;
  height: 14px;
  cursor: pointer;
  transition: 0.3s;
  opacity: 1;
  @media (min-width: 710px) {
    opacity: 0;
    width: 18px;
    height: 18px;
  }

  &:hover {
    opacity: 1;
  }
`;
const ImgCheck = styled.img``;
export default function ToDo({
  work,
  state,
  ident,
  handleRemoveTask,
  handleEdit,
  darkTheme,
}) {
  return (
    <>
      <Div darkTheme={darkTheme}>
        <GroupDiv>
          {!state ? (
            <Button
              darkTheme={darkTheme}
              onClick={() => handleEdit(ident)}
            ></Button>
          ) : (
            <Button
              darkTheme={darkTheme}
              active
              onClick={() => handleEdit(ident)}
            >
              <ImgCheck src={checkstatus} />
            </Button>
          )}
          {!state ? (
            <Par darkTheme={darkTheme}>{work}</Par>
          ) : (
            <Par active darkTheme={darkTheme}>
              <del>{work}</del>
            </Par>
          )}
        </GroupDiv>
        <Img src={deletetask} onClick={() => handleRemoveTask(ident)} />
      </Div>
    </>
  );
}
