import React from "react";
import { Link } from "react-router-dom";

import styles from "../../../assets/styles/authForm.module.css";
export default function BackgroundMover() {
  return (
    <div>
      <div className={styles["toggle-container"]}>
        <div className={styles.toggle}>
          <Link to="/register">
            <div
              className={`${styles["toggle-panel"]} ${styles["toggle-right"]}`}
            >
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button className={styles.hidden} id={"register"}>
                Sign In
              </button>
            </div>
          </Link>
        </div>
      </div>

      <div className={styles["account-info"]}>
        <p>
          Don't have an account? <Link to="/register">Sign Up here</Link>.
        </p>
      </div>

      <div className={styles["toggle-container"]}>
        <div className={styles.toggle}>
          <Link to="/login">
            <div
              className={`${styles["toggle-panel"]} ${styles["toggle-left"]}`}
            >
              <h1>Welcome Back! </h1>
              <p>Enter your personal details to use all of site features</p>
              <button className={styles.hidden} id="login">
                Sign In
              </button>
            </div>
          </Link>
        </div>
      </div>

      <div className={styles["account-info"]}>
        <p>
          Already have an account? <Link to="/login">Sign In here</Link>.
        </p>
      </div>
    </div>
  );
}
