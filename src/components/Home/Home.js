import React, { useContext, useState, useEffect } from "react";
import styles from "./Home.module.css";
import {
  Grid,
  TextField,
  Card,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { GlobalContext } from "../../Contexts/GlobalContext";
import study from "../../Assets/study.webp";
import QuestionAnswerSharpIcon from "@material-ui/icons/QuestionAnswerSharp";
import CustomTabs from "../CustomTabs/CustomTabs";
import ViewAnswerModal from "../ViewAnswerModal/ViewAnswerModal";
import CustomAccordion from "../CustomAccordion/CustomAccordion";
import { useParams, withRouter } from "react-router";

const Home = () => {
  const { data, rno, subject, subCode, setYear, setBranch } = useContext(
    GlobalContext
  );

  // const [subject, setSubject] = useState("Object Oriented Programming");
  // const [subCode, setSubCode] = useState("CER3C2");
  // const rno = "19C3xxx";

  const { branch, year } = useParams();

  const [questionParts, setQuestionParts] = useState([]);

  const [questions, setQuestions] = useState([]);
  // const [questBack, setQuestBack] = useState(questions);
  const [openAnswer, setOpenAnswer] = useState(false);
  // const [openAnswer, setOpenAnswer] = useState(false);
  const [viewAnswerModal, setViewAnswerModal] = useState(false);
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    setBranch(branch);
    setYear(year);
  }, [branch, year, setBranch, setYear]);

  useEffect(() => {
    let qParts = [];
    if (data && data.length) {
      data.forEach((item) => {
        qParts.push(...item.parts);
      });
      // console.log(qParts);
      setQuestionParts(qParts);
      setQuestions(data);
    }
  }, [data]);

  useEffect(() => {
    console.log(data);
    console.log("Changed");
  }, [data]);

  // useEffect(() => {
  //   setQuestions(data);
  //   // setQuestBack(data);
  // }, [data]);

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
      setQuestions(data);
    }
    console.log(value);
  };

  const handleCloseAnswer = () => {
    setOpenAnswer(false);
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
      <Grid container spacing={2}>
        <Grid item md={3} sm={4} xs={6}>
          <div className={styles.helpItem}>
            <h5>Subject Name</h5>
            <h4>{subject}</h4>
          </div>
        </Grid>
        <Grid item md={3} sm={4} xs={6}>
          <div className={styles.helpItem}>
            <h5>Subject Code</h5>
            <h4>{subCode}</h4>
          </div>
        </Grid>
        <Grid item md={3} sm={4} xs={6}>
          <div className={styles.helpItem}>
            <h5>Roll No.</h5>
            <h4>{rno}</h4>
          </div>
        </Grid>
      </Grid>
      {/* <div className={styles.help}>
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
      </div> */}
      <div className={styles.contentQuestion}>
        <Grid container spacing={2}>
          <Grid item xl={3} lg={4} md={4} sm={6} xs={12}>
            <Card style={{ height: "100%" }}>
              <Button
                onClick={() => setOpenAnswer(true)}
                className={styles.addAnswerBtn}
              >
                <QuestionAnswerSharpIcon />
                &nbsp; Add Answer
              </Button>
            </Card>
          </Grid>
          {questions ? (
            questions.map((item, i) => {
              return (
                <Grid
                  key={"question-paper" + i}
                  item
                  xl={3}
                  lg={4}
                  md={4}
                  sm={6}
                  xs={12}
                >
                  <CardComponent question={item} index={i} />
                </Grid>
              );
            })
          ) : (
            <Grid item>
              <div>
                <p>
                  Seems like your questions have not been added yet, Please
                  contact admin
                </p>
              </div>
            </Grid>
          )}
        </Grid>
      </div>

      <AddAnswerModal
        open={openAnswer}
        handleClose={handleCloseAnswer}
        questions={questions}
      />
      {/* <ViewAnswerModal
        open={viewAnswerModal}
        handleClose={() => setViewAnswerModal(false)}
        markdown={markdown}
      /> */}
    </div>
  );
};

export default withRouter(Home);

const CardComponent = ({ question, index }) => {
  return (
    <Card style={{ height: "100%" }}>
      <div className={styles.cardContainer}>
        <div className={styles.cardTitle}>
          <h3 className={styles.qNo}>Q{question.id + 1}.</h3>
        </div>
        <div className={styles.parts}>
          <CustomTabs
            tab1={question.parts[0]}
            tab2={question.parts[1]}
            tab3={question.parts[2]}
            index={index}
            complete={question.complete}
          />
        </div>
      </div>
    </Card>
  );
};

const AddAnswerModal = ({ questions, open, handleClose }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Add Answer"}</DialogTitle>
      <DialogContent>
        <div className={styles.dialogContent}>
          {questions &&
            questions.map((question, i) => {
              return (
                <div
                  key={"question-answer" + i}
                  className={styles.questionContainer}
                >
                  <h3>Question {i + 1}</h3>
                  {question.parts.map((part, index) => {
                    return (
                      <CustomAccordion
                        key={part.title}
                        question={part}
                        questId={question.id}
                        complete={part.complete}
                      />
                    );
                  })}
                </div>
              );
            })}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
