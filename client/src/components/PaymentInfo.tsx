import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";

import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { CartContext } from "../contexts/CartContext";
import { UserContext } from "../contexts/UserContext";

interface Props {
  onErrorChange: (error: boolean) => void;
  onErrorChange2: (error: boolean) => void;
  onErrorChange3: (error: boolean) => void;
}

function PaymentInfo({ onErrorChange, onErrorChange2, onErrorChange3 }: Props) {
  const { getPayment, payment, cardDetails, invoice, getInvoiceDetails, getCardDetails } = useContext(CartContext);
  const { customer } = useContext(UserContext);
  const [swishNumber, setSwishNumber] = useState(customer.phoneNr);

  const [swishError, setSwishError] = useState("");

  const [cardError, setCardError] = useState("");
  const [dateError, setDateError] = useState("");
  const [cvcError, setCvcError] = useState("");

  const [invoiceError, setInvoiceError] = useState("");

  const handlePayment = (e: ChangeEvent<HTMLInputElement>) => {
    getPayment({ ...payment, paymentType: e.target.value });
  };

  useEffect(() => {
    if (payment.paymentType === "Swish") {
      const hasError = Boolean(swishError);
      const hasMissingInfo = !customer.phoneNr;
      onErrorChange(hasError || hasMissingInfo);
    } else if (payment.paymentType === "Card") {
      const hasError = Boolean(cardError || dateError || cvcError);
      const hasMissingInfo = !cardDetails.cardNumber || !cardDetails.cardDate || !cardDetails.cardCvc;
      onErrorChange2(hasError || hasMissingInfo);
    } else if (payment.paymentType === "Invoice") {
      const hasError = Boolean(invoiceError);
      const hasMissingInfo = !invoice;
      onErrorChange3(hasError || hasMissingInfo);
    }
  }, [
    customer.phoneNr,
    swishError,
    cardError,
    dateError,
    cvcError,
    invoiceError,
    cardDetails.cardNumber,
    cardDetails.cardDate,
    cardDetails.cardCvc,
    invoice,
    onErrorChange,
    onErrorChange2,
    onErrorChange3,
    payment.paymentType
  ]);

  const handleSwishChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSwishNumber(e.target.value);

    if (!/^[0-9]+$/.test(e.target.value)) {
      setSwishError("Only numbers allowed in this field");
    } else {
      setSwishError("");
    }
  };

  const handleCardChange = (e: ChangeEvent<HTMLInputElement>) => {
    getCardDetails({ ...cardDetails, cardNumber: e.target.value })


    if (!/^[0-9]+$/.test(e.target.value)) {
      setCardError("Only numbers allowed in this field");
    } else {
      setCardError("");
    }
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    getCardDetails({ ...cardDetails, cardDate: e.target.value })

    if (!/^[0-9]+$/.test(e.target.value)) {
      setDateError("Only numbers allowed in this field");
    } else {
      setDateError("");
    }
  };

  const handleCvcChange = (e: ChangeEvent<HTMLInputElement>) => {
    getCardDetails({ ...cardDetails, cardCvc: e.target.value })

    if (!/^[0-9]+$/.test(e.target.value)) {
      setCvcError("Only numbers allowed in this field");
    } else {
      setCvcError("");
    }
  };

  const handleInvoiceChange = (e: ChangeEvent<HTMLInputElement>) => {
    getInvoiceDetails(e.target.value)

    if (!/^[0-9]+$/.test(e.target.value)) {
      setInvoiceError("Only numbers allowed in this field");
    } else {
      setInvoiceError("");
    }
  };

  return (
    <div>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="payment"
          name="payment"
          value={payment.paymentType}
          onChange={handlePayment}
          row
        >
          <FormControlLabel value="Swish" control={<Radio />} label="Swish" />
          <FormControlLabel
            value="Card"
            control={<Radio />}
            label="Card"
          />
          <FormControlLabel
            value="Invoice"
            control={<Radio />}
            label="Invoice"
          />
        </RadioGroup>
      </FormControl>
      <div>
        {payment.paymentType === "Swish" ? (
          <form autoComplete="on">
            <TextField
              key="mobilenumber"
              id="mobilenumber"
              value={swishNumber}
              onChange={handleSwishChange}
              label="Mobile number"
              required
              style={{ margin: 8 }}
              placeholder="07X XXXXXXX"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              helperText={swishError}
              error={Boolean(swishError)}
            />
          </form>
        ) : payment.paymentType === "Card" ? (
          <form autoComplete="on">
            <TextField
              id="frmCCNum"
              label="Card Number"
              value={cardDetails.cardNumber}
              onChange={handleCardChange}
              required
              autoComplete="cc-number"
              style={{ margin: 8 }}
              placeholder="0000 1111 2222 3333"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              helperText={cardError}
              error={Boolean(cardError)}
            />
            <TextField
              id="frmCCExp"
              label="Date"
              value={cardDetails.cardDate}
              onChange={handleDateChange}
              autoComplete="cc-exp"
              required
              style={{ margin: 8 }}
              placeholder="MM/YY"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              helperText={dateError}
              error={Boolean(dateError)}
            />
            <TextField
              id="frmCCCVC"
              label="CVV/CVC"
              value={cardDetails.cardCvc}
              onChange={handleCvcChange}
              autoComplete="cc-csc"
              required
              style={{ margin: 8 }}
              placeholder="CVV / CVC"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              helperText={cvcError}
              error={Boolean(cvcError)}
            />
          </form>
        ) : payment.paymentType === "Invoice" ? (
          <form autoComplete="on">
            <TextField
              key="personalnumber"
              id="personalnumber"
              label="Personal Number"
              value={invoice}
              onChange={handleInvoiceChange}
              required
              fullWidth
              style={{ margin: 8 }}
              placeholder="YYYYMMDDXXXX"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              helperText={invoiceError}
              error={Boolean(invoiceError)}
            />
          </form>
        ) : null}
      </div>
    </div>
  );
}

export default PaymentInfo;
