import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CustomNavBar from "./components/CustomNavBar";
import Home from "./components/Home";

function App() {
  return (
    <>
      <CustomNavBar claim="Best italian pasta" />
      <Home />
    </>
  );
}

export default App;
