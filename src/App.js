import React, { useState } from "react";
import GlobalContextProvider from "./Contexts/GlobalContext";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
} from "react-router-dom";
import Home from "./components/Home/Home";
import "./App.css";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
  Button,
  CircularProgress,
  TextField,
} from "@material-ui/core";
import firebase from "./Firebase/firebase";
import { getData } from "./Assets/test";

const App = () => {
  return (
    <div className="container">
      <GlobalContextProvider>
        <Router>
          <Switch>
            <Route path="/:year/:branch" exact component={Home} />
            <Route path="/" exact component={() => <Default />} />
            <Route
              path="/:year/:branch/enter-details"
              exact
              component={EnterDetails}
            />
          </Switch>
        </Router>
      </GlobalContextProvider>
    </div>
  );
};

export default App;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Default = () => {
  const classes = useStyles();

  const [year, setYear] = useState("");
  const [branch, setBranch] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangeYear = (e) => {
    setYear(e.target.value);
  };
  const handleChangeBranch = (e) => {
    setBranch(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const db = firebase.database();
    const dbRef = db.ref(`year${year}/${branch}`);
    const status = (await dbRef.once("value")).exists();
    if (status) {
      setLoading(false);
      const a = document.createElement("a");
      a.href = `${window.location.origin}/year${year}/${branch}`;
      a.click();
    } else {
      const a = document.createElement("a");
      a.href = `/year${year}/${branch}/enter-details`;
      a.click();
    }
  };

  return (
    <div className="flex-col centered">
      <div className="main-title">
        <h4>Select Year and Branch</h4>
      </div>
      <form onSubmit={onSubmit}>
        <FormControl required className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Year</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={year}
            onChange={handleChangeYear}
            variant="filled"
          >
            <MenuItem value={1}>First</MenuItem>
            <MenuItem value={2}>Second</MenuItem>
            <MenuItem value={3}>Third</MenuItem>
            <MenuItem value={4}>Fourth</MenuItem>
          </Select>
        </FormControl>
        <FormControl required className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Branch</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={branch}
            onChange={handleChangeBranch}
            variant="filled"
          >
            <MenuItem value={"cse"}>CSE</MenuItem>
            <MenuItem value={"it"}>IT</MenuItem>
            <MenuItem value={"ei"}>EI</MenuItem>
            <MenuItem value={"etc"}>ETC</MenuItem>
            <MenuItem value={"mech"}>Mechanical</MenuItem>
            <MenuItem value={"civ"}>Civil</MenuItem>
          </Select>
        </FormControl>
        <div className="next-btn-container">
          <Button type="submit" variant="contained" className="next-btn">
            Next
          </Button>
        </div>
      </form>
      <div>{loading && <CircularProgress />}</div>
    </div>
  );
};

const EnterDetails = () => {
  const [subject, setSubject] = useState("");
  const [subCode, setSubCode] = useState("");
  const [rno, setRno] = useState("");
  const [loading, setLoading] = useState(false);

  const { year, branch } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const db = firebase.database();
    const dbRef = db.ref(`${year}/${branch}`);
    dbRef
      .set(getData(year, branch, subject, subCode, rno)[year][branch])
      .then(() => {
        console.log(getData(year, branch, subject, subCode, rno), {
          branch,
          year,
        });
        setLoading(false);
        const a = document.createElement("a");
        a.href = `/${year}/${branch}`;
        a.click();
      });
  };

  return (
    <div className="enter-details flex-col">
      <div className="title">
        <h4>Pleaes Enter Following Details</h4>
      </div>
      <form onSubmit={handleSubmit} className="flex-col">
        <TextField
          required
          value={subject}
          label="Subject"
          variant="filled"
          className="input-field-details"
          onChange={(e) => setSubject(e.target.value)}
        />
        <TextField
          required
          value={subCode}
          label="Subject Code"
          variant="filled"
          className="input-field-details"
          onChange={(e) => setSubCode(e.target.value)}
        />
        <TextField
          required
          value={rno}
          label="RNo Format (Ex: 18C5XXX)"
          variant="filled"
          className="input-field-details"
          onChange={(e) => setRno(e.target.value)}
        />
        <div className="submit-btn-container">
          <Button className="submit-btn" type="submit" variant="contained">
            Submit
          </Button>
        </div>
      </form>
      <div>{loading && <CircularProgress />}</div>
    </div>
  );
};
