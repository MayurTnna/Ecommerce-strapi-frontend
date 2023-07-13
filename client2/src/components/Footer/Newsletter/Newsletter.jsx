import { useState } from "react";
import "./Newsletter.scss";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
const Newsletter = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);

  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(
        selectedOptions.filter((selectedOption) => selectedOption !== option)
      );
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare the data in the desired format
    const userDetails = {
      data: {
        userDetails: { email: email, options: selectedOptions },
      },
    };
    console.log(userDetails);
    try {
      const response = await axios.post(
        "http://localhost:1337/api/newsletter-users",
        userDetails
      );
      console.log(response, "response");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <main className="main">
        <div className="container news flow">
          <h2 className="news__title">Sign up for newsletters</h2>
          <div className="news-grid">
            <div className="card__group">
              <div className="nsjas pb-3">
                <div className="card active">
                  <input
                    className="custom"
                    type="checkbox"
                    id="check1"
                    checked={selectedOptions.includes("option1")}
                    onChange={() => handleCheckboxChange("option1")}
                  />
                  <label for="check1">
                    <h5>Daily Bits</h5>
                    <p>Today’s biggest news</p>
                  </label>
                </div>
              </div>
              <div className="temp-pad">
                <div className="card ">
                  <input
                    className="custom"
                    type="checkbox"
                    id="check2"
                    checked={selectedOptions.includes("option2")}
                    onChange={() => handleCheckboxChange("option2")}
                  />
                  <label for="check2">
                    <h5>Week in Review</h5>
                    <p>The week’s biggest news</p>
                  </label>
                </div>
              </div>
            </div>
            <div className="card__group">
              <div className="nsjas pb-3">
                <div className="card">
                  <input
                    className="custom"
                    type="checkbox"
                    id="check3"
                    checked={selectedOptions.includes("option3")}
                    onChange={() => handleCheckboxChange("option3")}
                  />
                  <label for="check3">
                    <h5>The Exchange</h5>
                    <p>Art, money and markets</p>
                  </label>
                </div>
              </div>
              <div className="temp-pad">
                <div className="card">
                  <input
                    className="custom"
                    type="checkbox"
                    id="check4"
                    checked={selectedOptions.includes("option4")}
                    onChange={() => handleCheckboxChange("option4")}
                  />
                  <label for="check4">
                    <h5>Event Updates</h5>
                    <p>Announcements and discounts</p>
                  </label>
                </div>
              </div>
            </div>
            <div className="card__group">
              <div className="nsjas pb-3">
                <div className="card">
                  <input
                    className="custom"
                    type="checkbox"
                    id="check5"
                    checked={selectedOptions.includes("option5")}
                    onChange={() => handleCheckboxChange("option5")}
                  />
                  <label for="check5">
                    <h5>Sponsorship</h5>
                    <p>Partnership insights</p>
                  </label>
                </div>
              </div>
              <div className="temp-pad">
                <div className="card">
                  <input
                    className="custom"
                    type="checkbox"
                    id="check6"
                    checked={selectedOptions.includes("option6")}
                    onChange={() => handleCheckboxChange("option6")}
                  />
                  <label for="check6">
                    <h5>This Week in Art</h5>
                    <p>Art news of the week</p>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="news__form">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              placeholder=" Enter your email address"
              value={email}
              onChange={handleEmailChange}
            />
            <button
              className="news__btn"
              onClick={(e) => {
                handleSubmit(e);
                setLoader(true);
                setTimeout(() => {
                  setLoader(false);
                }, [2000]);
              }}
            >
              {!loader ? (
                <>Subscribe</>
              ) : (
                <TailSpin
                  height="30"
                  width="80"
                  color="white"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              )}
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Newsletter;
