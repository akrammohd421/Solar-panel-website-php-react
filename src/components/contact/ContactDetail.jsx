import React, { useState } from "react";
import contactImage from "../../assets/img/about/about-1-3.jpg";

const ContactDetail = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    note: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Form validation
  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Enter a valid 10-digit phone number";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email address";
    return newErrors;
  };        
               
  // ✅ Handle Submit
// inside your ContactSection component
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch("http://localhost:8000/send_mail.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    alert(result.message);
  } catch (error) {
    alert("Error: " + error.message);
  } finally {
    setIsSubmitting(false);
  }
};




  return (
    <div className="it-contact-area pb-60">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Side: Contact Form */}
          <div className="col-xl-6">
            <div className="it-contact-wrapp grey-bg">
              <div className="it-contact-title-box pb-10 mb-40">
                <h3 className="it-section-title">Get in Touch</h3>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="it-contact-input">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name *"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                  {errors.fullName && (
                    <p className="text-danger">{errors.fullName}</p>
                  )}
                </div>

                <div className="it-contact-input">
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone *"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  {errors.phone && (
                    <p className="text-danger">{errors.phone}</p>
                  )}
                </div>

                <div className="it-contact-input">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && (
                    <p className="text-danger">{errors.email}</p>
                  )}
                </div>

                <div className="it-contact-input mb-30">
                  <textarea
                    name="note"
                    placeholder="Note"
                    value={formData.note}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="it-contact-button mb-50">
                  <button
                    className="it-btn-green"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send A Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="col-xl-6">
            <img
              src={contactImage}
              alt="Contact Illustration"
              width="100%"
              height="450"
              style={{ objectFit: "cover", borderRadius: "8px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;
