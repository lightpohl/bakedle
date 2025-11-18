import { useEffect, useState } from "react";
import clsx from "clsx";

import classes from "./NumPad.module.css";

interface NumPadProps {
  onChange: (value: string) => void;
  onSubmit: () => void;
  value: string;
  enableKeyboard?: boolean;
}

export const NumPad = ({
  onChange,
  onSubmit,
  value,
  enableKeyboard = false,
}: NumPadProps) => {
  const [animationCount, setAnimationCount] = useState(0);
  const [blinkTarget, setBlinkTarget] = useState("");

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      setAnimationCount((prev) => prev + 1);
      setBlinkTarget("");

      if (/^[0-9]$/.test(e.key)) {
        setBlinkTarget(e.key);
        onChange(`${value}${e.key}`);
      } else if (
        e.key === "Enter" &&
        (e.target as HTMLElement).tagName === "BODY"
      ) {
        onSubmit();
      } else if (e.key === "Backspace" && value.length) {
        setBlinkTarget(e.key);
        onChange(value.slice(0, value.length - 1));
      }
    };

    if (enableKeyboard) {
      window.addEventListener("keydown", onKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [enableKeyboard, onChange, onSubmit, value]);

  return (
    <>
      <div className={classes.numPad}>
        <div
          className={clsx(
            classes.numPadButtonWrapper,
            blinkTarget === "1" &&
              (animationCount % 2 === 0 ? classes.blink1 : classes.blink2)
          )}
        >
          <button
            type="button"
            onClick={() => onChange(`${value}1`)}
            data-id={1}
          >
            1
          </button>
        </div>
        <div
          className={clsx(
            classes.numPadButtonWrapper,
            blinkTarget === "2" &&
              (animationCount % 2 === 0 ? classes.blink1 : classes.blink2)
          )}
        >
          <button
            type="button"
            onClick={() => onChange(`${value}2`)}
            data-id={2}
          >
            2
          </button>
        </div>
        <div
          className={clsx(
            classes.numPadButtonWrapper,
            blinkTarget === "3" &&
              (animationCount % 2 === 0 ? classes.blink1 : classes.blink2)
          )}
        >
          <button
            type="button"
            onClick={() => onChange(`${value}3`)}
            data-id={3}
          >
            3
          </button>
        </div>
        <div
          className={clsx(
            classes.numPadButtonWrapper,
            blinkTarget === "4" &&
              (animationCount % 2 === 0 ? classes.blink1 : classes.blink2)
          )}
        >
          <button
            type="button"
            onClick={() => onChange(`${value}4`)}
            data-id={4}
          >
            4
          </button>
        </div>
        <div
          className={clsx(
            classes.numPadButtonWrapper,
            blinkTarget === "5" &&
              (animationCount % 2 === 0 ? classes.blink1 : classes.blink2)
          )}
        >
          <button
            type="button"
            onClick={() => onChange(`${value}5`)}
            data-id={5}
          >
            5
          </button>
        </div>
        <div
          className={clsx(
            classes.numPadButtonWrapper,
            blinkTarget === "6" &&
              (animationCount % 2 === 0 ? classes.blink1 : classes.blink2)
          )}
        >
          <button
            type="button"
            onClick={() => onChange(`${value}6`)}
            data-id={6}
          >
            6
          </button>
        </div>
        <div
          className={clsx(
            classes.numPadButtonWrapper,
            blinkTarget === "7" &&
              (animationCount % 2 === 0 ? classes.blink1 : classes.blink2)
          )}
        >
          <button
            type="button"
            onClick={() => onChange(`${value}7`)}
            data-id={7}
          >
            7
          </button>
        </div>
        <div
          className={clsx(
            classes.numPadButtonWrapper,
            blinkTarget === "8" &&
              (animationCount % 2 === 0 ? classes.blink1 : classes.blink2)
          )}
        >
          <button
            type="button"
            onClick={() => onChange(`${value}8`)}
            data-id={8}
          >
            8
          </button>
        </div>
        <div
          className={clsx(
            classes.numPadButtonWrapper,
            blinkTarget === "9" &&
              (animationCount % 2 === 0 ? classes.blink1 : classes.blink2)
          )}
        >
          <button
            type="button"
            onClick={() => onChange(`${value}9`)}
            data-id={9}
          >
            9
          </button>
        </div>
        <div
          className={clsx(
            classes.numPadButtonWrapper,
            blinkTarget === "0" &&
              (animationCount % 2 === 0 ? classes.blink1 : classes.blink2)
          )}
        >
          <button
            type="button"
            onClick={() => onChange(`${value}0`)}
            data-id={0}
          >
            0
          </button>
        </div>
        <div
          className={clsx(
            classes.numPadButtonWrapper,
            blinkTarget === "Backspace" &&
              (animationCount % 2 === 0 ? classes.blink1 : classes.blink2)
          )}
        >
          <button type="button" onClick={() => onChange("")}>
            Clear
          </button>
        </div>
      </div>
    </>
  );
};
