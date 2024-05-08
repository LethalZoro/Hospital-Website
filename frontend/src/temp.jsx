
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Temp() {
  const toastId = React.useRef(null);
  const FailedMessage = () => (
    <div>
      your message and html here
    </div>
  )
  const notify = () => toastId.current = toast("Hello", { autoClose: false });

  const update = () => toast.update(toastId.current, {  render: FailedMessage, autoClose: 5000 });


  return (
    <div>
      <button onClick={notify}>Notify</button>
      <button onClick={update}>Update</button>
      <ToastContainer />
    </div>
  );
}
export default Temp