import React, { createContext, useState, useEffect } from "react";
import firebase from "../Firebase/firebase";

export const GlobalContext = createContext([]);

const GlobalContextProvider = ({ children }) => {
  const db = firebase.database();

  const [data, setData] = useState({});
  const [questions, setQuestions] = useState([]);
  const [subject, setSubject] = useState("");
  const [subCode, setSubCode] = useState("");
  const [rno, setRno] = useState("");

  // const branch = "cse";
  // const year = "year-1";
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    const fetchDB = async () => {
      const dbRef = db.ref(`${year}/${branch}`);

      console.log({ year, branch });
      if (year.length && branch.length)
        db.ref(`${year}/${branch}`).on("value", async (snap) => {
          console.log("while fetching", snap.val());
          const tempData = (await snap.val()) ?? {};
          const dataWithYear = tempData[year];
          if (tempData.questions) {
            setData(tempData || {});
            if (tempData.questions) setQuestions(tempData.questions);
            setSubCode(tempData.subCode);
            setSubject(tempData.subject);
            setRno(tempData.rno);
          } else if (dataWithYear) {
            console.log("In else", { tempData });
            setData(dataWithYear[branch] || {});
            if (dataWithYear[branch].questions)
              setQuestions(dataWithYear[branch].questions);
            setSubCode(dataWithYear[branch].subCode);
            setSubject(dataWithYear[branch].subject);
            setRno(dataWithYear[branch].rno);
          }
        });
    };
    fetchDB();
  }, [db, year, branch]);

  useEffect(() => {
    console.log("updated", { data });
  }, [data]);

  const updateDataOnDB = async (modifiedData) => {
    await db
      .ref(`${year}/${branch}`)
      .child("questions")
      .set(modifiedData)
      .then(() => console.log("Sucesss"));
  };

  const setNewData = (question, markdown, questId, type) => {
    // console.log("Enteredd", { question, markdown, questId });
    console.log("while upading", { data });
    if (question && questId !== -1 && data && questions) {
      const index = questions[questId].parts.findIndex(
        (item) => item.title === question.title
      );
      let tempData = { ...data.questions[questId].parts[index] };
      let tempParts = [...data.questions[questId].parts];
      // console.log(tempData);
      if (tempData) {
        tempData.answer = type && type === "delete" ? "" : markdown;
        tempData.complete = type && type === "delete" ? false : true;
        tempParts[index] = tempData;
        // setData(tempData);
        let completeFlag = true;
        tempParts.forEach((item) => {
          if (!item.complete) completeFlag = false;
        });
        let newData = [...data.questions];
        newData[questId] = {
          ...newData[questId],
          parts: tempParts,
          complete: completeFlag,
        };
        // console.log({ newData });
        let modifiedData = { ...data };
        modifiedData.questions = newData;
        // setData(modifiedData);
        updateDataOnDB(newData);
      }
      // console.log({ tempData });
    }
  };

  const deleteAnswer = (question, questId) => {
    setNewData(question, "", questId, "delete");
  };

  React.useEffect(() => {
    console.log({ data });
  }, [data]);

  return (
    <GlobalContext.Provider
      value={{
        data: questions,
        setNewData,
        deleteAnswer,
        subject,
        subCode,
        rno,
        setBranch,
        setYear,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;

// const dat = {
//   branch: "CSE",
//   subject: "Object Oriented Programming",
//   subCode: "CER3C2",
//   rno: "19C3XXX",
//   year: 2,
//   questions: [
//     {
//       id: 0,
//       complete: false,
//       parts: [
//         {
//           title:
//             "Differentiate among JDK, JRE and JVM. Why java is called platform independent?",
//           answer: "",
//           answerType: "text",
//           complete: false,
//         },
//         {
//           title:
//             "Define constructor? When do we need Constructor Overloading? What are private constructors and where are they used?",
//           answer: "",
//           answerType: "image",
//           complete: false,
//         },
//         {
//           title:
//             "Write a program to test the following method that returns digit number k of the positive integer n:",
//           answer: "",
//           answerType: "link",
//           complete: false,
//         },
//       ],
//     },
//     {
//       id: 1,
//       complete: false,
//       parts: [
//         {
//           title:
//             "Predict the outcome of the following program. Also justify your answer.",
//           answer: "",
//           answerType: "text",
//           complete: false,
//         },
//         {
//           title:
//             "Explain various control statements used in java with example.",
//           answer: "",
//           answerType: "image",
//           complete: false,
//         },
//         {
//           title:
//             "Write a program to test the following recursive method that returns the nth triangular number: static long t(int n)",
//           answer: "",
//           answerType: "link",
//           complete: false,
//         },
//       ],
//     },
//     {
//       id: 2,
//       complete: false,
//       parts: [
//         {
//           title:
//             "We can’t instantiate an abstract class. Then why constructors are allowed in abstract class? ",
//           answer: "",
//           answerType: "text",
//           complete: false,
//         },
//         {
//           title:
//             "Differentiate between interface and abstract class with example. Predict the outcome of the following program. Also justify your answer.",
//           answer: "",
//           answerType: "image",
//           complete: false,
//         },
//         {
//           title:
//             "How association, aggregation and composition are related to each other? Write a program to illustrate composition.",
//           answer: "",
//           answerType: "link",
//           complete: false,
//         },
//       ],
//     },
//     {
//       id: 3,
//       complete: false,
//       parts: [
//         {
//           title:
//             "Can we synchronize the run method? If yes then what will be the behaviour? ",
//           answer: "",
//           answerType: "text",
//           complete: false,
//         },
//         {
//           title:
//             "Write a program to illustrate the important methods in java for inter-thread communication?",
//           answer: "",
//           answerType: "image",
//           complete: false,
//         },
//         {
//           title:
//             "Can we override start() method of thread class? Give reason.",
//           answer: "",
//           answerType: "link",
//           complete: false,
//         },
//       ],
//     },
//     {
//       id: 4,
//       complete: false,
//       parts: [
//         {
//           title:
//             "What is an applet? Explain various methods used during the life cycle of an applet.",
//           answer: "",
//           answerType: "text",
//           complete: false,
//         },
//         {
//           title:
//             "Describe hierarchy of I/O streams. Write a program to count the number of spaces, words and newlines in a text file.",
//           answer: "",
//           answerType: "image",
//           complete: false,
//         },
//         {
//           title:
//             "Explain Event Delegation model. Write a program to illustrate event handling for mouse.",
//           answer: "",
//           answerType: "link",
//           complete: false,
//         },
//       ],
//     },
//   ],
// }
