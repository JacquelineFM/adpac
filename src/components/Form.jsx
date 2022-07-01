import { useState, useEffect } from "react";
import Error from "./Error";

const Form = ({ patient, setPatient, patients, setPatients }) => {
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [email, setEmail] = useState("");
  const [register, setRegister] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [error, setError] = useState(false);

  /* A hook that is called when the component is mounted and when the component is updated. */
  useEffect(() => {
    if (Object.keys(patient).length > 0) {
      setName(patient.name);
      setOwner(patient.owner);
      setEmail(patient.email);
      setRegister(patient.register);
      setSymptoms(patient.symptoms);
    }
  }, [patient]);

  /**
   * It generates a random string of characters.
   * @returns A function that returns a string.
   */
  const getId = () => {
    const random = Math.random().toString(36).substr(2);
    const date = Date.now().toString(36);

    return random + date;
  };

  /**
   * If the form is not empty, then add the new patient to the list of patients, otherwise, display an
   * error message.
   * @returns the form.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    if ([name, owner, email, register, symptoms].includes("")) {
      setError(true);
      return;
    }

    setError(false);

    // New Patient
    const newPatient = {
      name,
      owner,
      email,
      register,
      symptoms,
    };

    if (patient.id) {
      // Edit patient
      newPatient.id = patient.id;

      const updatedPatients = patients.map((patientState) =>
        patientState.id === patient.id ? newPatient : patientState
      );

      setPatients(updatedPatients);
      setPatient({});
    } else {
      // Add patient
      newPatient.id = getId();
      setPatients([...patients, newPatient]);
    }

    // Restart the form
    setName("");
    setOwner("");
    setEmail("");
    setRegister("");
    setSymptoms("");
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Patient Follow-up</h2>
      <p className="text-lg mt-5 text-center mb-10">
        Add patients and{" "}
        <span className="text-indigo-600 font-bold">manage them!</span>{" "}
      </p>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
      >
        {error && (
          <Error>
            <p>All fields are required</p>
          </Error>
        )}
        <div className="mb-5">
          <label
            htmlFor="pet"
            className="block text-gray-700 uppercase font-bold"
          >
            Pet name
          </label>
          <input
            id="pet"
            value={name}
            type="text"
            placeholder="Bunny"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="owner"
            className="block text-gray-700 uppercase font-bold"
          >
            Owner's name
          </label>
          <input
            id="owner"
            value={owner}
            type="text"
            placeholder="Mike"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            onChange={(e) => setOwner(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-gray-700 uppercase font-bold"
          >
            Email
          </label>
          <input
            id="email"
            value={email}
            type="email"
            placeholder="mike.angel@gmail.com"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="register"
            className="block text-gray-700 uppercase font-bold"
          >
            Register
          </label>
          <input
            id="register"
            value={register}
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            onChange={(e) => setRegister(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="symptoms"
            className="block text-gray-700 uppercase font-bold"
          >
            Symptoms
          </label>
          <textarea
            id="symptoms"
            value={symptoms}
            placeholder="Vomiting, fever, etc."
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            onChange={(e) => setSymptoms(e.target.value)}
          />
        </div>
        <input
          value={patient.id ? "Edit patient" : "Add patient"}
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
        />
      </form>
    </div>
  );
};

export default Form;
