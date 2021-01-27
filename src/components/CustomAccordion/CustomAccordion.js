import React, { useState, useContext } from "react";
import Dropzone from "react-dropzone";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { GlobalContext } from "../../Contexts/GlobalContext";
import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Checkbox,
  Button,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styles from "./CustomAccordion.module.css";
import imageCompression from "browser-image-compression";
import ReactMarkdown from "react-markdown";
import DeleteIcon from "@material-ui/icons/Delete";

const CustomAccordion = ({ complete, question, questId }) => {
  const [textEditor, setTextEditor] = useState(false);
  const [imageEditor, setImageEditor] = useState(false);
  const [linkEditor, setLinkEditor] = useState(false);

  const [text, setText] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [markdown, setMarkdown] = useState("");

  const handleImageUpload = async (file) => {
    const imageFile = file;
    console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

    const options = {
      maxSizeMB: 0.6,
      maxWidthOrHeight: 1000,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      // console.log(
      //   "compressedFile instanceof Blob",
      //   compressedFile instanceof Blob
      // ); // true
      // console.log(
      //   `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
      // ); // smaller than maxSizeMB
      // console.log({ compressedFile });
      const res = await imageCompression.getDataUrlFromFile(compressedFile);
      // console.log({ res });
      setImage(res);

      // await uploadToServer(compressedFile); // write your own logic
    } catch (error) {
      console.log(error);
    }
  };

  // const changeImageUrl = (file) => {
  //   let reader = new FileReader();
  //   // setUrl(e.target.files[0]);
  //   reader.onloadend = () => {
  //     if (reader.result) {
  //       setImage(reader.result);
  //     } else setImage("");
  //   };
  //   try {
  //     reader.readAsDataURL(file);
  //   } catch (error) {
  //     setImage("");
  //   }
  // };

  const handleImage = (acceptedFile) => {
    // console.log({ acceptedFile });
    // changeImageUrl(acceptedFile[0]);
    if (isFileImage(acceptedFile[0])) {
      setImageFile(acceptedFile[0]);
      handleImageUpload(acceptedFile[0]);
    } else {
      alert("Please upload only images");
    }
  };

  const [md, setMd] = useState(false);

  const { setNewData, deleteAnswer } = useContext(GlobalContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    let tempMark = question.answer;
    if (text && text.length) {
      tempMark += "\n\n" + text;
    }
    if (image && image.length) {
      tempMark += `\n\n ![question-image](${image})`;
    }
    if (link && link.length) {
      tempMark += `\n\n [${link}](${link})`;
    }
    if (imageEditor && !image && !image.length) {
      alert("Please select an image to upload");
      return;
    }
    console.log({ tempMark });
    setMarkdown(tempMark);
    setMd(true);
    setNewData(question, tempMark, questId);
    setText("");
    setImage("");
    setLink("");
    setImageFile(null);
  };

  const handleClickDelete = () => {
    //Delete answer from globalContext
    deleteAnswer(question, questId);
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
          <div className={styles.prevAnswer}>
            {question.answer ? (
              <div className={styles.mdContainer}>
                <ReactMarkdown>{question.answer}</ReactMarkdown>
              </div>
            ) : null}
            {question.answer && (
              <div className={styles.delIcon}>
                <Tooltip placement="top" title="Delete Answer">
                  <IconButton onClick={handleClickDelete}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </div>
            )}
          </div>

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
              accept=".jpg, .jpeg, .png, .webp, .gif,"
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
                      <p>
                        {imageFile
                          ? `You selected ${imageFile.name}`
                          : "Drag n drop image or click to pick one"}
                      </p>
                    </div>
                  </div>
                </section>
              )}
            </Dropzone>
          )}
          {linkEditor && (
            <input
              required
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className={styles.inputField}
              placeholder="Enter Link"
            />
          )}
          {/* {md && <ReactMarkdown>{markdown}</ReactMarkdown>} */}
          <div style={{ width: "100%", margin: "10px 0" }}>
            <Grid container spacing={2}>
              <Grid item md={4}>
                <Button
                  onClick={() => {
                    setTextEditor(!textEditor);
                    setText("");
                  }}
                  variant="outlined"
                  className={styles.addOptionBtn}
                >
                  Text
                </Button>
              </Grid>
              <Grid item md={4}>
                <Button
                  onClick={() => {
                    setImageEditor(!imageEditor);
                    setImage("");
                    setImageFile(null);
                  }}
                  variant="outlined"
                  className={styles.addOptionBtn}
                >
                  Image
                </Button>
              </Grid>
              <Grid item md={4}>
                <Button
                  onClick={() => {
                    setLinkEditor(!linkEditor);
                    setLink("");
                  }}
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

export default CustomAccordion;

const isFileImage = (file) => {
  const acceptedImageTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/jpg",
    "image/gif",
  ];

  return file && acceptedImageTypes.includes(file["type"]);
};
