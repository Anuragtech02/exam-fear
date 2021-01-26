import React, { useState } from "react";
import "antd/dist/antd.css";
import { Tabs } from "antd";
import { Button } from "@material-ui/core";
import styles from "./CustomTabs.module.css";
import CheckIcon from "@material-ui/icons/Check";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";
import ViewAnswerModal from "../ViewAnswerModal/ViewAnswerModal";

const { TabPane } = Tabs;

const CustomTabs = ({ tab1, tab2, tab3, index, complete }) => {
  const [viewAnswerModal, setViewAnswerModal] = useState(false);
  const [markdown, setMarkdown] = useState("");

  const handleClickView = (md) => {
    // if (md) {
    setMarkdown(md);
    setViewAnswerModal(true);
    // }
  };

  return (
    <>
      <Tabs
        type="card"
        tabPosition="bottom"
        //   tabBarExtraContent={<QNo index={index} />}
        style={{ width: "100%" }}
      >
        <TabPane tab="A" key="1">
          <div className={styles.tabContainer}>
            <div className={styles.cardTitle}>
              <h3>{tab1.title}</h3>
            </div>
            <div className={styles.btnContainer}>
              <Button
                onClick={() => handleClickView(tab1.answer)}
                variant="outlined"
                className={styles.answerBtn}
              >
                View Answer
              </Button>
              {complete ? (
                <CheckIcon />
              ) : (
                <ReportProblemIcon className={styles.reportIcon} />
              )}
            </div>
          </div>
        </TabPane>
        <TabPane tab="B" key="2">
          <div className={styles.tabContainer}>
            <div className={styles.cardTitle}>
              <h3>{tab2.title}</h3>
            </div>
            <div className={styles.btnContainer}>
              <Button
                onClick={() => handleClickView(tab2.answer)}
                variant="outlined"
                className={styles.answerBtn}
              >
                View Answer
              </Button>
              {complete ? (
                <CheckIcon />
              ) : (
                <ReportProblemIcon className={styles.reportIcon} />
              )}{" "}
            </div>
          </div>
        </TabPane>
        <TabPane tab="C" key="3">
          <div className={styles.tabContainer}>
            <div className={styles.cardTitle}>
              <h3>{tab3.title}</h3>
            </div>
            <div className={styles.btnContainer}>
              <Button
                onClick={() => handleClickView(tab3.answer)}
                variant="outlined"
                className={styles.answerBtn}
              >
                View Answer
              </Button>
              {complete ? (
                <CheckIcon />
              ) : (
                <ReportProblemIcon className={styles.reportIcon} />
              )}
            </div>
          </div>
        </TabPane>
      </Tabs>
      <ViewAnswerModal
        open={viewAnswerModal}
        handleClose={() => setViewAnswerModal(false)}
        markdown={markdown}
      />
    </>
  );
};

export default CustomTabs;

const QNo = ({ index }) => {
  return (
    <div className={styles.qContainer}>
      <h3 className={styles.qNo}>Q{index + 1}.</h3>
    </div>
  );
};
