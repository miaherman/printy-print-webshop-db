import { makeStyles, Theme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import OrderTable from "./OrderTable";
import ProductTable from "./ProductTable";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

const useStyles = makeStyles((theme: Theme) => ({
  admin: {
    margin: 0,
    paddingTop: theme.spacing(15),
    height: '100vh',
    overflow: "hidden",
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  welcomeText: {
    textAlign: "center",
  }
}));

function Admin() {
  const classes = useStyles();

  const { adminCheck } = useContext(UserContext);


  return (
    <main className={classes.admin}>

      {adminCheck() ? <div>
        <h1>Hey admin</h1>

        <Typography variant="h6" className={classes.title}>
          Products
          </Typography>
        <ProductTable />

        <Typography variant="h6" className={classes.title}>
          Orders
            </Typography>
        <OrderTable />
      </div> :
      
        <Typography variant="h4" className={classes.welcomeText}>You do not have access to view this.</Typography>
      }
    </main>
  );
}
export default Admin;
