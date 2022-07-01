import { useState, useEffect } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import ListPatients from "./components/ListPatients";

function App() {
  const [patient, setPatient] = useState({});
  const [patients, setPatients] = useState(
    () => JSON.parse(localStorage.getItem("patients")) ?? []
  );

  /* This is a hook that is called every time the patients array is updated. It takes the patients
  array and converts it to a string and then stores it in local storage. */
  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients));
  }, [patients]);

  /**
   * When the deletePatient function is called, it filters through the patients array and returns a new
   * array with the patient that matches the id passed in removed.
   */
  const deletePatient = (id) => {
    const updatedPatients = patients.filter((patient) => patient.id !== id);
    setPatients(updatedPatients);
  };

  return (
    <div className="container mx-auto mt-20">
      <Header />
      <div className="mt-12 md:flex">
        <Form
          patient={patient}
          setPatient={setPatient}
          patients={patients}
          setPatients={setPatients}
        />
        <ListPatients
          patients={patients}
          setPatient={setPatient}
          deletePatient={deletePatient}
        />
      </div>
    </div>
  );
}

export default App;
