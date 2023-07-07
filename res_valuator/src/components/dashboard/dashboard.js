import React, { useEffect, useState } from "react";
const Dashboard = () => {
    const [data, setData] = useState({
        jd: "",/*same names as in db*/
        weights: [],
        employer: "",
        password1: "",
        password2: "",
      });
      const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
      };  
  return (
    <div>
      <h1 style={{color:"white"}}>Dashboard</h1>
      <input
       type="text"
       placeholder="Enter JD"
       name="jd"
       value={data.jd}
       onChange={handleChange} 
      />
    </div>
  )
}

export default Dashboard
