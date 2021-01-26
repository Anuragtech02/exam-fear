import React, { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext([]);

const GlobalContextProvider = ({ children }) => {
  const [data, setData] = useState([
    {
      id: 0,
      complete: true,
      parts: [
        {
          title:
            "Differentiate among JDK, JRE and JVM. Why java is called platform independent?",
          answer: "",
          answerType: "text",
          complete: true,
        },
        {
          title:
            "Define constructor? When do we need Constructor Overloading? What are private constructors and where are they used?",
          answer: "",
          answerType: "image",
          complete: true,
        },
        {
          title:
            "Write a program to test the following method that returns digit number k of the positive integer n:",
          answer: "",
          answerType: "link",
          complete: true,
        },
      ],
    },
    {
      id: 1,
      complete: true,
      parts: [
        {
          title:
            "Predict the outcome of the following program. Also justify your answer.",
          answer: "",
          answerType: "text",
          complete: true,
        },
        {
          title:
            "Explain various control statements used in java with example.",
          answer: "",
          answerType: "image",
          complete: true,
        },
        {
          title:
            "Write a program to test the following recursive method that returns the nth triangular number: static long t(int n)",
          answer: "",
          answerType: "link",
          complete: true,
        },
      ],
    },
    {
      id: 2,
      complete: false,
      parts: [
        {
          title:
            "We can’t instantiate an abstract class. Then why constructors are allowed in abstract class? ",
          answer: "",
          answerType: "text",
          complete: false,
        },
        {
          title:
            "Differentiate between interface and abstract class with example. Predict the outcome of the following program. Also justify your answer.",
          answer: "",
          answerType: "image",
          complete: false,
        },
        {
          title:
            "How association, aggregation and composition are related to each other? Write a program to illustrate composition.",
          answer: "",
          answerType: "link",
          complete: false,
        },
      ],
    },
    {
      id: 3,
      complete: true,
      parts: [
        {
          title:
            "Can we synchronize the run method? If yes then what will be the behaviour? ",
          answer: "",
          answerType: "text",
          complete: true,
        },
        {
          title:
            "Write a program to illustrate the important methods in java for inter-thread communication?",
          answer: "",
          answerType: "image",
          complete: true,
        },
        {
          title: "Can we override start() method of thread class? Give reason.",
          answer: "",
          answerType: "link",
          complete: true,
        },
      ],
    },
    {
      id: 4,
      complete: false,
      parts: [
        {
          title:
            "What is an applet? Explain various methods used during the life cycle of an applet.",
          answer: "",
          answerType: "text",
          complete: false,
        },
        {
          title:
            "Describe hierarchy of I/O streams. Write a program to count the number of spaces, words and newlines in a text file.",
          answer: "",
          answerType: "image",
          complete: false,
        },
        {
          title:
            "Explain Event Delegation model. Write a program to illustrate event handling for mouse.",
          answer: "",
          answerType: "link",
          complete: true,
        },
      ],
    },
  ]);

  const setNewData = (question, markdown, questId) => {
    if (question && markdown && questId) {
      const index = data[questId].parts.findIndex(
        (item) => item.title === question.title
      );
      let tempData = { ...data[questId].parts[index] };
      if (tempData) {
        tempData = { ...tempData, answer: markdown };
      }
    }
  };

  return (
    <GlobalContext.Provider value={{ data, setNewData }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
