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
    justifyContent: "center",
    marginBottom: "3rem", 
  },
  title: {
    margin: theme.spacing(4, 0, 2),
    marginLeft: "1rem"
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
        <h1 className={classes.title} >Hey admin!</h1>

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
