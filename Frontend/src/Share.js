import React, { useState } from "react";
import Modal from "react-modal";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaWhatsappSquare,
  FaInstagramSquare,
} from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa6";

const Share = ({ streamUrl }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");

  const handleShare = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCopySuccess(""); // Reset copy success message when modal is closed
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(streamUrl).then(
      () => {
        setCopySuccess("Link copied!");
        setTimeout(() => {
          setCopySuccess("");
        }, 2000); // Clear the message after 2 seconds
      },
      () => {
        setCopySuccess("Failed to copy link");
        setTimeout(() => {
          setCopySuccess("");
        }, 2000); // Clear the message after 2 seconds
      }
    );
  };

  return (
    <div className="share-component">
      <button className="account-btn" onClick={handleShare}>
        Generate Share Link
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Share Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-header">
          <h2>Share Your Stream</h2>
          <button className="close-button" onClick={closeModal}>
            &times;
          </button>
        </div>
        {streamUrl && (
          <div className="modal-content">
            <p>
              Share this link:{" "}
              <a href={streamUrl} target="_blank" rel="noopener noreferrer">
                {streamUrl}
              </a>
            </p>
            <div className="copy-link-container">
              <button className="copy-link-btn" onClick={handleCopyLink}>
                <FaRegCopy />
              </button>
              {copySuccess && (
                <span className="copy-success">{copySuccess}</span>
              )}
            </div>
            <div className="social-icons">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${streamUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookSquare />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${streamUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitterSquare />
              </a>
              <a
                href={`https://wa.me/?text=${streamUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsappSquare />
              </a>
              <a
                href={`https://www.instagram.com/direct/new/?text=${streamUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagramSquare />
              </a>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Share;
