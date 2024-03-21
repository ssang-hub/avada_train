// const useFe

import {useEffect, useState} from "react";
import {FetchData} from "../api/fetchData";

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
    const fetchApi = async () => {
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
    fetchApi();
  }, []);

  const refetch = async ({ method = "GET", url, payload }) => {
    try {
      setIsLoading(true);
      const resData = await FetchData({
        method,
        payload,
        url,
      });
      return resData;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const updateData = async (url, updateData, selectedItems) => {
    try {
      await refetch({
        method: "PUT",
        url,
        payload: { data: { items: selectedItems, fields: updateData } },
      });
      setData((prevState) =>
        prevState.map((item) => {
          if (selectedItems.includes(item.id)) {
            return { ...item, ...updateData };
          }
          return item;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  const createData = async (payload, url) => {
    try {
      const resData = await refetch({
        method: "POST",
        payload,
        url,
      });
      setData((prevState) => [...prevState, resData.data]);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteData = async (url, itemId) => {
    try {
      await refetch({ method: "DELETE", url });
      setData((prevState) => prevState.filter((item) => item.id !== itemId));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMultiple = async (url, selectedItems) => {
    await refetch({
      method: "PUT",
      payload: selectedItems,
      url,
    });
    setData((prevState) =>
      prevState.filter((item) => !selectedItems.includes(item.id))
    );
  };

  return {
    data,
    setData,
    isLoading,
    createData,
    updateData,
    deleteData,
    deleteMultiple,
  };
};

export default useFetchAPI;
