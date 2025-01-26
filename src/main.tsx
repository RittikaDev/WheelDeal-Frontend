import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { store } from "./redux/store";
import { Provider } from "react-redux";
// import { RouterProvider } from "react-router-dom";
// import { Toaster } from "sonner";
import App from "./App";
import ThemeProvider from "./components/themeSwitch/ThemeProvider";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<ThemeProvider defaultTheme="system">
				<App />
			</ThemeProvider>
			{/* <Toaster /> */}
		</Provider>
	</StrictMode>
);
