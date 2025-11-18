import classes from "./Tooltip.module.css";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

export const Tooltip = ({ children, text }: TooltipProps) => {
  return (
    <span className={classes.tooltip} data-text={text}>
      {children}
    </span>
  );
};
