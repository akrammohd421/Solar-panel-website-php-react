import React from "react";

const ContactBreadCrumb = () => {
  return (
    <div style={{ textAlign: "center", margin: "0px 0" }}>
      <iframe
        title="Nagzari Location"
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7540.058395225591!2d73.120418!3d19.106375!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be71982055f28df%3A0x80a7e5428a3da210!2sNagzari%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1761394907721!5m2!1sen!2sin"
        width="100%"
        height="450"
        // style={{ border: 0, borderRadius: "8px" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );  
};

export default ContactBreadCrumb;
