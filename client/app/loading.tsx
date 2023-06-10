import Spinner from "./components/Spinner";
import styles from "./css/Loading.module.css";


function Loading() {
  return (
    <div className={styles.loading_layout}>
      <Spinner></Spinner>
    </div>
  );
}

export default Loading;
