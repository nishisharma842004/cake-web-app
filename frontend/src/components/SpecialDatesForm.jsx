import React, { useState } from "react";
import axios from "axios";
import "../styles/specialDatesForms.scss"; 
import { server } from "../redux/store";
import toast from "react-hot-toast";

const SpecialDatesForm = () => {
  const [formData, setFormData] = useState({
    occasion: "",
    date: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      console.log(formData.date);
      const res = await axios.post(
        `${server}/special-dates`,
        formData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      toast.success(res.data.message || "Special date saved!");
      setFormData({ occasion: "", date: "", description: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form className="special-form" onSubmit={handleSubmit}>
      <h2>Add Special Date</h2>
      <input
        type="text"
        name="occasion"
        placeholder="Occasion (e.g. Birthday)"
        value={formData.occasion}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Write something about the occasion..."
        value={formData.description}
        onChange={handleChange}
        rows="4"
      ></textarea>
      <button type="submit">Save</button>
    </form>
  );
};

export default SpecialDatesForm;
