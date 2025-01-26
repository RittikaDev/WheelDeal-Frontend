import { RouterProvider } from "react-router-dom";
// import MainLayout from "./components/layout/MainLayout";
import router from "./routes/routes";

function App() {
	return (
		<>
			<RouterProvider router={router} />
			{/* <MainLayout /> */}
		</>
	);
}

export default App;
