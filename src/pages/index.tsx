import styles from './index.less';

export default function IndexPage() {
  let a: number = 1;
  console.log(`CurrentEnvironment: ${CurrentEnvironment}`);
  console.log('自定义环境变量', REACT_APP_ENV);
  return (
    <div>
      <h1 className={styles.title}>{`this is page ${a}`}</h1>
    </div>
  );
}
