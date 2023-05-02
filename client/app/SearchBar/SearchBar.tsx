import styles from "./page.module.css";

export default function SearchBar() {
  return (
    <div className={styles.searchBox}>
      <h1>🤔 What are you curious about? </h1>
      <input
        type="text"
        placeholder="Search.."
        // onkeyup={showRelatedKeywords(this.value)}
      />
      <div id="related-keywords"></div>
    </div>
  );
}
