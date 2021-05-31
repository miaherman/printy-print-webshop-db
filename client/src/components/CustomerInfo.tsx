import React, { ChangeEvent, useContext, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles, Theme } from "@material-ui/core";
import { useState } from "react";
// import { CartContext } from "../contexts/CartContext";
import { UserContext } from "../contexts/UserContext";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    justifyContent: "center",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%",
  },
  infoContainer: {
    justifyContent: "center",
    textAlign: "center",
  },
}));

interface Props {
  onErrorChange: (error: boolean) => void;
}

function CustomerInfo({ onErrorChange }: Props) {
  const classes = useStyles();
  const { customer, createCustomer, loggedIn } = useContext(UserContext);

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [postalCodeError, setPostalCodeError] = useState("");
  const [cityError, setCityError] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {

    const hasError = Boolean(
      firstNameError ||
        lastNameError ||
        addressError ||
        postalCodeError ||
        cityError ||
        mobileNumberError ||
        emailError ||
        passwordError
    );
    const hasMissingInfo =
      !customer.firstName ||
      !customer.lastName ||
      !customer.address ||
      !customer.zipCode ||
      !customer.city ||
      !customer.phoneNr ||
      !customer.email ||
      (!loggedIn && !customer.password);

    console.log({ hasError, hasMissingInfo, customer })
    onErrorChange(hasError || hasMissingInfo);
  }, [
    firstNameError,
    lastNameError,
    addressError,
    postalCodeError,
    cityError,
    mobileNumberError,
    emailError,
    passwordError,
    customer,
    onErrorChange,
    loggedIn
  ]);

  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedCustomer = { ...customer, firstName: e.target.value }
    createCustomer(updatedCustomer);
    console.log({ updatedCustomer });

    if (!/^[a-öA-Ö]+$/.test(e.target.value)) {
      setFirstNameError("Only letters allowed in this field");
    } else {
      setFirstNameError("");
    }
  };

  const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    createCustomer({ ...customer, lastName: e.target.value });

    if (!/^[a-öA-Ö]+$/.test(e.target.value)) {
      setLastNameError("Only letters allowed in this field");
    } else {
      setLastNameError("");
    }
  };

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    createCustomer({ ...customer, address: e.target.value });

    if (!/^[a-öA-Ö0-9" "]+$/.test(e.target.value)) {
      setAddressError("Only numbers and letters allowed in this field");
    } else {
      setAddressError("");
    }
  };

  const handlePostalCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    createCustomer({ ...customer, zipCode: e.target.value });

    if (!/^(s-|S-){0,1}[0-9]{3}\s?[0-9]{2}$/.test(e.target.value)) {
      setPostalCodeError("Enter five numbers");
    } else {
      setPostalCodeError("");
    }
  };

  const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    createCustomer({ ...customer, city: e.target.value });

    if (!/^[a-öA-Ö]+$/.test(e.target.value)) {
      setCityError("Only letters allowed in this field");
    } else {
      setCityError("");
    }
  };

  const handleMobileNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    createCustomer({ ...customer, phoneNr: e.target.value });

    if (!/^[0-9]+$/.test(e.target.value)) {
      setMobileNumberError("Only numbers allowed in this field");
    } else {
      setMobileNumberError("");
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    createCustomer({ ...customer, email: e.target.value, role: "customer", password: "password"});

    if (
      !/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        e.target.value
      )
    ) {
      setEmailError("Please add a correct email-address");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    createCustomer({ ...customer, password: e.target.value, role: "customer"});

    // if (
    //   !/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    //     e.target.value
    //   )
    // ) {
    //   setPasswordError("Var god ange en korrekt password");
    // } else {
    //   setPasswordError("");
    // }
    setPasswordError("");
  };

  return (
    <div className={classes.infoContainer}>
      <form autoComplete="on">
        <TextField
          value={customer.firstName}
          onChange={handleFirstNameChange}
          id="firstname"
          label="First name"
          required
          style={{ margin: 8 }}
          placeholder="Firstname"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          helperText={firstNameError}
          error={Boolean(firstNameError)}
        />
        <TextField
          value={customer.lastName}
          onChange={handleLastNameChange}
          id="lastname"
          label="Last name"
          style={{ margin: 8 }}
          placeholder="Lastname"
          fullWidth
          required
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          helperText={lastNameError}
          error={Boolean(lastNameError)}
        />
        <TextField
          value={customer.address}
          onChange={handleAddressChange}
          id="address"
          required
          label="Address"
          style={{ margin: 8 }}
          placeholder="Address"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          helperText={addressError}
          error={Boolean(addressError)}
        />
        <TextField
          value={customer.zipCode}
          onChange={handlePostalCodeChange}
          id="postal-code"
          label="Zip code"
          required
          style={{ margin: 8 }}
          placeholder="Zipcode"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          helperText={postalCodeError}
          error={Boolean(postalCodeError)}
        />
        <TextField
          value={customer.city}
          onChange={handleCityChange}
          id="city"
          label="City"
          required
          style={{ margin: 8 }}
          placeholder="City"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          helperText={cityError}
          error={Boolean(cityError)}
        />
        <TextField
          value={customer.email}
          onChange={handleEmailChange}
          id="email"
          label="Email"
          required
          style={{ margin: 8 }}
          placeholder="Email"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          helperText={emailError}
          error={Boolean(emailError)}
        />
        <TextField
          value={customer.phoneNr}
          onChange={handleMobileNumberChange}
          id="mobilenumber"
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
          helperText={mobileNumberError}
          error={Boolean(mobileNumberError)}
        />

          {loggedIn ? null : 
          <TextField
          value={customer.password}
          onChange={handlePasswordChange}
          id="password"
          label="Password"
          type="password"
          required
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          helperText={passwordError}
          error={Boolean(passwordError)}
        />}
        

      </form>
    </div>
  );
}

export default CustomerInfo;
