import { useRef, useState, useContext } from "react";
import { triggerSend } from "../eth/triggerSend";
import { EthereumContext } from "../eth/context";
import { toast } from "react-toastify";
import "./Send.css";

function Send() {
  const addressInput = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const { metaTest, provider } = useContext(EthereumContext);

  const sendTx = async (event) => {
    event.preventDefault();
    const depositAddress = addressInput.current.value;
    setSubmitting(true);

    try {
      const response = await triggerSend(metaTest, provider, depositAddress);
      const hash = response.hash;
      const onClick = hash
        ? () => window.open(`https://goerli.etherscan.io/tx/${hash}`)
        : undefined;
      toast("Transaction sent!", { type: "info", onClick });
      addressInput.current.value = "";
    } catch (err) {
      console.log(err);
      toast(err.message || err, { type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="Container">
      <form onSubmit={sendTx}>
        <input
          required={true}
          placeholder="Enter Deposit Address"
          ref={addressInput}
        ></input>
        <button type="submit" disabled={submitting}>
          {submitting ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}

export default Send;
