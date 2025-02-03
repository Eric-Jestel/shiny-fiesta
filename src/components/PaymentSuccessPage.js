import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import supabase from '../services/SupabaseService';
import './PaymentSuccessPage.css'; // Import the CSS file

function PaymentSuccessPage({ files, onContinueShopping, clearCart }) {
  const [secureLinks, setSecureLinks] = useState([]);

  useEffect(() => {
    console.log('Files received:', files); // Log the received files

    async function generateSecureLinks() {
      const links = await Promise.all(files.map(async (file) => {
        const { data, error } = await supabase
          .storage
          .from('files') // Replace with your actual bucket name
          .createSignedUrl(file.filePath, 600); // 600 seconds = 10 minutes

        if (error) {
          console.error('Error generating secure link:', error);
          return null;
        } else if (data) {
          console.log('Generated link:', data.signedUrl); // Log the generated link
          return { name: file.name, url: data.signedUrl };
        }
      }));

      setSecureLinks(links.filter(link => link !== null));
      clearCart(); // Clear the cart once the payment is accepted
    }

    generateSecureLinks();

    // Set a timeout to automatically perform the continue shopping action after 10 minutes
    const timeoutId = setTimeout(() => {
      onContinueShopping();
    }, 600000); // 600000 milliseconds = 10 minutes

    // Clear the timeout if the component unmounts before the timeout completes
    return () => clearTimeout(timeoutId);
  }, []); // Empty dependency array to ensure this runs only once

  return (
    <div className="payment-success-container">
      <h1>Payment Successful</h1>
      <p>Thank you for your purchase!</p>
      <p>These are your download links. They will work for 10 minutes</p>
      <p>If you need access after that, contact XXXXXXXXX</p>
      <p>Take a screenshot of this page to prove your case</p>
      {secureLinks.length > 0 ? (
        <div className="file-list">
          <p>Download your files:</p>
          <ul>
            {secureLinks.map(link => (
              <li key={link.url}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Generating secure links...</p>
      )}
      <button className="continue-shopping-button" onClick={onContinueShopping}>Continue Shopping</button>
    </div>
  );
}

PaymentSuccessPage.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      filePath: PropTypes.string.isRequired,
    })
  ).isRequired,
  onContinueShopping: PropTypes.func.isRequired,
  clearCart: PropTypes.func.isRequired,
};

export default PaymentSuccessPage;
