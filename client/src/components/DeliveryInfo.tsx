import React, { ChangeEvent, useContext } from 'react';
import {
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
  } from "@material-ui/core";
import { OrderContext } from "../contexts/OrderContext";

function DeliveryInfo() {
    const { deliveries, delivery, getDelivery } = useContext(OrderContext);

    const handleDelivery = (e: ChangeEvent<HTMLInputElement>) => {

      if (e.target.value === 'Express') {
        getDelivery({ ...delivery, price: deliveries[0].price, shippingMethod: deliveries[0].shippingMethod, time: deliveries[0].time })
      } else if (e.target.value === 'Instabox') {
        getDelivery({ ...delivery, price: deliveries[1].price, shippingMethod: deliveries[1].shippingMethod, time: deliveries[1].time })
      } else {
        getDelivery({ ...delivery, price: deliveries[2].price, shippingMethod: deliveries[2].shippingMethod, time: deliveries[2].time })
      }
    };

    let current_datetime = new Date()

    let express = new Date(current_datetime)
    express.setDate(express.getDate() + 1)
    let formatted_express = express.getDate() + "-" + (express.getMonth() + 1) + "-" + express.getFullYear();

    let instaBox = new Date(current_datetime)
    instaBox.setDate(express.getDate() + 2)
    let formatted_instaBox = instaBox.getDate() + "-" + (instaBox.getMonth() + 1) + "-" + instaBox.getFullYear();

    let postnord = new Date(current_datetime)
    postnord.setDate(express.getDate() + 7)
    let formatted_postnord = postnord.getDate() + "-" + (postnord.getMonth() + 1) + "-" + express.getFullYear();
    
    return (
        <div>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="delivery"
              name="delivery"
              value={delivery.shippingMethod}
              onChange={handleDelivery}
              row
            >
              <FormControlLabel
                value="Express"
                control={<Radio />}
                label={"Express (24h, delivered " + formatted_express + ") + 100SEK"}
              />
              <FormControlLabel
                value="Instabox"
                control={<Radio />}
                label={"Instabox (48h, delivered " + formatted_instaBox + ") + 100SEK"}
              />
              <FormControlLabel
                value="Postnord"
                control={<Radio />}
                label={"Postnord (aprox 1 week, delivered " + formatted_postnord  + ") Free shipping"}
              />
            </RadioGroup>
          </FormControl>
        </div>
    )
}

export default DeliveryInfo;