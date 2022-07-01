import Patient from "./Patient";

const ListPatients = ({ patients, setPatient, deletePatient }) => {
  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
      {patients && patients.length ? (
        <>
          <h2 className="font-black text-3xl text-center">ListPatients</h2>
          <p className="text-lg mt-5 mb-10 text-center">
            Manage your{" "}
            <span className="text-indigo-600 font-bold">
              patients and appointments
            </span>
          </p>
          {patients.map((patient) => (
            <Patient
              key={patient.id}
              patient={patient}
              setPatient={setPatient}
              deletePatient={deletePatient}
            />
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">No patients</h2>
          <p className="text-lg mt-5 mb-10 text-center">
            Start by adding patients and{" "}
            <span className="text-indigo-600 font-bold">
              they will appear in this place
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default ListPatients;
