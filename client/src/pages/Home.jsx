import { useState, useEffect } from "react";
import { ethers } from "ethers";
import CloudContract from "../artifacts/contracts/Colud.sol/BlockCloud.json";
import FileUpload from "../components/FileUpload";
import Logo from "../assets/logo (2).png";
import Share from "../assets/share.png";
import Display from "../components/Display";
import Modal from "../components/Modal";
import { showError, showStatus, showSuccess } from "../utils/ToastOptions";
import { Button } from "@material-tailwind/react";

export default function Home() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const loadProvider = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);

        if (!provider) {
          console.error("Metamask is not installed");
          return;
        }

        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = signer.address;
        setAccount(address);

        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        const deployedContract = new ethers.Contract(
          contractAddress,
          CloudContract.abi,
          signer
        );

        setContract(deployedContract);
        setProvider(provider);
      } catch (error) {
        console.error("Error loading provider:", error);
      }
    };
    loadProvider();
  }, []);

  return (
    <>
      {/* 
<div className='flex'>
            <div className='bg-[#2B2A2D] flex-1 '>

            </div>
            <div className='bg-[#FFFFFF] flex-1'>

            </div>
          </div> */}

      <div className="w-screen h-screen overflow-hidden flex p-8">
        <div className="mr-4 w-2/5 flex flex-col  justify-between">
          <div className="bg-[#2B2A2D] w-full mb-4 h-[35vh] rounded-2xl">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h1 className="text-white text-4xl whitespace-nowrap font-bold text-light-secondary">
                  BlockCloud
                </h1>
                <img src={Logo} alt="" className="h-12" />
              </div>
              <p
                className={`my-8 ${
                  account ? "text-green-500" : "text-red-500"
                }`}
              >
                Connected to:{" "}
                <b className="text-white">
                  {account ? account : "Not connected"}
                </b>
              </p>
            </div>
          </div>
          <div className="bg-[#FFFFFF] w-full mt-4 h-[65vh] rounded-2xl">
            <div className="p-4">
              <h1 className="text-3xl whitespace-nowrap font-bold text-light-secondary">
                Dropzone
              </h1>
              <FileUpload
                account={account}
                provider={provider}
                contract={contract}
              ></FileUpload>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-b from-[#943DEC] to-[#3DA9E0] ml-4 w-3/5 rounded-3xl">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <h1 className="text-white text-3xl whitespace-nowrap font-bold text-light-secondary">
                My Space
              </h1>

                <img onClick={() => setModalOpen(true)} src={Share} alt="" className='h-5 mr-4 hover:cursor-pointer tap'/>
                
              {/* {modalOpen && (
                <Modal setModalOpen={showSuccess("hello")} contract={contract}></Modal>
              )} */}
              {modalOpen && (
                <Modal setModalOpen={setModalOpen} contract={contract} isModal={modalOpen}/>
              )}

            </div>
            <div className="h-[80vh] w-full flex items-center justify-center flex-col">
              <Display contract={contract} account={account}></Display>
              {/* <Button variant="outlined" color='white'>outlined</Button> */}
            </div>
          </div>
        </div>
      </div>
      
      {/* <Navbar/> */}
      {/* <h1 className="text-5xl font-bold underline">
          BlockDrive
        </h1>
        {!modalOpen && (
          <Button  onClick={() => setModalOpen(true)}>Share</Button>
        )}
        {modalOpen && (
          <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
        )}
  
        <div className="App">
          <h1 className="">Gdrive 3.0</h1>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
  
          <p className="">
            Account: {account ? account : "Not connected"}
          </p>
          <FileUpload
            account={account}
            provider={provider}
            contract={contract}
          ></FileUpload>
          <Display contract={contract} account={account}></Display>
        </div> */}
    </>
  );
}
