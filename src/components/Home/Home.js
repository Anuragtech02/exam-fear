import React, { useContext, useState, useEffect } from "react";
import styles from "./Home.module.css";
import {
  CssBaseline,
  Container,
  Paper,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Checkbox,
  Typography,
  TextField,
  Card,
  Button,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { GlobalContext } from "../../Contexts/GlobalContext";
import study from "../../Assets/study.webp";
import AddIcon from "@material-ui/icons/Add";
import QuestionAnswerSharpIcon from "@material-ui/icons/QuestionAnswerSharp";
import CustomTabs from "../CustomTabs/CustomTabs";

const Home = () => {
  const { data } = useContext(GlobalContext);

  const [subject, setSubject] = useState("Object Oriented Programming");
  const [subCode, setSubCode] = useState("CER3C2");
  const rno = "19C3xxx";

  const [questionParts, setQuestionParts] = useState([]);

  const [questions, setQuestions] = useState([
    {
      complete: true,
      parts: [
        {
          title:
            "Differentiate among JDK, JRE and JVM. Why java is called platform independent?",
          answer: "",
          answerType: "text",
        },
        {
          title:
            "Define constructor? When do we need Constructor Overloading? What are private constructors and where are they used?",
          answer: "",
          answerType: "image",
        },
        {
          title:
            "Write a program to test the following method that returns digit number k of the positive integer n:",
          answer: "",
          answerType: "link",
        },
      ],
    },
    {
      complete: true,
      parts: [
        {
          title:
            "Predict the outcome of the following program. Also justify your answer.",
          answer: "",
          answerType: "text",
        },
        {
          title:
            "Explain various control statements used in java with example.",
          answer: "",
          answerType: "image",
        },
        {
          title:
            "Write a program to test the following recursive method that returns the nth triangular number: static long t(int n)",
          answer: "",
          answerType: "link",
        },
      ],
    },
    {
      complete: false,
      parts: [
        {
          title:
            "We can’t instantiate an abstract class. Then why constructors are allowed in abstract class? ",
          answer: "",
          answerType: "text",
        },
        {
          title:
            "Differentiate between interface and abstract class with example. Predict the outcome of the following program. Also justify your answer.",
          answer: "",
          answerType: "image",
        },
        {
          title:
            "How association, aggregation and composition are related to each other? Write a program to illustrate composition.",
          answer: "",
          answerType: "link",
        },
      ],
    },
    {
      complete: true,
      parts: [
        {
          title:
            "Can we synchronize the run method? If yes then what will be the behaviour? ",
          answer: "",
          answerType: "text",
        },
        {
          title:
            "Write a program to illustrate the important methods in java for inter-thread communication?",
          answer: "",
          answerType: "image",
        },
        {
          title: "Can we override start() method of thread class? Give reason.",
          answer: "",
          answerType: "link",
        },
      ],
    },
    {
      complete: false,
      parts: [
        {
          title:
            "What is an applet? Explain various methods used during the life cycle of an applet.",
          answer: "",
          answerType: "text",
        },
        {
          title:
            "Describe hierarchy of I/O streams. Write a program to count the number of spaces, words and newlines in a text file.",
          answer: "",
          answerType: "image",
        },
        {
          title:
            "Explain Event Delegation model. Write a program to illustrate event handling for mouse.",
          answer: "",
          answerType: "link",
        },
      ],
    },
  ]);
  const [questBack, setQuestBack] = useState(questions);

  useEffect(() => {
    let qParts = [];
    questions.forEach((item) => {
      qParts.push(...item.parts);
    });
    console.log(qParts);
    setQuestionParts(qParts);
  }, [questions]);

  useEffect(() => {
    setQuestBack(questions);
  }, []);

  const onChangeSearch = (e, value) => {
    if (questionParts.indexOf(value) !== -1) {
      const current = questions;
      const newData = current.filter(
        (item) =>
          item.parts.findIndex(
            (innerItem) => innerItem.title === value.title
          ) !== -1
      );
      setQuestions(newData);
      console.log(newData);
    } else {
      setQuestions(questBack);
    }
    console.log(value);
  };

  return (
    <div className={styles.container}>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <div className={styles.leftContainer}>
            <div className={styles.searchContainer}>
              <div className={styles.title}>
                <h3>
                  Don't Stress
                  <br />
                  Do Your Best
                  <b />
                </h3>
                <p>
                  Kuch bhi karo bas answer lao and yaha daldo, let's help each
                  other.
                </p>
              </div>
              <div className={styles.searchBarContainer}>
                <Autocomplete
                  id="search"
                  // className="search-field"
                  options={questionParts}
                  onChange={onChangeSearch}
                  // onInputValidCapture={onChangeSearch}
                  // groupBy={false}
                  className={styles.searchInput}
                  getOptionLabel={(option) => option.title}
                  style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      className={styles.inputElement}
                      {...params}
                      label="Search"
                      variant="outlined"
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </Grid>
        <Grid item md={6}>
          <div className={styles.rightContainer}>
            <img src={study} alt="study" />
          </div>
        </Grid>
      </Grid>
      <div className={styles.help}>
        <div className={styles.helpItem}>
          <h5>Subject Name</h5>
          <h4>{subject}</h4>
        </div>
        <div className={styles.helpItem}>
          <h5>Subject Code</h5>
          <h4>{subCode}</h4>
        </div>
        <div className={styles.helpItem}>
          <h5>Roll No.</h5>
          <h4>{rno}</h4>
        </div>
      </div>
      <Grid container spacing={2} style={{ margin: "20px 0" }}>
        <Grid item xl={3} lg={4} md={4} sm={6} xs={12}>
          <Card style={{ height: "100%" }}>
            <Button className={styles.addAnswerBtn}>
              <QuestionAnswerSharpIcon />
              &nbsp; Add Answer
            </Button>
          </Card>
        </Grid>
        {questions.map((item, i) => {
          return (
            <Grid key={item.title + i} item xl={3} lg={4} md={4} sm={6} xs={12}>
              <CardComponent question={item} index={i} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Home;

const CardComponent = ({ question, index }) => {
  return (
    <Card style={{ height: "100%" }}>
      <div className={styles.cardContainer}>
        <div className={styles.cardTitle}>
          <h3 className={styles.qNo}>Q{index + 1}.</h3>
        </div>
        <div className={styles.parts}>
          <CustomTabs
            tab1={question.parts[0]}
            tab2={question.parts[1]}
            tab3={question.parts[2]}
            index={index}
            complete={question.complete}
          />
          {/* <Grid container>
            <Grid item md={4}>
              <Button className={styles.part} variant="outlined">
                Part A
              </Button>
            </Grid>
            <Grid item md={4}>
              <Button className={styles.part} variant="outlined">
                Part B
              </Button>
            </Grid>
            <Grid item md={4}>
              <Button className={styles.part} variant="outlined">
                Part C
              </Button>
            </Grid>
          </Grid> */}
        </div>
        <div></div>
      </div>
    </Card>
  );
};

const QuestionComponent = ({ question, complete }) => {
  return (
    <Accordion className={styles.question}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-label="Expand"
        aria-controls="additional-actions3-content"
        id="additional-actions3-header"
      >
        <FormControlLabel
          aria-label="Acknowledge"
          onClick={(event) => event.stopPropagation()}
          onFocus={(event) => event.stopPropagation()}
          control={<Checkbox />}
          checked={complete}
          label={question.title}
        />
      </AccordionSummary>
      <AccordionDetails>
        <div className={styles.detailsContainer}>
          {question.parts.map((item) =>
            item.answered && item.answered.length ? (
              <div>
                <h3>{item.title}</h3>
                {item.answerType === "text" ? (
                  <p>{item.answerType}</p>
                ) : item.answerType === "image" ? (
                  <img src={item.answer} alt="" />
                ) : null}
              </div>
            ) : (
              <div>
                {" "}
                <h3>{item.title}</h3>
                <p>Not answered Yet</p>
              </div>
            )
          )}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};
