import styles from "./PageWrapper.module.scss"

interface PageWrapperProps {
  children: React.ReactNode;
}
const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <section className={styles.pageWrapper}>
      {children}
    </section>
  )
}

export default PageWrapper
