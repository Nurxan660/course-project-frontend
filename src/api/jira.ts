import axiosInstance from "../config/axiosConfig";
import { MessageApiResponse } from "../types/MessageApiResponse";
import { IssuePaginationRes } from "../types/jira-types/IssuePaginationRes";

const API_URL = process.env.REACT_APP_URL || "";


const createTicket = async (data: any, link: string) => {
  return axiosInstance.post<MessageApiResponse>(
    API_URL + `/api/jira/ticket`, { ...data, link }
  );
};

const getTickets = async (page: number) => {
  return axiosInstance.get<IssuePaginationRes>(
    API_URL + `/api/jira/tickets?page=${page}`,
  );
};


export { createTicket, getTickets };
