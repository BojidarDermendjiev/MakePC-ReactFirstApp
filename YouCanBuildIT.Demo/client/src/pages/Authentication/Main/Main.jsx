import Register from "../Register/Register";
import Login from "../Login/Login";
// import styles from "../../assets/styles/authForm.module.css";
import styles from "../../../assets/styles/authForm.module.css"
import BackgroundMover from "../BackgroundMover/BackgroundMover";

export default function Main({ page }) {
  // Page can be login or register this is like a state that is changed based on the header navigation
  return (
    <section className={styles.formInput}>
      {/* 
        If page === login
        then hide the login tab and show the register tab for navigation

        if page === register
        then hide the register tab and show the login tab for navigation
      */}
      <BackgroundMover page={page}/>
          <Login />
          <Register />
    </section>
  );
}
