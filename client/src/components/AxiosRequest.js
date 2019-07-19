import React, { useState,useEffect } from "react";
import axios from "axios";

const HOST = "http://localhost:4000";
const acticityPostUrl = "/api/exercise/new-user";
const acticityPatchUrl = "/api/exercise/delete-user";
const activityGetUrl = "/api/exercise/users";
 

const AxiosRequest = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);

        setData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
}

export  { AxiosRequest };

