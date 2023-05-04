import styles from "./History.module.css";
import Link from "next/link";
const dummpy = [
  {
    title: "AI is the future",
  },
  {
    title: "React is the best library",
  },
  {
    title: "Web design is the best job",
  },
];
const History = () => {
  return (
    <div>
      <Link href="/MyHistory">
        <h1>📝 History</h1>
      </Link>
      <ul>
        {dummpy.map((item) => (
          <li key={item.title} className={styles.item}>
            {item.title}
          </li>
        ))}
      </ul>
      ...
    </div>
  );
};

export default History;
