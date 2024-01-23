import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Select, 
  Option
} from "@material-tailwind/react";
import { showError, showSuccess } from "../utils/ToastOptions";

const Modal = ({ setModalOpen, contract, isModal }) => {

  const [accessList, setAccessList] = useState([]);
  const [open, setOpen] = useState(isModal);
  const handleOpen = () => setOpen(!open);

  const sharing = async () => {
    try{
      const address = document.querySelector(".address").value;
      await contract.shareAccess(address);
      showSuccess("Access Shared");
      setModalOpen(false);
    }catch(err){
      showError(err);
    }
  };
  
  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.sharedWith();
      console.log("************")
      console.log(addressList)
      console.log("************")
      setAccessList(addressList);
    };
    contract && accessList();
  }, [contract]);
  
  return (
    <>
      <Dialog open={open} handler={setModalOpen}>
        <DialogHeader>Share With</DialogHeader>
        <DialogBody >
          <div className="w-full mb-4">
            <Input 
              label="Enter Address" 
              className="address"
            />
          </div>
          <form id="myForm" className="mt-4">
          <Select label="People With Access" id="selectNumber">
            {accessList.map((option, index) => (
              <Option key={index}>{option}</Option>
            ))}
          </Select>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={() => sharing()}>
            <span>Share</span>
          </Button>
        </DialogFooter>
      </Dialog>

      
    </>
  );
};
export default Modal;