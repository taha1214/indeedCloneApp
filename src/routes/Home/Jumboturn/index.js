import { Button } from "antd";
import "../index.css"
import { useNavigate } from "react-router-dom";


const Jumboturn = () => {
  const navigate = useNavigate();

  const handleNavigate =()=> {
    navigate("/signup")

  }

  return (
    <div className="jumboturn-container">
      <div className="jumboturn-left">
        <h1>CareerFinder </h1>
        <h3>Connecting Talent with Opportunity </h3>
        <p>Explore job opportunities across various sectors.
           Get personalized job recommendations, upload your resume,
            and apply online. Start your career journey today!
        </p>
        <Button  type="primary" onClick={handleNavigate} size="large">
          Create Account
        </Button>
      </div>
      <div className="jumboturn-right">
        <img src="download (2).png" alt="user" />
      </div>
    </div>
  );
};

export default Jumboturn;
