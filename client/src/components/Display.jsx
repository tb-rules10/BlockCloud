import { useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import { showError, showStatus, showSuccess, showWarning } from "../utils/ToastOptions";

const Display = ({ contract, account }) => {
  const [data, setData] = useState([]);
  const [address, setAddress] = useState("");
  const onChange = ({ target }) => setAddress(target.value);

  const fetchData = async () => {
    let dataArray;
    const Otheraddress = address;
    try {
      if (Otheraddress) {
        dataArray = await contract.fetchData(Otheraddress);
        console.log(dataArray);
      } else {
        dataArray = await contract.fetchData(account);
      }
    } catch (e) {
      showError("You don't have access.")
    }
    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      // console.log(str);
      console.log(str_array);
      setData(str_array);
    } else {
      showWarning("No files to display");
    }
  };

  return (
    <>
      <div className="w-full h-[80vh] flex flex-col justify-center items-center">
        {data.length > 0 && (
          <div className="flex h-[60vh] w-full flex-wrap overflow-y-scroll mt-[-1rem] mb-10">
            {data.map((item, i) => {
              return (
                <div className="p-2  w-1/2" key={i}>
                  <a href={item} target="_blank">
                    <img src={item} className="f" alt="Click to Open File" />
                  </a>
                </div>
              );
            })}
          </div>
        )}

        <div className={`relative flex w-full ${data.length > 0 ? 'max-w-[30rem]' : 'max-w-[24rem] mb-[4rem]'}`}>
          <Input
            color="white"
            type="address"
            label="Enter Address"
            value={address}
            onChange={onChange}
            className="pr-20"
            containerProps={{
              className: "min-w-0",
            }}
          />
          <Button
            size="sm"
            disabled={!address}
            className="!absolute right-1 top-1 rounded "
            onClick={fetchData}
          >
            Fetch Data
          </Button>
        </div>
      </div>
    </>
  );
};
export default Display;
