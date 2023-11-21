import { EditData } from "../interface/functionInterface";
import axiosClient from "./axiosClient";

const dbApi = {
  getAll: () => axiosClient.get("dbinformation"),
  createData: (params: EditData) => axiosClient.post("dbinformation", params),
  update: (id: number, params: EditData) =>
    axiosClient.put(`dbinformation/${id}`, params),
  delete: (id: number) => axiosClient.delete(`dbinformation/${id}`),
};

export default dbApi;
