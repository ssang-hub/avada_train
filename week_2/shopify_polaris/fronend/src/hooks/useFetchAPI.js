// const useFe

import { useEffect, useState } from "react";
import { FetchData } from "../api/fetchData";

/**
 * useFetchAPI hook for fetch data from api
 *
 * @param url
 * @param method
 * @param postData
 *
 * @return {data: [], setData([]), isLoading:true|false}
 * */
const useFetchAPI = (url, method = "GET", postData = {}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await FetchData({ url });
        setData(response.data);
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);
  return { data, setData, isLoading };
};

export default useFetchAPI;
