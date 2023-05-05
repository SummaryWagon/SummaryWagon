import styles from "./QuickLink.module.css";
interface QuickLinkProps {
  link: string;
}

const QuickLink = ({ link }: QuickLinkProps) => {
  return (
    <a href={link} className={styles.quick_link}>
      Link
    </a>
  );
};

export default QuickLink;
