import axios from "axios";
const API = axios.create({
  baseURL: "http://192.168.18.72:5005",
  headers: {
    "Content-type": " application/json",
  },
});

const manageUser = (limit, offset, data) => {
  return API.post("/UserList/" + limit + "/" + offset, data);
};

const getPreviliges = () => {
  return API.get("/GetPreviliges");
};
const getTitles = () => {
  return API.get("/GetTitles");
};

const createUser = (data) => {
  return API.post("/AddUser", data);
};

const editUser = (id, data) => {
  return API.patch("/EditUser/" + id, data);
};
const deleteUser = (id) => {
  return API.patch("/DeleteUser/" + id);
};

const TotalServices = {
  manageUser,
  getPreviliges,
  getTitles,
  createUser,
  editUser,
  deleteUser,
};

export default TotalServices;
