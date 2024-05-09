
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Styles/temp.css'
function Temp() {
  const toastId = React.useRef(null);
  const waiting = () => (
    <div class="typewriter">
    <div class="slide"><i></i></div>
    <div class="paper"></div>
    <div class="keyboard"></div>
</div>
  )
  const notify = () => toastId.current = toast("Hello", { autoClose: false });

  const update = () => toast.update(toastId.current, {  render: waiting, autoClose: 5000 });


  return (
    <div>
      <button onClick={notify}>Notify</button>
      <button onClick={update}>Update</button>
      <ToastContainer />
    </div>
  );
}
export default Temp