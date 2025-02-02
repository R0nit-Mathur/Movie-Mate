import react from "react";
import ReactDOM from "react-dom/client"
import Navbar from "./components/header";
import Body from "./components/body";


function Mainbody(){
    return(
    <>
        <Navbar></Navbar>
        <Body></Body>
    </>
    )
};


ReactDOM.createRoot(document.getElementById("root")).render(<Mainbody></Mainbody>);