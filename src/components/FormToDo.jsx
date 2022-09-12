// modules
import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import ToDo from "./ToDo";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

//styles
const Form = styled.form`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  max-width: 588px;
  width: 100%;
  @media (min-width: 710px) {
    padding: 0 1.5rem;
  }
`;
const InputAdd = styled.input`
  width: 20px;
  height: 20px;
  border-radius: 255px;
  background-color: transparent;
  border: ${(props) =>
    props.darkTheme === "dark"
      ? "1px solid var(--very-dark-grayish-blue)"
      : "1px solid var(--light-grayish-blue-hover)"};
  margin-right: 1rem;
  transition: 0.3s;
  @media (min-width: 710px) {
    width: 25px;
    height: 25px;
    margin-right: 1.5rem;
    cursor: pointer;
  }
`;

const InputText = styled.input`
  border: none;
  outline: none;
  font-size: 0.9rem;
  width: 100%;
  background-color: ${(props) =>
    props.darkTheme === "dark"
      ? "var(--very-dark-desaturated-blue)"
      : "hsl(0, 0%, 100%)"};
  transition: 0.3s;
  color: ${(props) =>
    props.darkTheme === "dark"
      ? "var(--light-grayish-blue)"
      : "var(--very-dark-grayish-blue)"};

  @media (min-width: 710px) {
    font-size: 1.125rem;
  }
`;
const DivForm = styled.div`
  display: flex;
  background-color: ${(props) =>
    props.darkTheme === "dark"
      ? "var(--very-dark-desaturated-blue)"
      : "var(--very-light-gray)"};
  width: 100%;
  align-items: center;
  border-radius: 0.4em;
  padding: 1.4rem;
  transition: 0.3s;
`;
const DivContainer = styled.div`
  margin: 1rem 1.5rem;
  max-width: 540px;
  width: 100%;
  @media (min-width: 710px) {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;
const Div = styled.div`
  background-color: ${(props) =>
    props.darkTheme === "dark"
      ? "var(--very-dark-desaturated-blue)"
      : "var(--very-light-gray)"};
  border-radius: 0.4em;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  @media (min-width: 710px) {
    box-shadow: none;
  }
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
  &:hover {
    color: var(--very-dark-grayish-blue);
  }
`;
const DivFilter = styled.div`
  background-color: ${(props) =>
    props.darkTheme === "dark"
      ? "var(--very-dark-desaturated-blue)"
      : "var(--very-light-gray)"};

  border-radius: 0.4em;
  margin-top: 2rem;
  display: flex;
  justify-content: space-evenly;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  @media (min-width: 710px) {
    display: none;
    box-shadow: none;
  }
`;
const ButtonFilter = styled.button`
  font-size: 0.9rem;
  font-weight: 700;
  transition: 0.3s;
  color: ${(props) =>
    props.activeButton ? "var(--bright-blue)" : "  var(--dark-grayish-blue);"};

  cursor: pointer;
  background: transparent;
  border: none;
  padding: 1rem;
  &:hover {
    color: ${(props) =>
      props.darkTheme == "dark"
        ? props.activeButton
          ? "var(--bright-blue)"
          : "var(--very-light-gray)"
        : props.activeButton
        ? "var(--bright-blue)"
        : "var(--very-dark-grayish-blue)"};
  }
  @media (min-width: 710px) {
    padding: 0 1rem;
  }
`;

const DivFilterDesktop = styled.div`
  display: none;
  @media (min-width: 710px) {
    display: block;
  }
`;

export default function FormToDo({ darkTheme }) {
  let componentOption = null;
  const objTest = [
    {
      id: 1,
      work: "Complete online JavaScript course",
      state: true,
    },
    {
      id: 2,
      work: "Jog around the park 3x",
      state: false,
    },
    {
      id: 3,
      work: "10 minutes meditation",
      state: false,
    },
    {
      id: 4,
      work: "Read for 1 hour",
      state: false,
    },
    {
      id: 5,
      work: "Pick up groceries",
      state: false,
    },
    {
      id: 6,
      work: "Complete Todo App on Frontend Mentor",
      state: false,
    },
  ];
  const [condition, setCondition] = useState("all");
  const [work, setWork] = useState("");
  const [form, setForm] = useState([]);
  const [allFilter, setAllFilter] = useState([]);
  const [completedFilter, setCompletedFilter] = useState([]);
  const [activeFilter, setActiveFilter] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("task")) {
      setForm(objTest);
      setAllFilter(objTest);
      setCompletedFilter(objTest);
      setActiveFilter(objTest);
    } else {
      let tempVar = JSON.parse(localStorage.getItem("task"));
      setForm(tempVar);
      setAllFilter(tempVar);
      setCompletedFilter(tempVar);
      setActiveFilter(tempVar);
    }
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    let workInfo = {
      id: Date.now(),
      work: work,
      state: false,
    };
    setForm([...form, workInfo]);
    setAllFilter([...form, workInfo]);
    setCompletedFilter([...form, workInfo]);
    setActiveFilter([...form, workInfo]);
    setWork("");
    localStorage.setItem("task", JSON.stringify([...form, workInfo]));
  };
  const handleRemoveTask = (id) => {
    let varTemp = [...form];
    let otherVar = varTemp.filter((item) => item.id !== id);
    setForm(otherVar);
    setAllFilter(otherVar);
    setCompletedFilter(otherVar);
    setActiveFilter(otherVar);
    localStorage.setItem("task", JSON.stringify(otherVar));
  };
  const handleEdit = (id) => {
    let varTemp = [...form];
    let otherVar = varTemp.find((item) => item.id === id);
    otherVar.state = !otherVar.state;
    setForm(varTemp);
    setAllFilter(varTemp);
    setCompletedFilter(varTemp);
    setActiveFilter(varTemp);
    localStorage.setItem("task", JSON.stringify(varTemp));
  };
  const handleClearCompleted = () => {
    let varTemp = [...form];
    let otherVar = varTemp.filter((item) => item.state !== true);
    setForm(otherVar);
    setAllFilter(otherVar);
    setCompletedFilter(otherVar);
    setActiveFilter(otherVar);
    localStorage.setItem("task", JSON.stringify(otherVar));
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
  const order = (arr, starti, endi) => {
    const result = [...arr];
    const [removed] = result.splice(starti, 1);
    result.splice(endi, 0, removed);
    return result;
  };
  if (condition == "all") {
    componentOption = (
      <>
        <ButtonFilter
          value="all"
          activeButton
          onClick={handleAllFilter}
          darkTheme={darkTheme}
        >
          All
        </ButtonFilter>
        <ButtonFilter
          value="activeb"
          onClick={handleActiveFilter}
          darkTheme={darkTheme}
        >
          Active
        </ButtonFilter>
        <ButtonFilter
          value="completedb"
          onClick={handleCompletedFilter}
          darkTheme={darkTheme}
        >
          Completed
        </ButtonFilter>
      </>
    );
  } else if (condition == "activeb") {
    componentOption = (
      <>
        <ButtonFilter
          onClick={handleAllFilter}
          value="all"
          darkTheme={darkTheme}
        >
          All
        </ButtonFilter>
        <ButtonFilter
          onClick={handleActiveFilter}
          value="activeb"
          activeButton
          darkTheme={darkTheme}
        >
          Active
        </ButtonFilter>
        <ButtonFilter
          onClick={handleCompletedFilter}
          value="completedb"
          darkTheme={darkTheme}
        >
          Completed
        </ButtonFilter>
      </>
    );
  } else {
    componentOption = (
      <>
        <ButtonFilter
          onClick={handleAllFilter}
          value="all"
          darkTheme={darkTheme}
        >
          All
        </ButtonFilter>
        <ButtonFilter
          onClick={handleActiveFilter}
          value="activeb"
          darkTheme={darkTheme}
        >
          Active
        </ButtonFilter>
        <ButtonFilter
          onClick={handleCompletedFilter}
          value="completedb"
          activeButton
          darkTheme={darkTheme}
        >
          Completed
        </ButtonFilter>
      </>
    );
  }

  return (
    <DragDropContext
      onDragEnd={(result) => {
        const { source, destination } = result;
        if (!destination) {
          return;
        }
        if (
          source.index === destination.index &&
          source.droppableId === destination.droppableId
        ) {
          return;
        }
        setForm((tempTodos) =>
          order(tempTodos, source.index, destination.index)
        );
        setAllFilter((tempTodos) =>
          order(tempTodos, source.index, destination.index)
        );
        setCompletedFilter((tempTodos) =>
          order(tempTodos, source.index, destination.index)
        );
        setActiveFilter((tempTodos) =>
          order(tempTodos, source.index, destination.index)
        );
        localStorage.setItem("task", JSON.stringify(form));
      }}
    >
      <Form onSubmit={handleClick}>
        <DivForm darkTheme={darkTheme}>
          <InputAdd
            type="button"
            value=""
            onClick={handleClick}
            darkTheme={darkTheme}
          />
          <InputText
            type="text"
            placeholder="Create a new todo..."
            value={work}
            onChange={(e) => setWork(e.target.value)}
            darkTheme={darkTheme}
          />
        </DivForm>
      </Form>
      <DivContainer>
        <Div darkTheme={darkTheme}>
          <Droppable droppableId="tasks">
            {(droppableProvided) => (
              <div
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                {form.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={`${item.id}`}
                    index={index}
                  >
                    {(draggableProvided) => (
                      <div
                        {...draggableProvided.draggableProps}
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.dragHandleProps}
                      >
                        <ToDo
                          darkTheme={darkTheme}
                          work={item.work}
                          state={item.state}
                          ident={item.id}
                          handleRemoveTask={handleRemoveTask}
                          handleEdit={handleEdit}
                        ></ToDo>
                      </div>
                    )}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
          <DivCount>
            <ParCount>{form.length} items left</ParCount>
            <DivFilterDesktop darkTheme={darkTheme}>
              {componentOption}
            </DivFilterDesktop>
            <ButtonClear onClick={handleClearCompleted}>
              Clear Completed
            </ButtonClear>
          </DivCount>
        </Div>
        <DivFilter darkTheme={darkTheme}>{componentOption}</DivFilter>
      </DivContainer>
    </DragDropContext>
  );
}
