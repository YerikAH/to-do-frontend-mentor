// modules
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import ToDo from "./ToDo";

//styles
const Form = styled.form`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  padding: 0 1.5rem;
`;
const InputAdd = styled.input`
  width: 20px;
  height: 20px;
  border-radius: 255px;
  background-color: var(--very-light-gray);
  border: 1px solid var(--light-grayish-blue-hover);
  margin-right: 1rem;
`;
const InputText = styled.input`
  border: none;
  outline: none;
  font-size: 0.9rem;
`;
const DivForm = styled.div`
  display: flex;
  background-color: var(--very-light-gray);
  width: 100%;
  align-items: center;
  border-radius: 0.4em;
  padding: 1rem;
`;
const DivContainer = styled.div`
  padding: 1rem 1.5rem;
`;
const Div = styled.div`
  background-color: var(--very-light-gray);
  border-radius: 0.4em;
`;
const DivCount = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: space-between;
`;
const ParCount = styled.p`
  font-size: 0.9rem;
  color: var(--dark-grayish-blue);
`;
const ButtonClear = styled.button`
  border: none;
  background: transparent;
  font-size: 0.9rem;
  color: var(--dark-grayish-blue);
`;
const DivFilter = styled.div`
  background-color: var(--very-light-gray);
  border-radius: 0.4em;
  margin-top: 2rem;
  display: flex;
  justify-content: space-evenly;
`;
const ButtonFilter = styled.button`
  font-size: 0.9rem;
  font-weight: 700;
  color: ${(props) =>
    props.activeButton ? "var(--bright-blue)" : "  var(--dark-grayish-blue);"};

  cursor: pointer;
  background: transparent;
  border: none;
  padding: 1rem;
`;

export default function FormToDo() {
  let componentOption = null;
  const [work, setWork] = useState("");
  const [form, setForm] = useState([]);
  const [condition, setCondition] = useState("all");
  const [allFilter, setAllFilter] = useState([]);
  const [completedFilter, setCompletedFilter] = useState([]);
  const [activeFilter, setActiveFilter] = useState([]);
  const handleClick = (e) => {
    e.preventDefault();
    let workInfo = {
      id: Date.now(),
      work: work,
      state: false,
    };
    setForm([...form, workInfo]);
    setAllFilter(form);
    setCompletedFilter(form);
    setActiveFilter(form);
    setWork("");
  };
  const handleRemoveTask = (id) => {
    let varTemp = [...form];
    let otherVar = varTemp.filter((item) => item.id !== id);
    setForm(otherVar);
    setAllFilter(otherVar);
    setCompletedFilter(otherVar);
    setActiveFilter(otherVar);
  };
  const handleEdit = (id) => {
    let varTemp = [...form];
    let otherVar = varTemp.find((item) => item.id === id);
    otherVar.state = !otherVar.state;
    setForm(varTemp);
    setAllFilter(varTemp);
    setCompletedFilter(varTemp);
    setActiveFilter(varTemp);
  };
  const handleClearCompleted = () => {
    let varTemp = [...form];
    let otherVar = varTemp.filter((item) => item.state !== true);
    setForm(otherVar);
    setAllFilter(otherVar);
    setCompletedFilter(otherVar);
    setActiveFilter(otherVar);
  };
  const handleAllFilter = (e) => {
    setCondition(e.target.value);
    setForm(allFilter);
  };
  const handleCompletedFilter = (e) => {
    setCondition(e.target.value);
    let varTemp = [...completedFilter];
    let otherVar = varTemp.filter((item) => item.state === true);
    setForm(otherVar);
  };
  const handleActiveFilter = (e) => {
    setCondition(e.target.value);
    let varTemp = [...activeFilter];
    let otherVar = varTemp.filter((item) => item.state !== true);
    setForm(otherVar);
  };

  if (condition == "all") {
    componentOption = (
      <>
        <ButtonFilter value="all" activeButton onClick={handleAllFilter}>
          All
        </ButtonFilter>
        <ButtonFilter value="activeb" onClick={handleActiveFilter}>
          Active
        </ButtonFilter>
        <ButtonFilter value="completedb" onClick={handleCompletedFilter}>
          Completed
        </ButtonFilter>
      </>
    );
  } else if (condition == "activeb") {
    componentOption = (
      <>
        <ButtonFilter onClick={handleAllFilter} value="all">
          All
        </ButtonFilter>
        <ButtonFilter onClick={handleActiveFilter} value="activeb" activeButton>
          Active
        </ButtonFilter>
        <ButtonFilter onClick={handleCompletedFilter} value="completedb">
          Completed
        </ButtonFilter>
      </>
    );
  } else {
    componentOption = (
      <>
        <ButtonFilter onClick={handleAllFilter} value="all">
          All
        </ButtonFilter>
        <ButtonFilter onClick={handleActiveFilter} value="activeb">
          Active
        </ButtonFilter>
        <ButtonFilter
          onClick={handleCompletedFilter}
          value="completedb"
          activeButton
        >
          Completed
        </ButtonFilter>
      </>
    );
  }

  return (
    <>
      <Form onSubmit={handleClick}>
        <DivForm>
          <InputAdd type="button" value="" onClick={handleClick} />
          <InputText
            type="text"
            placeholder="Create a new todo..."
            value={work}
            onChange={(e) => setWork(e.target.value)}
          />
        </DivForm>
      </Form>

      <DivContainer>
        <Div>
          {form.map((item) => (
            <ToDo
              key={item.id}
              work={item.work}
              state={item.state}
              ident={item.id}
              handleRemoveTask={handleRemoveTask}
              handleEdit={handleEdit}
            />
          ))}
          <DivCount>
            <ParCount>{form.length} items left</ParCount>
            <ButtonClear onClick={handleClearCompleted}>
              Clear Completed
            </ButtonClear>
          </DivCount>
        </Div>
        <DivFilter>{componentOption}</DivFilter>
      </DivContainer>
    </>
  );
}
