import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json";

function Track() {
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
  const [RMS, setRMS] = useState();
  const [MAN, setMAN] = useState();
  const [DIS, setDIS] = useState();
  const [RET, setRET] = useState();
  const [TrackTillSold, showTrackTillSold] = useState(false);
  const [TrackTillRetail, showTrackTillRetail] = useState(false);
  const [TrackTillDistribution, showTrackTillDistribution] = useState(false);
  const [TrackTillManufacture, showTrackTillManufacture] = useState(false);
  const [TrackTillRMS, showTrackTillRMS] = useState(false);
  const [TrackTillOrdered, showTrackTillOrdered] = useState(false);

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
        med[i + 1] = await supplychain.methods.MedicineStock(i + 1).call();
        medStage[i + 1] = await supplychain.methods.showStage(i + 1).call();
      }
      setMED(med);
      setMedStage(medStage);
      const rmsCtr = await supplychain.methods.rmsCtr().call();
      const rms = {};
      for (i = 0; i < rmsCtr; i++) {
        rms[i + 1] = await supplychain.methods.RMS(i + 1).call();
      }
      setRMS(rms);
      const manCtr = await supplychain.methods.manCtr().call();
      const man = {};
      for (i = 0; i < manCtr; i++) {
        man[i + 1] = await supplychain.methods.MAN(i + 1).call();
      }
      setMAN(man);
      const disCtr = await supplychain.methods.disCtr().call();
      const dis = {};
      for (i = 0; i < disCtr; i++) {
        dis[i + 1] = await supplychain.methods.DIS(i + 1).call();
      }
      setDIS(dis);
      const retCtr = await supplychain.methods.retCtr().call();
      const ret = {};
      for (i = 0; i < retCtr; i++) {
        ret[i + 1] = await supplychain.methods.RET(i + 1).call();
      }
      setRET(ret);
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
  if (TrackTillSold) {
    return (
      <>
        <div className="p-[3rem]">
          <button
            onClick={() => {
              showTrackTillSold(false);
            }}
            className="btn btn-success btn-sm my-2"
          >
            Track Another Item
          </button>

          <article className="col-4 m-auto">
            <h3>
              <b>
                <u className="font-bold mt-5 text-[20px]">Medicine:</u>
              </b>
            </h3>
            <span>
              <b>Medicine ID: </b>
              {MED[ID].id}
            </span>
            <br />
            <span>
              <b>Name:</b> {MED[ID].name}
            </span>
            <br />
            <span>
              <b>Description: </b>
              {MED[ID].description}
            </span>
            <br />
            <span>
              <b>Current stage: </b>
              {MedStage[ID]}
            </span>
          </article>
          <div className="h-[1px] w-full bg-blue-500 mt-4 "></div>

          <br />
          <ul className="timeline timeline-vertical">
            <li>
              <hr className="bg-blue-500" />

              <article className=" timeline-start timeline-box ">
                <h4>
                  <u>Raw Materials Supplied by:</u>
                </h4>
                <p>
                  <b>Supplier ID: </b>
                  {RMS[MED[ID].RMSid].id}
                </p>
                <p>
                  <b>Name:</b> {RMS[MED[ID].RMSid].name}
                </p>
                <p>
                  <b>Place: </b>
                  {RMS[MED[ID].RMSid].place}
                </p>
              </article>

              <hr className="bg-blue-500" />
            </li>
            <li>
              <hr className="bg-blue-500" />

              <article className="timeline-end timeline-box">
                <h4>
                  <u>Manufactured by:</u>
                </h4>
                <p>
                  <b>Manufacturer ID: </b>
                  {MAN[MED[ID].MANid].id}
                </p>
                <p>
                  <b>Name:</b> {MAN[MED[ID].MANid].name}
                </p>
                <p>
                  <b>Place: </b>
                  {MAN[MED[ID].MANid].place}
                </p>
              </article>
              <hr className="bg-blue-500" />
            </li>
            <li>
              <hr className="bg-blue-500" />

              <article className="timeline-start timeline-box">
                <h4>
                  <u>Distributed by:</u>
                </h4>
                <p>
                  <b>Distributor ID: </b>
                  {DIS[MED[ID].DISid].id}
                </p>
                <p>
                  <b>Name:</b> {DIS[MED[ID].DISid].name}
                </p>
                <p>
                  <b>Place: </b>
                  {DIS[MED[ID].DISid].place}
                </p>
              </article>
              <hr className="bg-blue-500" />
            </li>
            <li>
              <hr className="bg-blue-500" />

              <article className="timeline-end timeline-box">
                <h4>
                  <u>Retailed by:</u>
                </h4>
                <p>
                  <b>Retailer ID: </b>
                  {RET[MED[ID].RETid].id}
                </p>
                <p>
                  <b>Name:</b> {RET[MED[ID].RETid].name}
                </p>
                <p>
                  <b>Place: </b>
                  {RET[MED[ID].RETid].place}
                </p>
              </article>
              <hr className="bg-blue-500" />
            </li>
            <li>
              <hr className="bg-blue-500" />

              <article className="timeline-start timeline-box">
                <h4>
                  <u>Sold</u>
                </h4>
              </article>
            </li>
          </ul>
        </div>
      </>
    );
  }
  if (TrackTillRetail) {
    return (
      <div className="p-[3rem]">
        <button
          onClick={() => {
            showTrackTillSold(false);
          }}
          className="btn btn-success btn-sm my-2"
        >
          Track Another Item
        </button>

        <article className="col-4 m-auto">
          <h3>
            <b>
              <u className="font-bold mt-5 text-[20px]">Medicine:</u>
            </b>
          </h3>
          <span>
            <b>Medicine ID: </b>
            {MED[ID].id}
          </span>
          <br />
          <span>
            <b>Name:</b> {MED[ID].name}
          </span>
          <br />
          <span>
            <b>Description: </b>
            {MED[ID].description}
          </span>
          <br />
          <span>
            <b>Current stage: </b>
            {MedStage[ID]}
          </span>
        </article>
        <div className="h-[1px] w-full bg-blue-500 mt-4 "></div>
        <br />
        <ul className="timeline timeline-vertical">
          <li>
            <hr className="bg-blue-500" />
            <article className="timeline-start timeline-box ">
              <h4>
                <u>Raw Materials Supplied by:</u>
              </h4>
              <p>
                <b>Supplier ID: </b>
                {RMS[MED[ID].RMSid].id}
              </p>
              <p>
                <b>Name:</b> {RMS[MED[ID].RMSid].name}
              </p>
              <p>
                <b>Place: </b>
                {RMS[MED[ID].RMSid].place}
              </p>
            </article>
            <hr className="bg-blue-500" />
          </li>
          <li>
            <hr className="bg-blue-500" />

            <article className="timeline-end timeline-box ">
              <h4>
                <u>Manufactured by:</u>
              </h4>
              <p>
                <b>Manufacturer ID: </b>
                {MAN[MED[ID].MANid].id}
              </p>
              <p>
                <b>Name:</b> {MAN[MED[ID].MANid].name}
              </p>
              <p>
                <b>Place: </b>
                {MAN[MED[ID].MANid].place}
              </p>
            </article>
            <hr className="bg-blue-500" />
          </li>
          <li>
            <hr className="bg-blue-500" />
            <article className="timeline-start timeline-box ">
              <h4>
                <u>Distributed by:</u>
              </h4>
              <p>
                <b>Distributor ID: </b>
                {DIS[MED[ID].DISid].id}
              </p>
              <p>
                <b>Name:</b> {DIS[MED[ID].DISid].name}
              </p>
              <p>
                <b>Place: </b>
                {DIS[MED[ID].DISid].place}
              </p>
            </article>
            <hr className="bg-blue-500" />
          </li>
          <li>
            <hr className="bg-blue-500" />
            <article className="timeline-end timeline-box ">
              <h4>
                <u>Retailed by:</u>
              </h4>
              <p>
                <b>Retailer ID: </b>
                {RET[MED[ID].RETid].id}
              </p>
              <p>
                <b>Name:</b> {RET[MED[ID].RETid].name}
              </p>
              <p>
                <b>Place: </b>
                {RET[MED[ID].RETid].place}
              </p>
            </article>
          </li>
        </ul>
      </div>
    );
  }
  if (TrackTillDistribution) {
    return (
      <div className="p-[3rem]">
        <button
          onClick={() => {
            showTrackTillSold(false);
          }}
          className="btn btn-success btn-sm my-2"
        >
          Track Another Item
        </button>

        <article className="col-4">
          <h3>
            <b>
              <u className="font-bold mt-5 text-[20px]">Medicine:</u>
            </b>
          </h3>
          <span>
            <b>Medicine ID: </b>
            {MED[ID].id}
          </span>
          <br />
          <span>
            <b>Name:</b> {MED[ID].name}
          </span>
          <br />
          <span>
            <b>Description: </b>
            {MED[ID].description}
          </span>
          <br />
          <span>
            <b>Current stage: </b>
            {MedStage[ID]}
          </span>
        </article>
        <div className="h-[1px] w-full bg-blue-500 mt-4 "></div>

        <br />
        <ul className="timeline timeline-vertical">
          <li>
            <hr className="bg-blue-500" />

            <article className="timeline-start timeline-box">
              <h4>
                <u>Raw Materials Supplied by:</u>
              </h4>
              <p>
                <b>Supplier ID: </b>
                {RMS[MED[ID].RMSid].id}
              </p>
              <p>
                <b>Name:</b> {RMS[MED[ID].RMSid].name}
              </p>
              <p>
                <b>Place: </b>
                {RMS[MED[ID].RMSid].place}
              </p>
            </article>
            <hr className="bg-blue-500" />
          </li>
          <li>
            <hr className="bg-blue-500" />

            <article className="timeline-end timeline-box">
              <h4>
                <u>Manufactured by:</u>
              </h4>
              <p>
                <b>Manufacturer ID: </b>
                {MAN[MED[ID].MANid].id}
              </p>
              <p>
                <b>Name:</b> {MAN[MED[ID].MANid].name}
              </p>
              <p>
                <b>Place: </b>
                {MAN[MED[ID].MANid].place}
              </p>
            </article>
            <hr className="bg-blue-500" />
          </li>
          <li>
            <hr className="bg-blue-500" />

            <article className="timeline-start timeline-box">
              <h4>
                <u>Distributed by:</u>
              </h4>
              <p>
                <b>Distributor ID: </b>
                {DIS[MED[ID].DISid].id}
              </p>
              <p>
                <b>Name:</b> {DIS[MED[ID].DISid].name}
              </p>
              <p>
                <b>Place: </b>
                {DIS[MED[ID].DISid].place}
              </p>
            </article>
          </li>
        </ul>
      </div>
    );
  }
  if (TrackTillManufacture) {
    return (
      <div className="p-[3rem]">
        <button
          onClick={() => {
            showTrackTillSold(false);
          }}
          className="btn btn-success btn-sm my-2"
        >
          Track Another Item
        </button>
        <article className="col-4">
          <h3>
            <b>
              <u className="font-bold mt-5 text-[20px]">Medicine:</u>
            </b>
          </h3>
          <span>
            <b>Medicine ID: </b>
            {MED[ID].id}
          </span>
          <br />
          <span>
            <b>Name:</b> {MED[ID].name}
          </span>
          <br />
          <span>
            <b>Description: </b>
            {MED[ID].description}
          </span>
          <br />
          <span>
            <b>Current stage: </b>
            {MedStage[ID]}
          </span>
        </article>
        <div className="h-[1px] w-full bg-blue-500 mt-4 "></div>
        <br />
        <ul className="timeline timeline-vertical">
          <li>
            <hr className="bg-blue-500" />
            <article className="timeline-start timeline-box">
              <h4>
                <u>Raw Materials Supplied by:</u>
              </h4>
              <p>
                <b>Supplier ID: </b>
                {RMS[MED[ID].RMSid].id}
              </p>
              <p>
                <b>Name:</b> {RMS[MED[ID].RMSid].name}
              </p>
              <p>
                <b>Place: </b>
                {RMS[MED[ID].RMSid].place}
              </p>
            </article>
            <hr className="bg-blue-500" />
          </li>
          <li>
            <hr className="bg-blue-500" />

            <article className="timeline-end timeline-box">
              <h4>
                <u>Manufactured by:</u>
              </h4>
              <p>
                <b>Manufacturer ID: </b>
                {MAN[MED[ID].MANid].id}
              </p>
              <p>
                <b>Name:</b> {MAN[MED[ID].MANid].name}
              </p>
              <p>
                <b>Place: </b>
                {MAN[MED[ID].MANid].place}
              </p>
            </article>
          </li>
        </ul>
      </div>
    );
  }
  if (TrackTillRMS) {
    return (
      <div className="p-[3rem]">
        <button
          onClick={() => {
            showTrackTillSold(false);
          }}
          className="btn btn-success btn-sm"
        >
          Track Another Item
        </button>
        <article className="col-4">
          <h3>
            <b>
              <u className="font-bold mt-5 text-[20px]">Medicine:</u>
            </b>
          </h3>
          <span>
            <b>Medicine ID: </b>
            {MED[ID].id}
          </span>
          <br />
          <span>
            <b>Name:</b> {MED[ID].name}
          </span>
          <br />
          <span>
            <b>Description: </b>
            {MED[ID].description}
          </span>
          <br />
          <span>
            <b>Current stage: </b>
            {MedStage[ID]}
          </span>
        </article>
        <div className="h-[1px] w-full bg-blue-500 mt-4 "></div>
        <br />
        <ul className="timeline timeline-vertical">
          <li>
            <hr className="bg-blue-500" />

            <article className=" timeline-start timeline-box ">
              <h4>
                <u>Raw Materials Supplied by:</u>
              </h4>
              <p>
                <b>Supplier ID: </b>
                {RMS[MED[ID].RMSid].id}
              </p>
              <p>
                <b>Name:</b> {RMS[MED[ID].RMSid].name}
              </p>
              <p>
                <b>Place: </b>
                {RMS[MED[ID].RMSid].place}
              </p>
            </article>
            <hr className="bg-blue-500" />
          </li>
        </ul>
      </div>
    );
  }
  if (TrackTillOrdered) {
    return (
      <div className="p-[3rem]">
        <button
          onClick={() => {
            showTrackTillSold(false);
          }}
          className="btn btn-success btn-sm my-2"
        >
          Track Another Item
        </button>
        <article className="col-4">
          <h3>
            <b>
              <u className="font-bold mt-5 text-[20px]">Medicine:</u>
            </b>
          </h3>
          <span>
            <b>Medicine ID: </b>
            {MED[ID].id}
          </span>
          <br />
          <span>
            <b>Name:</b> {MED[ID].name}
          </span>
          <br />
          <span>
            <b>Description: </b>
            {MED[ID].description}
          </span>
          <br />
          <span>
            <b>Current stage: </b>
            {MedStage[ID]}
          </span>
          <div className="h-[1px] w-full bg-blue-500 mt-4 "></div>
          <br />
          <h5>Medicine Not Yet Processed...</h5>
        </article>
      </div>
    );
  }
  const handlerChangeID = (event) => {
    setID(event.target.value);
  };
  const redirect_to_home = () => {
    navigate("/");
  };
  const handlerSubmit = async (event) => {
    event.preventDefault();
    var ctr = await SupplyChain.methods.medicineCtr().call();
    if (!(ID > 0 && ID <= ctr)) alert("Invalid Medicine ID!!!");
    else {
      // eslint-disable-next-line
      if (MED[ID].stage == 5) showTrackTillSold(true);
      // eslint-disable-next-line
      else if (MED[ID].stage == 4) showTrackTillRetail(true);
      // eslint-disable-next-line
      else if (MED[ID].stage == 3) showTrackTillDistribution(true);
      // eslint-disable-next-line
      else if (MED[ID].stage == 2) showTrackTillManufacture(true);
      // eslint-disable-next-line
      else if (MED[ID].stage == 1) showTrackTillRMS(true);
      else showTrackTillOrdered(true);
    }
  };

  return (
    <div className="p-[3rem]">
      <span>
        <b className="font-bold ">Current Account Address:</b> {currentaccount}
      </span>
      <span
        onClick={redirect_to_home}
        className="btn btn-outline-danger btn-sm"
      >
        {" "}
        HOME
      </span>
      <h5 className="font-semibold text-[20px] mt-4">List of Medicines</h5>

      <table className="table table-sm my-5 table-bordered border-[3px]">
        <thead>
          <tr className="bg-base-200">
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
      <h5 className="font-semibold text-[20px] mt-2">
        Enter Medicine ID to Track it
      </h5>

      <form
        className="flex gap-2 items-center mt-2 mb-2"
        onSubmit={handlerSubmit}
      >
        <input
          className="form-control-sm input input-bordered input-sm"
          type="text"
          onChange={handlerChangeID}
          placeholder="Enter Medicine ID"
          required
        />
        <button className="btn btn-success btn-sm" onSubmit={handlerSubmit}>
          Track
        </button>
      </form>
    </div>
  );
}

export default Track;
