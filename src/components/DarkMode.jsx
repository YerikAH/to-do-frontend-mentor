//module

import React, { useEffect } from "react";
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
  color: ${(props) =>
    //Is same, i know
    props.darkTheme === "dark"
      ? "var(--very-light-gray)"
      : "  var(--very-light-gray)"};

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
  const [iconChange, setIconChange] = useState(sun);
  const [darkTheme, setDarkTheme] = useState("dark");
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
    let style = document.documentElement.style;
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
      </div>
    </>
  );
}
