import React from "react";
import "./SubToTal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";
import { Link,useHistory } from "react-router-dom";

function Subtotal() {
  const history = useHistory();
  const [{ basket ,user}, dispatch] = useStateValue();

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              {/* Part of the homework */}
              Subtotal ({user?basket?.length:0} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        // value={getBasketTotal(basket)} // Part of the homework
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />

      <button onClick={e => history.push('/payment')}>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;