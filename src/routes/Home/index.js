import Jumboturn from "./Jumboturn";
import JobList from "./JobsList";
import "./index.css";
import { useSelector } from "react-redux";
import CompanyHeader from "../../components/Header/companyHeader";
import StudentHeader from "../../components/Header/studentHeader";
import AdminHeader from "../../components/Header/adminHeader";


const Home = () => {
  const { user } = useSelector((s) => s.userReducer);
  const category = user?.category
  console.log("cat" ,category)


  if(category === "company"){
    return(
      <div>
      <CompanyHeader /> 
    <div className="home-page"> <Jumboturn /></div>
    </div>
    )}
    else if(category === "user"){
     return(
      <div>
        <StudentHeader />
    <div className="home-page"> <JobList /></div>
    </div>
     )
    }else{
      return(
      <div>
        <AdminHeader /> 
      <div className="home-page"> <Jumboturn /></div>
      </div>
      )
    }


  


  // return(
    // <div className="home-page">{category === "company" ?  <Jumboturn /> : <BlogsList /> }</div>
    // <div className="home-page"> <Jumboturn /> </div>
  // );
};

export default Home;
