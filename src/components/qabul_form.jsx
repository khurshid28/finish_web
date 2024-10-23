import React from "react";
import { useMask } from "@react-input/mask";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

import axios from "axios";

export default function QabulForm({ handleClose ,notify}) {
  const phoneRef = useMask({
    mask: "+998(nn) nnn-nn-nn",
    replacement: { n: /\d/ },
  });

  const [textarea, setTextarea] = React.useState("");

  const [textfullname, setFullname] = React.useState("");
  const [phonenumber, setPhonenumber] = React.useState("+998");
  const [option, setOption] = React.useState("Sistema");

  const handleChangeFullname = (event) => {
    setFullname(event.target.value);
  };
  const handleChangePhoneNumber = (event) => {
    setPhonenumber(event.target.value);
  };
  const handleChangeOption = (event) => {
    setOption(event.target.value);
  };
  const handleChangeTextArea = (event) => {
    setTextarea(event.target.value);
  };

  async function generatePDF() {
    // const element = document.querySelector("#qabul_form");

    // if (!element) {
    //   alert("Element with id qabul_form not found");
    //   throw new Error(`Element with id qabul_form not found`);
    // }

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: [129, 70],
    });
    // const imgProperties = pdf.getImageProperties(data);
    // const pdfWidth = pdf.internal.pageSize.getWidth();
    // const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    // Add text to the PDF with specified margin
    pdf.text(
      `Fullname: ${textfullname}\nPhoneNumber: ${phonenumber}\nOption: ${option}\nQo'shimcha: ${textarea}`,
      30,
      30,
      { align: "left", maxWidth: 500 }
    );

    // pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);

    var blobPDF = new Blob([pdf.output()], {
      type: "application/pdf",
    });

    return blobPDF;
    // alert(blobPDF)
    // var blobUrl = URL.createObjectURL(blobPDF);  //<--- THE ERROR APPEARS HERE

    // window.open(blobUrl);  // will open a new tab

    // pdf.html(`<h1>Xurshid html </h1>`,)
    // pdf.save("xurshid.pdf");
  }

  function ddmmYYY(date) {
    var mm = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();

    return [
      date.getFullYear(),
      (mm > 9 ? "" : "0") + mm,
      (dd > 9 ? "" : "0") + dd,
    ]
      .reverse()
      .join(".");
  }
  async function yuborish() {
    try {
      var chat_id = process.env.REACT_APP_CHATID;
      var token = process.env.REACT_APP_BOT_TOKEN;

      var blob = await generatePDF();

      var formData = new FormData();
      formData.append("chat_id", chat_id);
      formData.append(
        "document",
        blob,
        `${textfullname
          .replaceAll("-", " ")
          .replaceAll("(", " ")
          .replaceAll(")", " ")
          .replaceAll("'", " ")
          .replaceAll("ʻ", "")
          .replaceAll('"', "")} ${ddmmYYY(new Date())}.pdf`
      );

      let res = await axios.post(
        `https://api.telegram.org/bot${token}/sendDocument`,
        formData
      );
      if (res.status == 200) {
        // alert("sent msg");
        notify("Murojatingiz qabul bo'limiga yuborildi");
        handleClose();

      } else {
        
        // handleClose();
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div class="min-h-[600px] w-full  bg-white rounded-xl px-4 py-8" id="qabul_form">
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full  px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-first-name"
          >
            Ism/Familiya
          </label>
          <input
            value={textfullname}
            onChange={handleChangeFullname}
            class="required appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="text"
            placeholder="Ism/Familiya"
          />
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-password"
          >
            Telefon raqam
          </label>
          <input
            ref={phoneRef}
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-phone"
            type="text"
            placeholder="+998(90) 123-45-67"
            defaultValue={"+998"}
            value={phonenumber}
            onChange={handleChangePhoneNumber}
          />
          <p class="text-gray-600 text-xs italic">
            Telefon raqamingizni to'gri kiritganizga ishonch hosil qiling.
          </p>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-2">
        <div class="w-full px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-state"
          >
            Xizmat Turi
          </label>
          <div class="relative">
            <select
              class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
              value={option}
              onChange={handleChangeOption}
            >
              <option>Sistema</option>
              <option>Site</option>
              <option>Backend</option>
              <option>Mobile</option>
              <option>Bot</option>
              <option>Design</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        <textarea
          value={textarea}
          onChange={handleChangeTextArea}
          className=" w-full px-3 mb-6 md:mb-0 mx-3 mt-6 block appearance-none  bg-gray-200 border border-gray-200 text-gray-700 py-3  pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          cols="34"
          rows="4"
          placeholder="Qo'shimcha informatsiya uchun"
          autocomplete="off"
          autocorrect="off"
          // autofocus="true"
        />
        {/* <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-zip"
          >
            Zip
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-zip"
            type="text"
            placeholder="90210"
          />
        </div> */}
      </div>

      <div class="  mt-6">
        <button
          onClick={
            textfullname.length > 0 &&
            phonenumber.length == 18 &&
            option.length > 0
              ? yuborish
              : () => {}
          }
          class={
            "w-full block mx-auto rounded-full  hover:shadow-lg font-semibold text-white px-6 py-2 " +
            (textfullname.length > 0 &&
            phonenumber.length == 18 &&
            option.length > 0
              ? "bg-gray-900"
              : "bg-gray-500")
          }
        >
          Yuborish
        </button>
      </div>
    </div>
    </div>
  );
}
