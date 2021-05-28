import React, { useContext, useEffect, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import CustomerInfo from "./CustomerInfo";
import DeliveryInfo from "./DeliveryInfo";
import PaymentInfo from "./PaymentInfo";
import Orderinfo from "./Orderinfo";
import { CartContext } from "../contexts/CartContext";
import { OrderContext, Order } from "../contexts/OrderContext";
// import { Product } from "../contexts/ProductContext";
import { useHistory } from "react-router";
import { CircularProgress } from "@material-ui/core";
import { UserContext } from "../contexts/UserContext";
import { ProductContext } from "../contexts/ProductContext";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
      textDecoration: "none"
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },

    circularProgress: {
      marginTop: theme.spacing(2),
    },

    orderForm: {
      textAlign: "center"

    }
  })
);

function getSteps() {
  return [
    "Please enter your customer information",
    "Choose shipping method",
    "Choose payment method",
  ];
}

export default function VerticalLinearStepper() {
  const [disabled, setDisabled] = useState(false);

  const classes = useStyles();
  const { cart, orderPrice } = useContext(CartContext);

  const { loggedIn, customer } = useContext(UserContext);

  // createOrderId, payment, customer, cart,

  const { createOrder, delivery } = useContext(OrderContext);
  const { editProduct } = useContext(ProductContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let history = useHistory();

  function navigateToNextPage() {
    history.push("/orderconfirmation");
  }

  function navigateToStartPage() {
    history.push("/");
  }

  const completeBooking = async () => {
    setDisabled(true);

    console.log(customer);

    const order: Order = {
      customer: customer,
      shipping: delivery.shippingMethod,
      price: orderPrice + delivery.price,
      products: cart,
    };

    for (const product of order.products) {
      if (
        !product.stock ||
        !product.quantity ||
        product.stock < product.quantity
      ) {
        alert(
          "Det finns bara " +
            product.stock +
            " kvar i lagret av " +
            product.title
        );
        navigateToStartPage();
        break;
      }
      editProduct(product, product.stock - 1);
    }
      createOrder(order);
      await mockApi(order);
      navigateToNextPage();
  };

  async function mockApi(order: Order) {
    console.log(order);
    console.log(cart);
    await timeOut();
    return true;
  }

  async function timeOut() {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  }

  const [activeStep, setActiveStep] = React.useState(0);
  const [hasErrorInForm, setHasErrorInForm] = React.useState(true);
  const steps = getSteps();

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <CustomerInfo onErrorChange={setHasErrorInForm} />;
      case 1:
        return <DeliveryInfo />;
      case 2:
        return (
          <PaymentInfo
            onErrorChange={setHasErrorInForm}
            onErrorChange2={setHasErrorInForm}
            onErrorChange3={setHasErrorInForm}
          />
        );
      default:
        return "Unknown step";
    }
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div>
      {loggedIn ? (
        <div className={classes.root}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  {getStepContent(index)}
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.button}>
                        Back
                      </Button>
                      <Button
                        disabled={hasErrorInForm}
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}>
                        Next
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} className={classes.resetContainer}>
              <Orderinfo />
              <div className={classes.buttonContainer}>
                <Button
                  variant="contained"
                  onClick={handleReset}
                  className={classes.button}
                  color="primary">
                  Change your information
                </Button>
                {disabled ? (
                  <CircularProgress className={classes.circularProgress} />
                ) : (
                  <Button
                    onClick={completeBooking}
                    className={classes.button}
                    color="primary"
                    variant="contained">
                    Confirm order
                  </Button>
                )}
              </div>
            </Paper>
          )}
        </div>
      ) : (
        <div className={classes.orderForm}>
          <h3>Login or Register an account to make an order</h3>
          <Link to="/register">
            <Button
              className={classes.button}
              color="primary"
              variant="contained">
              Register
            </Button>
          </Link>

          <Link to="/login">
            <Button
              className={classes.button}
              color="primary"
              variant="contained">
              Log in
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
