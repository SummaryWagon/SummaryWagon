import styles from "./QuickLink.module.css";
interface QuickLinkProps {
  href: string;
}

const QuickLink = ({ href }: QuickLinkProps) => {
  return (
    <a href={href} className={styles.quick_link}>
      Link
    </a>
  );
};

export default QuickLink;
