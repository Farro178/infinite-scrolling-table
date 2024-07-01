import { useState } from "react";
import Footer from "./components/Footer/Footer";
import ProductTable from "./components/ProductTable/ProductTable";
import Navbar from "./components/Topbar/Topbar";
import classes from "./styles.module.scss";

function App() {
  const [isTableMirrored, setIsTableMirrored] = useState(false);

  return (
    <div className={classes.app}>
      <div className={classes["app"]}>
        <Navbar
          isTableMirrored={isTableMirrored}
          setIsTableMirrored={setIsTableMirrored}
        />
        <div className={classes["product__table__group"]}>
          <ProductTable />

          {isTableMirrored ? <ProductTable /> : null}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
