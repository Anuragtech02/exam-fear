import React, { useContext, useState, useEffect } from "react";
import styles from "./Home.module.css";
import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Checkbox,
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
import RichTextEditor from "react-rte";
import Dropzone from "react-dropzone";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import ViewAnswerModal from "../ViewAnswerModal/ViewAnswerModal";
import ReactMarkdown from "react-markdown";

const Home = () => {
  const { data, setNewData } = useContext(GlobalContext);

  const [subject, setSubject] = useState("Object Oriented Programming");
  const [subCode, setSubCode] = useState("CER3C2");
  const rno = "19C3xxx";

  const [questionParts, setQuestionParts] = useState([]);

  const [questions, setQuestions] = useState([...data]);
  const [questBack, setQuestBack] = useState(questions);
  const [openAnswer, setOpenAnswer] = useState(false);
  // const [openAnswer, setOpenAnswer] = useState(false);

  useEffect(() => {
    let qParts = [];
    questBack.forEach((item) => {
      qParts.push(...item.parts);
    });
    console.log(qParts);
    setQuestionParts(qParts);
  }, [questBack]);

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
            <Button
              onClick={() => setOpenAnswer(true)}
              className={styles.addAnswerBtn}
            >
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
      <AddAnswerModal
        open={openAnswer}
        handleClose={handleCloseAnswer}
        questions={questBack}
      />
    </div>
  );
};

export default Home;

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
          {questions.map((question, i) => {
            return (
              <div key={"question" + i} className={styles.questionContainer}>
                <h3>Question {i + 1}</h3>
                {question.parts.map((part) => {
                  return (
                    <CustomAccordion
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

const CustomAccordion = ({ complete, question, questId }) => {
  const [textEditor, setTextEditor] = useState(false);
  const [imageEditor, setImageEditor] = useState(false);
  const [linkEditor, setLinkEditor] = useState(false);

  const [text, setText] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");

  const [markdown, setMarkdown] = useState("");

  const changeImageUrl = (file) => {
    let reader = new FileReader();
    // setUrl(e.target.files[0]);
    reader.onloadend = () => {
      if (reader.result) {
        setImage(reader.result);
      } else setImage("");
    };
    try {
      reader.readAsDataURL(file);
    } catch (error) {
      setImage("");
    }
  };

  const handleImage = (acceptedFile) => {
    console.log({ acceptedFile });
    changeImageUrl(acceptedFile[0]);
  };

  const [md, setMd] = useState(false);

  const { setNewData } = useContext(GlobalContext);

  const handleSubmit = (e, question) => {
    e.preventDefault();
    let tempMark = "";
    if (text && text.length) {
      tempMark += text + "\n";
    }
    if (image && image.length) {
      tempMark += `\n\n ![question-image](${image})`;
    }
    if (link && link.length) {
      tempMark += `\n\n ${link}`;
    }
    console.log({ tempMark });
    setMarkdown(tempMark);
    setMd(true);
    setNewData(question, markdown, questId);
  };

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
        <form onSubmit={handleSubmit} className={styles.detailsContainer}>
          {question.answer ? question.answer : null}
          {textEditor && (
            <textarea
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              className={styles.inputField}
              placeholder="Enter Text"
            />
          )}
          {imageEditor && (
            <Dropzone
              multiple={false}
              onDrop={(acceptedFiles) => handleImage(acceptedFiles)}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input
                      {...getInputProps()}
                      className={styles.dropzoneInput}
                    />
                    <div className={styles.dropzone}>
                      <AddPhotoAlternateIcon />
                      <p>Drag n drop image or click to pick one</p>
                    </div>
                  </div>
                </section>
              )}
            </Dropzone>
          )}
          {linkEditor && (
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className={styles.inputField}
              placeholder="Enter Link"
            />
          )}
          {md && <ReactMarkdown>{markdown}</ReactMarkdown>}
          <div style={{ width: "100%", margin: "10px 0" }}>
            <Grid container spacing={2}>
              <Grid item md={4}>
                <Button
                  onClick={() => setTextEditor(!textEditor)}
                  variant="outlined"
                  className={styles.addOptionBtn}
                >
                  Text
                </Button>
              </Grid>
              <Grid item md={4}>
                <Button
                  onClick={() => setImageEditor(!imageEditor)}
                  variant="outlined"
                  className={styles.addOptionBtn}
                >
                  Image
                </Button>
              </Grid>
              <Grid item md={4}>
                <Button
                  onClick={() => setLinkEditor(!linkEditor)}
                  variant="outlined"
                  className={styles.addOptionBtn}
                >
                  Link
                </Button>
              </Grid>
            </Grid>
          </div>
          <div className={styles.btnContainer}>
            <Button
              type="submit"
              variant="contained"
              className={styles.submitBtn}
            >
              Submit
            </Button>
          </div>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

const CustomEditor = (props) => {
  const [value, setValue] = useState(RichTextEditor.createEmptyValue());
  const onChange = (value) => {
    setValue(value);
    if (props.onChange) {
      props.onChange(value.toString("html"));
    }
  };
  return (
    <RichTextEditor
      value={value}
      onChange={onChange}
      multiline
      variant="filled"
    />
  );
};
