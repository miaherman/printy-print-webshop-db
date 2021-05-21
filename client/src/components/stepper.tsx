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
import { Product } from "../contexts/ProductContext";
import { useHistory } from "react-router";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
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
      justifyContent: "center"
    },

    circularProgress: {
      marginTop: theme.spacing(2),      
      },
  })
);

function getSteps() {
  return [
    "Fyll i dina personuppgifter",
    "Välj typ av leverans",
    "Välj betalningssätt",
  ];
}

export default function VerticalLinearStepper() {
  const [disabled, setDisabled] = useState(false);

  const classes = useStyles();
  const { orderPrice, delivery } = useContext(
    CartContext
  );

  // createOrderId, payment, customer, cart,

  const { createOrder } = useContext(OrderContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let history = useHistory();

  function navigateToNextPage() {
    history.push("/orderconfirmation");
  }

  const completeBooking = async () => {
    setDisabled(true);

    const testProduct: Product = {
      title: "produkt",
      description: "string",
      price: 10,
      image: "url",
      size: "50 x 70",
      path: "url",
      category: "text",
      stock: 10
    }

    const testProducts = [testProduct]

    const order: Order = {
      products: testProducts,
      shipping: delivery.deliveryType,
      price: orderPrice + delivery.deliveryPrice,
    };

    createOrder(order);

    await mockApi(order);
    navigateToNextPage();
  };

  async function mockApi(order: Order) {
    console.log(order);
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
                    className={classes.button}
                  >
                    Tillbaka
                  </Button>
                  <Button
                    disabled={hasErrorInForm}
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    Gå vidare
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
              color="primary"
            >
              Ändra dina uppgifter
            </Button>
            {disabled ? (
                <CircularProgress className={classes.circularProgress} />
            ) : (
              <Button
                onClick={completeBooking}
                className={classes.button}
                color="primary"
                variant="contained"
              >
                Bekräfta beställning
              </Button>
            )}
          </div>
        </Paper>
      )}
    </div>
  );
}
