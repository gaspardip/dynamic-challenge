import ReactDOM from "react-dom/client";
import { App } from "./features/app/App";
import { AppProviders } from "./features/app/AppProviders";
import "./index.css";

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
  <AppProviders>
    <App />
  </AppProviders>
);
