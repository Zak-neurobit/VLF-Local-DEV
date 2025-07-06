import React from 'react';

export const SimpleTest: React.FC = () => {
  return (
    <div>
      <h2>Get Your Free Resource</h2>
      <form>
        <div>
          <label htmlFor="name">Full Name *</label>
          <input type="text" id="name" />
        </div>
        <div>
          <label htmlFor="email">Email Address *</label>
          <input type="email" id="email" />
        </div>
        <div>
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" id="phone" />
        </div>
        <div>
          <label htmlFor="zipCode">ZIP Code *</label>
          <input type="text" id="zipCode" />
        </div>
        <div>
          <input type="checkbox" id="privacy" />
          <label htmlFor="privacy">I agree to the privacy policy *</label>
        </div>
        <div>
          <input type="checkbox" id="marketing" />
          <label htmlFor="marketing">I&apos;d like to receive marketing communications</label>
        </div>
        <button type="submit">Get My Free Resource</button>
      </form>
    </div>
  );
};