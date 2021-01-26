import React from "react";
import "antd/dist/antd.css";
import { Tabs } from "antd";
import { Button } from "@material-ui/core";
import styles from "./CustomTabs.module.css";
import CheckIcon from "@material-ui/icons/Check";

const { TabPane } = Tabs;

const CustomTabs = ({ tab1, tab2, tab3, index }) => {
  return (
    <Tabs
      type="card"
      tabPosition="bottom"
      tabBarExtraContent={<QNo index={index} />}
      style={{ width: "100%" }}
    >
      <TabPane tab="A" key="1">
        <div className={styles.tabContainer}>
          <div className={styles.cardTitle}>
            <h3>{tab1.title}</h3>
          </div>
          <div className={styles.btnContainer}>
            <Button variant="outlined" className={styles.answerBtn}>
              View Answer
            </Button>
            <CheckIcon />
          </div>
        </div>
      </TabPane>
      <TabPane tab="B" key="2">
        <div className={styles.tabContainer}>
          <div className={styles.cardTitle}>
            <h3>{tab2.title}</h3>
          </div>
          <div className={styles.btnContainer}>
            <Button variant="outlined" className={styles.answerBtn}>
              View Answer
            </Button>
            <CheckIcon />
          </div>
        </div>
      </TabPane>
      <TabPane tab="C" key="3">
        <div className={styles.tabContainer}>
          <div className={styles.cardTitle}>
            <h3>{tab3.title}</h3>
          </div>
          <div className={styles.btnContainer}>
            <Button variant="outlined" className={styles.answerBtn}>
              View Answer
            </Button>
            <CheckIcon />
          </div>
        </div>
      </TabPane>
    </Tabs>
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
