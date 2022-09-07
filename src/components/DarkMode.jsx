//module

import React from "react";
import styled from "styled-components";

// images
import lightImageDesktop from "../images/bg-desktop-light.jpg";
import darkImageDesktop from "../images/bg-desktop-dark.jpg";

import lightImageMobile from "../images/bg-mobile-light.jpg";
import darkImageMobile from "../images/bg-mobile-dark.jpg";

import sun from "../images/icon-sun.svg";
import moon from "../images/icon-moon.svg";
import { useState } from "react";
import FormToDo from "./FormToDo";

// styles
const DivImg = styled.div`
  position: absolute;
  z-index: 0;
  width: 100vw;
`;
const ImgMutant = styled.img`
  width: 100%;
  height: 220px;
  background-size: cover;
  filter: brightness(1.1);
  @media (min-width: 500px) {
    height: 250px;
  }
`;
const Nav = styled.nav`
  width: 100vw;
  position: relative;
  padding: 3rem 1.5rem 0 1.5rem;
  justify-content: center;
  display: flex;
  align-items: center;
`;
const Ul = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 610px;
  width: 100%;
`;
const H1 = styled.h1`
  letter-spacing: 0.4em;
  color: var(--very-light-gray);
  font-size: 1.7rem;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  outline: none;
  cursor: pointer;
`;
export default function DarkMode() {
  const [validationMedia, setValidationMedia] = useState(false);
  const [iconChange, setIconChange] = useState(moon);

  //Validation media query
  document.addEventListener("DOMContentLoaded", (e) => {
    if (screen.width < 500) {
      console.log(screen.width);
      setValidationMedia(false);
    } else {
      console.log(screen.width);
      setValidationMedia(true);
    }
  });
  window.addEventListener("resize", (e) => {
    if (window.innerWidth < 500) {
      setValidationMedia(false);
    } else {
      setValidationMedia(true);
    }
  });

  const backDesktop = {
    backgroundImage: `url(${lightImageDesktop})`,
  };
  const backMobile = {
    backgroundImage: `url(${lightImageMobile})`,
  };
  return (
    <>
      <div>
        <header>
          <DivImg className="responsive-img">
            {validationMedia ? (
              <ImgMutant alt="" style={backDesktop} />
            ) : (
              <ImgMutant alt="" style={backMobile} />
            )}
          </DivImg>
          <Nav>
            <Ul>
              <H1>TODO</H1>
              <Button>
                <img src={iconChange} alt="button darkmode" />
              </Button>
            </Ul>
          </Nav>
        </header>
        <main>
          <FormToDo />
        </main>
      </div>
    </>
  );
}
