import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('message', formData.message);

    const url = 'https://script.google.com/macros/s/AKfycbxImiS43cfax_SXK-ZiIz1tKiLxSdUTHMKyhKzhiUUbgSyedDE1uVK1ivY-xxVOhhMAHQ/exec';

    try {
      const response = await fetch(url, { method: 'POST', body: data });
      const result = await response.text();
      if (response.ok) {
        setStatus('Success! Your message has been sent.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Oops! Something went wrong. Please try again later.');
      }
    } catch (error) {
      setStatus('Oops! Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email address"
            required
          />
        </div>

        <div>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="How can we help you?"
            required
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      {status && <p className={status.includes('Success') ? 'success-message' : 'error-message'}>{status}</p>}

      <div className="contact-info">
        <h3>Contact Information</h3>
        <p>Email: <a href="mailto:poonamalleeexpress@gmail.com">poonamalleeexpress@gmail.com</a></p>
        <p>Phone: <a href="tel:+918056130030">+91 8056130030</a></p>
        <p>Address: <span>Poonamallee, Chennai, Tamil Nadu, India</span></p>
      </div>
    </div>
  );
};

export default Contact;