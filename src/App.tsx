import { useState } from "react";
import Footer from "./components/Footer/Footer";
import ProductTable from "./components/ProductTable/ProductTable";
import Navbar from "./components/Topbar/Topbar";
import classes from "./styles.module.scss";

function App() {
  const [isTableMirrored, setIsTableMirrored] = useState(false);

  const handlePrimaryElementScroll = (e: HTMLDivElement | null | undefined) => {
    const primaryElement = e;

    if (primaryElement?.parentNode) {
      const secondaryElement = document.getElementById(
        "secondary-product-table"
      );

      const height = primaryElement.scrollHeight - primaryElement.clientHeight;
      if (secondaryElement) {
        const secondaryHeight =
          secondaryElement.scrollHeight - secondaryElement.clientHeight;
        const newSecondaryPosition = Math.ceil(
          (primaryElement.scrollTop / height) * secondaryHeight
        );

        secondaryElement.scroll({
          top: newSecondaryPosition,
        });
      }
    }
  };

  const handleSecondaryElementScroll = (
    e: HTMLDivElement | null | undefined
  ) => {
    const secondaryElement = e;

    if (secondaryElement?.parentElement) {
      const primaryElement = document.getElementById("primary-product-table");
      const height =
        secondaryElement.scrollHeight - secondaryElement.clientHeight;
      if (primaryElement) {
        const primaryHeight =
          primaryElement.scrollHeight - primaryElement.clientHeight;
        const newPrimaryPosition =
          (secondaryElement.scrollTop / height) * primaryHeight;

        primaryElement.scroll({
          top: newPrimaryPosition,
        });
      }
    }
  };

  return (
    <div className={classes.app}>
      <div className={classes["app"]}>
        <Navbar
          isTableMirrored={isTableMirrored}
          setIsTableMirrored={setIsTableMirrored}
        />
        <div className={classes["app__product-table-group"]}>
          <ProductTable
            id="primary-product"
            handleScroll={handlePrimaryElementScroll}
          />

          {isTableMirrored ? (
            <ProductTable
              id="secondary-product"
              handleScroll={handleSecondaryElementScroll}
            />
          ) : null}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
