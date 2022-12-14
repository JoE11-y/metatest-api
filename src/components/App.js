import { EthereumContext } from "../eth/context";
import { createProvider } from "../eth/provider";
import { createInstance } from "../eth/metatest";

import "./App.css";
import Send from "./Send";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const provider = createProvider();
  const metaTest = createInstance(provider);
  const ethereumContext = { provider, metaTest };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Test DApp Sender</h1>
        <p>powered by Defender Relayer meta-transactions</p>
      </header>
      <section className="App-content">
        <EthereumContext.Provider value={ethereumContext}>
          <Send />
        </EthereumContext.Provider>
      </section>
      <ToastContainer hideProgressBar={true} />
    </div>
  );
}

export default App;
