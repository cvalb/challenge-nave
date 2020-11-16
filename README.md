# nave.rs Front-end challenge

Read this in other language: [English](https://github.com/cvalb/challenge-nave/blob/main/README.md), [Portuguese](https://github.com/cvalb/challenge-nave/blob/main/README.pt.md)

## Description

This project is a challenge created by [nave.rs](https://nave.rs/).This is also my first project using React and Sass.

## Instalation

1. Install Node dependencies

        npm install

## Objective

The challenge's objective was to create a responsive single page application using any framework/library or pure JavaScript, integrating their API.

## 0.1.0

Fully functional.

### Next steps

- The employee modal isn't using the show request, as requested by the challenge;
  - I found out that instead of using the show request, setting the employee object to a state would save requisition to the API, making it more scalable;
- When deleting an employee, could not reload the main list. Tried to set state variables to do so;
- Each modal should be a component;
- Refactor functions to be called from outside, making the code more legible;

### Fixed

- 12/11/2020
  - List now reloading after deleting an employee by adjusting useEffect;
  - Refactor functions variables;

- 15/11/2020
  - Refactor API requests;