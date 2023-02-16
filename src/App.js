import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CustomNavBar from "./components/CustomNavBar";
import Homee from "./components/Homee";
import ReservetionForm from "./components/ReservationForm";
import ReservationList from "./components/ReservationList";

function App() {
  return (
    <>
      <CustomNavBar claim="Best italian pasta" />
      <ReservetionForm />
      <ReservationList />
      <Homee />
    </>
  );
}

export default App;
