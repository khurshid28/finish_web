import React from "react";
import { useMask } from "@react-input/mask";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"

export const FinishView = () => {
  const [selectedType, setType] = React.useState("text"); //doc,image
  let types = [
    {
      text: "Yozma",
      value: "text",
    },
    {
      text: "Dokument",
      value: "document",
    },
    {
      text: "Rasm",
      value: "image",
    },
  ];
  function check(){
      if(selectedType =="text"){
        return textarea.length > 0;
      }else if(selectedType =="document" && doc){
        return true
      }else if(selectedType =="image" && image){
        return true
      }return false;
  }

  function getResponse(){
    if(selectedType =="text"){
      return textarea;
    }else if(selectedType =="document"){
      return doc;
    }else if(selectedType =="image"){
      return image;
    }
}
  async function finishAriza() {
    const query = new URLSearchParams(window.location.search);
    if(selectedType =="text"){
      await axios.put(process.env.REACT_APP_SERVER_URL + `ariza/finish/${query.get("ariza_id")}`,{
        response_type : selectedType,
        response : getResponse()
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "X-Requested-With"
        }
      })
        .then(res => {
          // setAriza(res.data);
          // setStatus("success");
          notify("Ariza yakunlandi")
  
  
  
        }).catch( function (error) {
          console.log(error.response.data.message);
          // seterror(error.response.data.message)
          // setStatus("error");
          alert(error.response.data.message)
  
          
        });
    }

      else {
        const formData = new FormData();

        // Update the formData object
        formData.append("response_type",selectedType)
        formData.append(
            "response",
            getResponse(),
            
        );

        await axios.put(process.env.REACT_APP_SERVER_URL + `ariza/finish/${query.get("ariza_id")}`,formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "X-Requested-With"
          }
        })
          .then(res => {
            // setAriza(res.data);
            // setStatus("success");
            notify("Ariza yakunlandi")
    
    
    
          }).catch( function (error) {
            console.log(error.response.data.message);
            // seterror(error.response.data.message)
            // setStatus("error");
            alert(error.response.data.message)
    
            
          });
      }
  }

  async function cancelAriza() {
    const query = new URLSearchParams(window.location.search);
    if(selectedType =="text"){
      await axios.put(process.env.REACT_APP_SERVER_URL + `ariza/finish/${query.get("ariza_id")}`,{
        response_type : selectedType,
        response : getResponse()
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "X-Requested-With"
        }
      })
        .then(res => {
          // setAriza(res.data);
          // setStatus("success");
          notify("Ariza yakunlandi")
        }).catch( function (error) {
          console.log(error.response.data.message);
          // seterror(error.response.data.message)
          // setStatus("error");
          alert(error.response.data.message)
  
          
        });
    }

      else {
        const formData = new FormData();

        // Update the formData object
        formData.append("response_type",selectedType)
        formData.append(
            "response",
            getResponse(),
            
        );

        await axios.put(process.env.REACT_APP_SERVER_URL + `ariza/cancel/${query.get("ariza_id")}`,formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "X-Requested-With"
          }
        })
          .then(res => {
            // setAriza(res.data);
            // setStatus("success");
            notify("Ariza bekor qilindi")
    
    
    
          }).catch( function (error) {
            console.log(error.response.data.message);
            // seterror(error.response.data.message)
            // setStatus("error");
            alert(error.response.data.message)
    
            
          });
      }
  }


  const [textarea, setTextarea] = React.useState("");


  const handleChangeTextArea = (event) => {
    setTextarea(event.target.value);
  };

  const [image, setImage] = React.useState();

  const [doc, setDoc] = React.useState();

  const handleImageChange = (selectorFiles) => {
    console.log(selectorFiles);
    if (selectorFiles.length > 0) {
      setImage(selectorFiles[0]);
    }
  };

  const handleDocChange = (selectorFiles) => {
    if (selectorFiles.length > 0) {
      setDoc(selectorFiles[0]);
    }
  };

  function notify(msg) {
    toast.success(msg, { autoClose: 5000 });
  }

  // let yuborish = (msg) => {
  //   notify(msg);
  // };
  return (
    <div className="flex flex-col h-full px-4">
      <ToastContainer />

      <div className="flex flex-row gap-2 justify-between px-2">
        {types.map((item, index) => (
          <div
            className={
              " px-2 py-2 rounded-2xl my-4  text-white font-bold text-xl " +
              (item.value == selectedType ? "bg-[#17e67e]" : "bg-gray-400")
            }
            onClick={() => {
              setType(item.value);
              setImage(undefined);
              setDoc(undefined);
              setTextarea("");
            }}
          >
            {item.text}
          </div>
        ))}
      </div>
      <div
        class="min-h-[320px] w-full  bg-white rounded-xl px-4 py-2"
        id="finish_form"
      >
        {selectedType == "text" ? (
          <div>
            <div class="flex flex-wrap -mx-3 mb-2">
              <textarea
                value={textarea}
                onChange={handleChangeTextArea}
                className=" w-full px-3 mb-6 md:mb-0 mx-3 mt-6 block appearance-none  bg-gray-200 border border-gray-200 text-gray-700 py-3  pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                // cols="34"
                rows="12"
                placeholder="Murojaatning yakuni haqida izoh qoldiring"
                autocomplete="off"
                autocorrect="off"
                // autofocus="true"
              />
            </div>
          </div>
        ) : selectedType == "document" ? (
          <div>
            <input
              id="upload-file"
              type="file"
              // accept=".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf"
              multiple="false"
              className="file mb-[10px]"
              onChange={(e) => handleDocChange(e.target.files)}
            />
          </div>
        ) : (
          <div>
            <input
              id="upload"
              type="file"
              // accept="image/*"
              multiple="false"
              className="image mb-[10px]"
              onChange={(e) => handleImageChange(e.target.files)}
            />

            {image ? (
              <img
                src={URL.createObjectURL(image)}
                className="w-full rounded-xl h-[310px] object-cover	"
              />
            ) : (
              <div className="w-full rounded-xl h-[310px] bg-gray-200	"></div>
            )}
          </div>
        )}
      </div>
            
      <div class="  m-4">
        <button
            
            onClick={check() ?  cancelAriza :()=>{}}
          class={
            "w-full block mx-auto rounded-full  hover:shadow-lg font-semibold text-white px-6 py-4 "  + (check() ? "bg-red-400" :"bg-red-200")

           
          }
        >
          Bekor qilish
        </button>
      </div>
      <div class="  mx-4 mb-4">
        <button
          onClick={check() ?  finishAriza :()=>{}}

          // onClick={()=>yuborish("Ariza yakunlandi")}
          class={
            "w-full block mx-auto rounded-full  hover:shadow-lg font-semibold text-white px-6 py-4 " + (check() ? "bg-gray-900" :"bg-gray-400")

            // (textfullname.length > 0 &&
            // phonenumber.length == 18 &&
            // option.length > 0
            //   ? "bg-gray-900"
            //   : "bg-gray-500")
          }
        >
          Yakunlash
        </button>
      </div>
    </div>
  );
};
