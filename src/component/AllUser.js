import React, { useEffect, useState } from "react";
import Deleted from "../img/delete.svg";
import Edit from "../img/edit.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../img/loading.gif";

const AllUser = () => {
  const navigate = useNavigate();
  const [allData, setAllData] = useState([]);
  const [inputData, setInputData]= useState({
    name:"",email:""
  })
  const [state, setstate] = useState(false);

  const getData = async () => {
    setstate(true);
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get(
        "https://login-api.web2rise.in/api/users",
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        if (response.data.data) {
              setAllData(response.data.data);
              setstate(false);
            }
      } else {
        console.log('Server returned an error:');
      }
    } catch (error) {
      if (error.message) {
        localStorage.removeItem("token");
          navigate('/');
        }
      }
  };

  const changeInputHandle = (e) =>{
    setInputData({...inputData, [e.target.name]:e.target.value})
  }

    const editData = (ediValue) => {
      const id = ediValue.id;
      const filteredData = allData.find((val) => val.id === id);
      setInputData({ name: filteredData.name, email: filteredData.email });
    };

    const updateData = async (e) =>{
      e.preventDefault();
      const token = localStorage.getItem('token');
      try {
        const response = await axios.post('https://login-api.web2rise.in/api/update-user', inputData, {
            headers: {
              Authorization: token, 
              'Content-Type': 'application/json',
            },
          }
        );
        if(response.data.message==="user updated successfully"){
          setInputData({name:"",email:""})
          getData();
        }
          
        } catch (error) {
          console.error(error); 
        }
  
      }

  const deleteData = async (valData) => {
    setstate(true);
    const email = valData.email;
    const token = localStorage.getItem('token');
    try {
      const resp = await axios.post(
        "https://login-api.web2rise.in/api/delete-user",
        { email: email },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      if (resp.data.message === "user deleted successfully") {
        getData();
        setstate(false);
      }
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate("/");
    } else {
      getData();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {state ? (
        <div className="loadingImge">
          <img src={Loading} alt="Loading " className="loading Imge" />
        </div>
      ) : ("" )}

      <section className="allUsers">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="userentries">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name </th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allData.map((val, indx) => {
                      return (
                        <tr key={indx}>
                          <td>{val.id}</td>
                          <td>{val.name}</td>
                          <td>{val.email}</td>
                          <td>
                            <button
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              onClick={() => editData(val)}
                            >
                              <img src={Edit} alt="Edit " />
                            </button>
                            <button onClick={() => deleteData(val)}>
                              <img src={Deleted} alt="Delete" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="form2Example1"
                    className="form-control"
                    name="name"
                    onChange={changeInputHandle}
                    value={inputData.name}
                  />
                  <label className="form-label" htmlFor="form2Example1">
                    Name
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form2Example1"
                    className="form-control"
                    name="name"
                    onChange={changeInputHandle}
                    value={inputData.email}
                    disabled 
                  />
                  <label className="form-label" htmlFor="form2Example1">
                    Email
                  </label>
                </div>

                <button
                  type="button"
                  className="btn btn-primary btn-block mb-4"
                  onClick={updateData}
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllUser;
