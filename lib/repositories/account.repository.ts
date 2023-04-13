import { IFormInputs } from "@/pages/login";
import { AxiosInstance } from "axios";
import axiosInstance from "../axios/axios.client";

type SuccessfulEntry = {
    token: string;
}

type IAccountRepository = {
    loginUser: (body: IFormInputs) => Promise<SuccessfulEntry>;
}

function AccountRepository(axios: AxiosInstance): IAccountRepository {
    return {
        loginUser: async (body: IFormInputs) => (await axios.post("/login", body)).data,
    }
}

export default AccountRepository(axiosInstance);