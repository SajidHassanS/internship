import { baseUrl } from "@/lib/utils";
import axios from "axios";

// get all crops
export const getAllCrops = async (token: string) => {
  try {
    const res = await axios.get(`${baseUrl}/crop/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
