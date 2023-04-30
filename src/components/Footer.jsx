import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="mb-0 text-center">
        <div className="d-flex align-items-center justify-content-center pb-5">
          <div className="col-md-6">
            <p className="mb-3 mb-md-0">
              Made with ❤️ by{" "}
              <a
                className="text-decoration-underline text-dark fs-5"
                rel="noreferrer"
              >
                Meat Connect
              </a>
            </p>
            <a className="text-dark fs-4" rel="noreferrer">
              <i className="fa fa-github"></i>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
