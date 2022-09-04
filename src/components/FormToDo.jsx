// modules
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import ToDo from "./ToDo";

//styles
const Form = styled.form`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  padding: 0 1.5rem;
`;
const InputAdd = styled.input`
  width: 20px;
  height: 20px;
  border-radius: 255px;
  background-color: var(--very-light-gray);
  border: 1px solid var(--very-dark-grayish-blue);
  margin-right: 1rem;
`;
const InputText = styled.input`
  border: none;
  outline: none;
`;
const DivForm = styled.div`
  display: flex;
  background-color: var(--very-light-gray);
  width: 100%;
  align-items: center;
  border-radius: 0.5em;
  padding: 1rem;
`;
const DivContainer = styled.div``;
const Div = styled.div`
  background-color: var(--very-light-gray);
`;

export default function FormToDo() {
  const [work, setWork] = useState("");
  const [form, setForm] = useState([]);
  const handleClick = (e) => {
    //I don't know if this has any effect
    e.preventDefault();
    let workInfo = {
      id: Date.now(),
      work: work,
      state: false,
    };
    setForm([...form, workInfo]);
  };

  return (
    <>
      <Form action="">
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
            <ToDo key={item.id} work={item.work} state={item.state} />
          ))}
        </Div>
      </DivContainer>
    </>
  );
}
