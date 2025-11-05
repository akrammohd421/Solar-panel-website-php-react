import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import contactImage from "../../assets/img/about/about-1-3.jpg";

const ContactDetail = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    note: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(""); // ✅ success or error message

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setMessage(""); // clear message on typing
  };

  // ✅ Validation logic
  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please fill your full name.";
    } else if (!/^[A-Za-z\s]+$/.test(formData.fullName)) {
      newErrors.fullName = "Full name should contain only letters.";
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters long.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please fill your phone number.";
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = "Phone number must contain only digits.";
    } else if (formData.phone.length !== 10) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please fill your email address.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.note.trim()) {
      newErrors.note = "Please fill your message or note.";
    } else if (formData.note.length < 5) {
      newErrors.note = "Note must be at least 5 characters long.";
    }

    return newErrors;
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);
    setMessage("");

    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:8000/send_mail.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      // ✅ Show success message
      setMessage(result.message || "Your form has been submitted successfully ✅");
      setFormData({ fullName: "", phone: "", email: "", note: "" });
      setErrors({});

      // ✅ Redirect after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong. Please try again later.");
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

              <form onSubmit={handleSubmit} noValidate>
                {/* Full Name */}
                <div className="it-contact-input">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name *"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  {errors.fullName && (
                    <p className="text-danger" style={{ fontSize: "14px" }}>
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="it-contact-input">
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone *"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && (
                    <p className="text-danger" style={{ fontSize: "14px" }}>
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="it-contact-input">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="text-danger" style={{ fontSize: "14px" }}>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Note */}
                <div className="it-contact-input mb-30">
                  <textarea
                    name="note"
                    placeholder="Note *"
                    value={formData.note}
                    onChange={handleChange}
                  ></textarea>
                  {errors.note && (
                    <p className="text-danger" style={{ fontSize: "14px" }}>
                      {errors.note}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="it-contact-button mb-3">
                  <button
                    className="it-btn-green"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send A Message"}
                  </button>
                </div>

                {/* ✅ Message Section */}
                {message && (
                  <p
                    style={{
                      color:
                        message.toLowerCase().includes("success") ||
                        message.toLowerCase().includes("submitted")
                          ? "green"
                          : "red",
                      fontWeight: "500",
                    }}
                  >
                    {message}
                  </p>
                )}
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
