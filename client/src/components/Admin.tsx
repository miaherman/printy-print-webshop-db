import { makeStyles, Theme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import OrderTable from "./OrderTable";
import ProductTable from "./ProductTable";

const useStyles = makeStyles((theme: Theme) => ({
  admin: {
    margin: 0,
    marginTop: theme.spacing(15),
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  }
}));

function Admin() {

  const classes = useStyles();

  return (
    <main className={classes.admin}>
      <h1>Hej admin</h1>

      <Typography variant="h6" className={classes.title}>
        Produkter
      </Typography>
      <ProductTable/>

      <Typography variant="h6" className={classes.title}>
        Beställningar
      </Typography>
      <OrderTable/>


    </main>
  );
}
export default Admin;
