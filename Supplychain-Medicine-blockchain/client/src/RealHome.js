import { useNavigate } from "react-router-dom";
import Authenticity from "./Authenticity";
import Immutable from "./Immutable";
import View from "./View";

const RealHome = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full h-[50vh] bg-white flex justify-center ">
        <div className="w-2/3 text-center p-10 space-y-3 flex flex-col items-center justify-center">
          <p className="text-4xl font-bold">
            Transforming pharmacy services with blockchain technology for
            secure, transparent, and reliable healthcare.
          </p>
          <p className="text-xl">
            Empowering patients and providers with next-generation solutions.
          </p>
          <button
            className="btn btn-success  "
            onClick={() => navigate("/roles")}
          >
            Get started
          </button>
        </div>
        <div className="w-1/3">
          <img src="medicines.jpg" className="w-full h-full" />
        </div>
      </div>
      {/* need */}
      <div className="w-full py-7 space-y-6">
        <p className="text-xl font-bold text-center">PharmBc Ensures </p>
        <div className="flex justify-between mx-[200px]">
          <div className="bg-white p-2 rounded-lg space-y-3">
            <Authenticity />
            <p className="text-center text-lg font-semibold">Verification</p>
          </div>
          <div className="bg-white p-2 rounded-lg space-y-3">
            <Immutable />
            <p className="text-center text-lg font-semibold">Immutable</p>
          </div>
          <div className="bg-white p-2 rounded-lg space-y-3">
            <View />
            <p className="text-center text-lg font-semibold">Transperancy</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RealHome;
