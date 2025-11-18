import classes from "./Spinner.module.css";

export const Spinner = () => {
  return (
    <div className={classes.spinner} aria-hidden="true">
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
