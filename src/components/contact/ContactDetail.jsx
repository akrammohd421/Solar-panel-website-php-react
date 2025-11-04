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

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear that field’s error on typing
  };

  // ✅ Validation logic
  const validate = () => {
    const newErrors = {};

    // Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please fill your full name.";
    } else if (!/^[A-Za-z\s]+$/.test(formData.fullName)) {
      newErrors.fullName = "Full name should contain only letters.";
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters long.";
    }

    // Phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Please fill your phone number.";
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = "Phone number must contain only digits.";
    } else if (formData.phone.length !== 10) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Please fill your email address.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Note
    if (!formData.note.trim()) {
      newErrors.note = "Please fill your message or note.";
    } else if (formData.note.length < 5) {
      newErrors.note = "Note must be at least 5 characters long.";
    }

    return newErrors;
  };

  // ✅ Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    // Stop submission if any error exists
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:8000/send_mail.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      // ✅ Reset form after success
      setFormData({ fullName: "", phone: "", email: "", note: "" });
      setErrors({});
      alert(result.message);
    } catch (error) {
      console.error("Error:", error);
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




// import React, { useState } from "react";
// import contactImage from "../../assets/img/about/about-1-3.jpg";

// const ContactDetail = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     phone: "",
//     email: "",
//     note: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // ✅ Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: "" })); // clear error on typing
//   };

//   // ✅ Validation logic
//   const validate = () => {
//     const newErrors = {};

//     // Full Name validation
//     if (!formData.fullName.trim()) {
//       newErrors.fullName = "Please fill your full name.";
//     } else if (!/^[A-Za-z\s]+$/.test(formData.fullName)) {
//       newErrors.fullName = "Full name should contain only letters.";
//     } else if (formData.fullName.length < 3) {
//       newErrors.fullName = "Full name must be at least 3 characters long.";
//     }

//     // Phone validation
//     if (!formData.phone.trim()) {
//       newErrors.phone = "Please fill your phone number.";
//     } else if (!/^\d+$/.test(formData.phone)) {
//       newErrors.phone = "Phone number must contain only digits.";
//     } else if (formData.phone.length !== 10) {
//       newErrors.phone = "Phone number must be exactly 10 digits.";
//     }

//     // Email validation
//     if (!formData.email.trim()) {
//       newErrors.email = "Please fill your email address.";
//     } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
//       newErrors.email = "Please enter a valid email address.";
//     }

//     return newErrors;
//   };

//   // ✅ Handle submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const validationErrors = validate();
//     setErrors(validationErrors);

//     // Stop submission if any error exists
//     if (Object.keys(validationErrors).length > 0) return;

//     setIsSubmitting(true);

//     try {
//       const response = await fetch("http://localhost:8000/send_mail.php", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const result = await response.json();

//       // ✅ Reset form after successful submission
//       setFormData({ fullName: "", phone: "", email: "", note: "" });
//       setErrors({});
//       alert(result.message);
//     } catch (error) {
//       console.error("Error:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="it-contact-area pb-60">
//       <div className="container">
//         <div className="row align-items-center">
//           {/* Left Side: Contact Form */}
//           <div className="col-xl-6">
//             <div className="it-contact-wrapp grey-bg">
//               <div className="it-contact-title-box pb-10 mb-40">
//                 <h3 className="it-section-title">Get in Touch</h3>
//               </div>

//               <form onSubmit={handleSubmit} noValidate>
//                 {/* Full Name */}
//                 <div className="it-contact-input">
//                   <input
//                     type="text"
//                     name="fullName"
//                     placeholder="Full Name *"
//                     value={formData.fullName}
//                     onChange={handleChange}
//                   />
//                   {errors.fullName && (
//                     <p className="text-danger">{errors.fullName}</p>
//                   )}
//                 </div>

//                 {/* Phone */}
//                 <div className="it-contact-input">
//                   <input
//                     type="text"
//                     name="phone"
//                     placeholder="Phone *"
//                     value={formData.phone}
//                     onChange={handleChange}
//                   />
//                   {errors.phone && (
//                     <p className="text-danger">{errors.phone}</p>
//                   )}
//                 </div>

//                 {/* Email */}
//                 <div className="it-contact-input">
//                   <input
//                     type="email"
//                     name="email"
//                     placeholder="Email *"
//                     value={formData.email}
//                     onChange={handleChange}
//                   />
//                   {errors.email && (
//                     <p className="text-danger">{errors.email}</p>
//                   )}
//                 </div>

//                 {/* Note */}
//                 <div className="it-contact-input mb-30">
//                   <textarea
//                     name="note"
//                     placeholder="Note"
//                     value={formData.note}
//                     onChange={handleChange}
//                   ></textarea>
//                 </div>

//                 {/* Submit Button */}
//                 <div className="it-contact-button mb-50">
//                   <button
//                     className="it-btn-green"
//                     type="submit"
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? "Sending..." : "Send A Message"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>

//           {/* Right Side: Image */}
//           <div className="col-xl-6">
//             <img
//               src={contactImage}
//               alt="Contact Illustration"
//               width="100%"
//               height="450"
//               style={{ objectFit: "cover", borderRadius: "8px" }}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactDetail;



