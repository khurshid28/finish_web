import React, { useEffect } from "react";
import { FinishView } from "./finish";
import { StatusView } from "./status";

import axios from "axios"
import "react-toastify/dist/ReactToastify.css";

export default function Layout() {

  const [ariza, setAriza] = React.useState();
  const [status, setStatus] = React.useState("loading");
  const [err, seterror] = React.useState("");
  React.useEffect(() => {
    getAriza()

  }, []);

  async function getAriza() {
    const query = new URLSearchParams(window.location.search);
    axios.get(process.env.REACT_APP_SERVER_URL + `ariza/${query.get("ariza_id")}`, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "X-Requested-With"
      }
    })
      .then(res => {
        setAriza(res.data);
        setStatus("success")


      }).catch( function (error) {
        console.log(error.response.data.message);
        seterror(error.response.data.message)
        setStatus("error");

        
      })
  }


  if (status =="loading") {
    return <div className="flex flex-col justify-center items-center min-h-[600px]">LOADING...</div>;
  }
  else if (status=="error") {
    return <div>{err}</div>;
  } else if (ariza.status == "created") {
    return <FinishView />;
  } else {
    return <StatusView ariza={ariza} />;
  }
}
