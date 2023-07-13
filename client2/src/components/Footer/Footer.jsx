import "./Footer.scss";

import { BsFillTelephoneFill } from "react-icons/bs";
import { AiTwotoneMail } from "react-icons/ai";
import { BsInstagram } from "react-icons/bs";
const Footer = () => {
  return (
    <div className="container footer-main" id="footer">
      <div className="footer-container">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-12 main-column">
            <h5 className="main-title">About</h5>
            <ul className="nav flex-column">
              <li>
                For queries contact us: Manager, Imagine Marketing Limited Unit
                no. 204 & 205, 2nd floor, D-wing & E-wing, Corporate Avenue,
                Andheri Ghatkopar Link Road, Mumbai, Maharashtra-400093, India
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 main-column ">
            <h5 className="main-title pb-2">Contact</h5>
            <ul className="nav flex-column">
              <li className="pb-4 d-flex align-items-center contact-center ">
                <BsInstagram size={20} /> &nbsp; koHLity
              </li>
              <li className="pb-4 d-flex align-items-center contact-center">
                <BsFillTelephoneFill /> &nbsp; 04783236552225
              </li>
              <li className="d-flex align-items-center contact-center">
                <AiTwotoneMail /> &nbsp; kohli@shop.com
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 main-column">
            <h5 className="main-title pb-2">Shop</h5>
            <ul className="nav flex-column">
              <li className="pb-4">Headphones</li>
              <li className="pb-4">Smart Watches</li>
              <li className="pb-4">Bluetooth Speakers</li>
              <li className="pb-4"> TWS Earbuds</li>
              <li>Home Theaters</li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 main-column">
            <h5 className="main-title pb-2">Help</h5>
            <ul className="nav flex-column">
              <li className="pb-4">Home</li>
              <li className="pb-4">About</li>
              <li className="pb-4">Privacy Policy</li>
              <li className="pb-4">Terms and Conditions</li>
              <li>Contact us</li>
            </ul>
          </div>
        </div>
      </div>
      <span className="copyright-text">
        © 2023 Imagine Marketing Limited. All Rights Reserved.
      </span>
      <span className="inquiry-text">
        For queries contact us: Manager, Imagine Marketing Limited Unit no. 204
        & 205, 2nd floor, D-wing & E-wing, Corporate Avenue, Andheri Ghatkopar
        Link Road, Mumbai, Maharashtra-400093, India
      </span>{" "}
    </div>
  );
};

export default Footer;
