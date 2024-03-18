import axios from "./axios";

const FetchData = async ({method="GET", payload = {}, url}) => {
  try {
    const { data } = await axios.request({
      method,
      url,
      data: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export { FetchData };