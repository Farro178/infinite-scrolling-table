import { GiMirrorMirror } from "react-icons/gi";
import classes from "./styles.module.scss";

interface TopbarProps {
  isTableMirrored: boolean;
  setIsTableMirrored: (value: boolean) => void;
}

function Topbar({ isTableMirrored, setIsTableMirrored }: TopbarProps) {
  return (
    <header className={classes["topbar"]}>
      <div className={classes["topbar__link"]}>
        <a href="/">Infinity Scroll</a>
      </div>
      <button
        className={
          isTableMirrored
            ? `${classes["topbar__button"]} ${classes["topbar__button--active"]}`
            : classes["topbar__button"]
        }
        aria-label="Toggle mirrored table"
        onClick={() => setIsTableMirrored(!isTableMirrored)}
      >
        <GiMirrorMirror />
      </button>
    </header>
  );
}

export default Topbar;
