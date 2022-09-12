//module

import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";

// images
import lightImageDesktop from "../images/bg-desktop-light.jpg";
import darkImageDesktop from "../images/bg-desktop-dark.jpg";

import lightImageMobile from "../images/bg-mobile-light.jpg";
import darkImageMobile from "../images/bg-mobile-dark.jpg";

import sun from "../images/icon-sun.svg";
import moon from "../images/icon-moon.svg";
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
  @media (min-width: 710px) {
    height: 300px;
    filter: brightness(1);
  }
`;
const Nav = styled.nav`
  width: 100vw;
  position: relative;
  padding: 3rem 1.5rem 0 1.5rem;
  justify-content: center;
  display: flex;
  align-items: center;
  @media (min-width: 710px) {
    padding: 5rem 1.5rem 0 1.5rem;
  }
`;
const Ul = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 535px;
  width: 100%;
`;
const H1 = styled.h1`
  letter-spacing: 0.4em;
  color: ${(props) =>
    //Is same, i know <
    props.darkTheme === "dark"
      ? "var(--very-light-gray)"
      : "  var(--very-light-gray)"};

  font-size: 1.7rem;
  @media (min-width: 710px) {
    font-size: 2.3rem;
  }
`;
const Button = styled.button`
  border: none;
  background: transparent;
  outline: none;
  cursor: pointer;
`;
const Advice = styled.span`
  text-align: center;
  width: 100%;
  display: block;
  font-size: 0.875rem;
  margin: 2rem 0;
  color: var(--dark-grayish-blue);
`;
export default function DarkMode() {
  const [validationMedia, setValidationMedia] = useState(false);
  const [iconChange, setIconChange] = useState(sun);
  const [darkTheme, setDarkTheme] = useState("dark");
  let style = document.documentElement.style;
  //Validation media query
  useEffect(() => {
    if (screen.width < 500) {
      console.log(screen.width);
      setValidationMedia(false);
    } else {
      console.log(screen.width);
      setValidationMedia(true);
    }
  }, [window.innerWidth]);
  useEffect(() => {
    if (!localStorage.getItem("darkMode")) {
      localStorage.setItem("darkMode", "false");
    } else {
      if (localStorage.getItem("darkMode") === "false") {
        setDarkTheme("dark");
        setIconChange(sun);
        style.setProperty("--only-father", "hsl(235, 21%, 11%)");
      } else {
        setDarkTheme("light");
        setIconChange(moon);
        style.setProperty("--only-father", "hsl(240, 12%, 97%)");
      }
    }
  }, []);

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

  const backDesktopDark = {
    backgroundImage: `url(${darkImageDesktop})`,
  };
  const backMobileDark = {
    backgroundImage: `url(${darkImageMobile})`,
  };

  const handleClick = () => {
    if (darkTheme === "dark") {
      setDarkTheme("light");
      localStorage.setItem("darkMode", "true");
      setIconChange(moon);
      style.setProperty("--only-father", "hsl(240, 12%, 97%)");
    } else {
      setDarkTheme("dark");
      localStorage.setItem("darkMode", "false");
      setIconChange(sun);
      style.setProperty("--only-father", "hsl(235, 21%, 11%)");
    }
  };
  return (
    <>
      <div className={darkTheme}>
        <header>
          <DivImg className="responsive-img" darkTheme={darkTheme}>
            {darkTheme === "dark" ? (
              validationMedia ? (
                <ImgMutant alt="" style={backDesktopDark} />
              ) : (
                <ImgMutant alt="" style={backMobileDark} />
              )
            ) : validationMedia ? (
              <ImgMutant alt="" style={backDesktop} />
            ) : (
              <ImgMutant alt="" style={backMobile} />
            )}
          </DivImg>
          <Nav>
            <Ul>
              <H1 darkTheme={darkTheme}>TODO</H1>
              <Button>
                <img
                  src={iconChange}
                  alt="button darkmode"
                  onClick={handleClick}
                />
              </Button>
            </Ul>
          </Nav>
        </header>
        <main>
          <FormToDo darkTheme={darkTheme} />
        </main>
        <footer>
          {" "}
          <Advice>Drag and drop to reorder list</Advice>
        </footer>
      </div>
    </>
  );
}
