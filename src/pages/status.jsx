import React from "react";

export const StatusView = ({ ariza }) => {
  if (ariza.status == "finished") {
    return (
      <div className="text-[#17e67e] font-semibold flex flex-col justify-center items-center min-h-[600px]">
        ID : {ariza.id}
        <br /> Ariza tugatilgan
      </div>
    );
  } else if (ariza.status == "canceled") {
    return (
      <div className="text-red-400 font-semibold flex flex-col justify-center items-center min-h-[600px]">
        ID : {ariza.id}
        <br /> Ariza Bekor qilingan
      </div>
    );
  }
  return <div>StatusView</div>;
};
