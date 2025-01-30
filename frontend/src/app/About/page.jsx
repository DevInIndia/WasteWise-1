import React from "react";

const About = () => {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-center items-center h-96">
        <div className="bg-[#F6F6F6] text-[#6C8D6B] text-center flex flex-col justify-center items-center flex-1 h-96">
          <div className="text-2xl text-center  font-bold">VISION</div>
          <div className="text-center md:text-sm p-4 text-wrap text-clip sm:w-1/2 sm:h-1/2 text-[10px]">
            Our vision is a world where waste is no longer a problem but a
            resource, where communities thrive in harmony with nature through
            sustainable waste practices, and where every individual plays a part
            in shaping a cleaner, greener planet.
          </div>
          
        </div>
        <div className="flex-1 h-96 flex items-center justify-center ">
          <img
            src="https://img.freepik.com/free-vector/waste-management-concept-illustration_114360-8725.jpg?semt=ais_hybrid"
            alt=""
            className="sm:w-full h-full w-3/4 justify-center items-center flex"
          />
        </div>
      </div>
    </>
  );
};

export default About;
