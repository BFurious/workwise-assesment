import React from "react";
// here we are designing the Offer tag ashow in the figma
const ColorStripPattern = (props) => {
  // background will be pink and block will be white to take that patters
  const colorBlocks = [
    ["bg-white", "bg-white", "bg-white", "bg-white", "bg-white", "bg-white", "bg-white", "bg-white", "bg-white", "bg-white", "bg-white", "bg-white"]
  ];

  return (
    <div className="flex flex-row bg-custom-baby-pink" style={{ width: "30%" }}>

      <div className="font-inter text-center my-auto text-white text-xl rounded-lg font-bold " style={props.discount<10?{ padding: "0px 15% 0px 15%" }:{ padding: "0px 10% 0px 10%" }}>{props.discount}% Off</div>

      {/* addind small blocks to create that pattern at the one side of Offer tag */}

      {colorBlocks.map((column, columnIndex) => (
        <div key={columnIndex} className="flex flex-col space-y-1" style={{ width: "1.5px" }}>
          {column.map((colorClass, blockIndex) => (
            <div
              key={blockIndex}
              className={`h-1 w-px ${colorClass} p-1`}
            ></div>
          ))}
        </div>

      ))}
    </div>
  );
};

export default ColorStripPattern;
