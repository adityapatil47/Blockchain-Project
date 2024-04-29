import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json";
import { FaArrowRight } from "react-icons/fa";

function Supply() {
  const navigate = useNavigate();
  useEffect(() => {
    loadWeb3();
    loadBlockchaindata();
  }, []);

  const [currentaccount, setCurrentaccount] = useState("");
  const [loader, setloader] = useState(true);
  const [SupplyChain, setSupplyChain] = useState();
  const [MED, setMED] = useState();
  const [MedStage, setMedStage] = useState();
  const [ID, setID] = useState();

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };
  const loadBlockchaindata = async () => {
    setloader(true);
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    setCurrentaccount(account);
    const networkId = await web3.eth.net.getId();
    const networkData = SupplyChainABI.networks[networkId];
    if (networkData) {
      const supplychain = new web3.eth.Contract(
        SupplyChainABI.abi,
        networkData.address
      );
      setSupplyChain(supplychain);
      var i;
      const medCtr = await supplychain.methods.medicineCtr().call();
      const med = {};
      const medStage = [];
      for (i = 0; i < medCtr; i++) {
        med[i] = await supplychain.methods.MedicineStock(i + 1).call();
        medStage[i] = await supplychain.methods.showStage(i + 1).call();
      }
      setMED(med);
      setMedStage(medStage);
      setloader(false);
    } else {
      window.alert("The smart contract is not deployed to current network");
    }
  };
  if (loader) {
    return (
      <div>
        <h1 className="wait">Loading...</h1>
      </div>
    );
  }
  const redirect_to_home = () => {
    navigate("/");
  };
  const handlerChangeID = (event) => {
    setID(event.target.value);
  };
  const handlerSubmitRMSsupply = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .RMSsupply(ID)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("An error occured!!!");
    }
  };
  const handlerSubmitManufacturing = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .Manufacturing(ID)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("An error occured!!!");
    }
  };
  const handlerSubmitDistribute = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .Distribute(ID)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("An error occured!!!");
    }
  };
  const handlerSubmitRetail = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .Retail(ID)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("An error occured!!!");
    }
  };
  const handlerSubmitSold = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .sold(ID)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("An error occured!!!");
    }
  };
  return (
    <div className="px-[3rem] py-[3rem]">
      <div className="container mx-auto py-8 mb-5">
        <h2 className="text-2xl font-bold mb-4">Supply Chain Flow: Medicine</h2>
        <div className="flex items-center justify-between mt-5 ">
          <div className="step flex-1">
            <h3 className="font-semibold">Step One</h3>
            <h3 className="font-semibold">Raw Material Supplier</h3>
            <p>Provides raw materials for manufacturing</p>
          </div>
          <FaArrowRight />
          <div className="step flex-1">
            <h3 className="font-semibold">Step Two</h3>
            <h3 className="font-semibold">Manufacturer</h3>
            <p>Produces medicine</p>
          </div>
          <FaArrowRight />{" "}
          <div className="step flex-1">
            <h3 className="font-semibold">Step Three</h3>
            <h3 className="font-semibold">Distributor</h3>
            <p>Distributes medicine to retailers</p>
          </div>
          <FaArrowRight />{" "}
          <div className="step flex-1">
            <h3 className="font-semibold">Step Four</h3>
            <h3 className="font-semibold">Retailer</h3>
            <p>Sells medicine to consumers</p>
          </div>
          <FaArrowRight />
          <div className="step flex-1">
            <h3 className="font-semibold">Step Five</h3>
            <h3 className="font-semibold">Consumer</h3>
            <p>Receives and uses medicine</p>
          </div>
        </div>
        <div className="w-[60%] bg-gray-200 mt-4 rounded-full h-2 relative">
          <div className="progress bg-blue-500 h-full rounded-full"></div>
        </div>
      </div>
      <div className="mx-auto mt-6 mb-4">
        <b className="font-bold   ">Current Account Address:</b>{" "}
        {currentaccount}
      </div>
      <h4 className="font-bold mt-5 text-[20px]">List of Medicines:</h4>

      <table className="table border-[2px] mt-2 mb-2 table-sm table-dark">
        <thead>
          <tr className="bg-base-200 ">
            <th scope="col">Medicine ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Current Processing Stage</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(MED).map(function (key) {
            return (
              <tr key={key}>
                <td>{MED[key].id}</td>
                <td>{MED[key].name}</td>
                <td>{MED[key].description}</td>
                <td>{MedStage[key]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="h-[1px] w-full bg my-8"></div>
      <h5 className="">
        <b>Step 1: Supply Raw Materials</b>(Only a registered Raw Material
        Supplier can perform this step):-
      </h5>
      <form
        className="flex gap-2 items-center mt-4 mb-4"
        onSubmit={handlerSubmitRMSsupply}
      >
        <input
          className="form-control-sm input input-bordered input-sm"
          type="text"
          onChange={handlerChangeID}
          placeholder="Enter Medicine ID"
          required
        />
        <button
          className="btn btn-success btn-sm"
          onSubmit={handlerSubmitRMSsupply}
        >
          Supply
        </button>
      </form>
      <div className="h-[1px] w-full bg-[grey] my-3"></div>
      <br />
      <h5>
        <b>Step 2: Manufacture</b>(Only a registered Manufacturer can perform
        this step):-
      </h5>
      <form
        className="flex gap-2 items-center mt-4 mb-4"
        onSubmit={handlerSubmitManufacturing}
      >
        <input
          className="form-control-sm input input-bordered input-sm"
          type="text"
          onChange={handlerChangeID}
          placeholder="Enter Medicine ID"
          required
        />
        <button
          className="btn btn-success btn-sm"
          onSubmit={handlerSubmitManufacturing}
        >
          Manufacture
        </button>
      </form>
      <div className="h-[1px] w-full bg-[grey] my-3"></div>
      <br />
      <h5>
        <b>Step 3: Distribute</b>(Only a registered Distributor can perform this
        step):-
      </h5>
      <form
        className="flex gap-2 items-center mt-4 mb-4"
        onSubmit={handlerSubmitDistribute}
      >
        <input
          className="form-control-sm input input-bordered input-sm"
          type="text"
          onChange={handlerChangeID}
          placeholder="Enter Medicine ID"
          required
        />
        <button
          className="btn btn-success btn-sm"
          onSubmit={handlerSubmitDistribute}
        >
          Distribute
        </button>
      </form>
      <div className="h-[1px] w-full bg-[grey] my-3"></div>
      <br />
      <h5>
        <b>Step 4: Retail</b>(Only a registered Retailer can perform this
        step):-
      </h5>
      <form
        className="flex gap-2 items-center mt-4 mb-4"
        onSubmit={handlerSubmitRetail}
      >
        <input
          className="form-control-sm input input-bordered input-sm"
          type="text"
          onChange={handlerChangeID}
          placeholder="Enter Medicine ID"
          required
        />
        <button
          className="btn btn-success btn-sm"
          onSubmit={handlerSubmitRetail}
        >
          Retail
        </button>
      </form>
      <div className="h-[1px] w-full bg-[grey] my-3"></div>
      <br />
      <h5>
        <b>Step 5: Mark as sold</b>(Only a registered Retailer can perform this
        step):-
      </h5>
      <form
        className="flex gap-2 items-center mt-4 mb-4"
        onSubmit={handlerSubmitSold}
      >
        <input
          className="form-control-sm input input-bordered input-sm"
          type="text"
          onChange={handlerChangeID}
          placeholder="Enter Medicine ID"
          required
        />
        <button className="btn btn-success btn-sm" onSubmit={handlerSubmitSold}>
          Sold
        </button>
      </form>
      <div className="h-[1px] w-full bg-[grey] my-3"></div>
    </div>
  );
}

export default Supply;
