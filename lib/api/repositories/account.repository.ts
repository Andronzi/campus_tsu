import { IFormInputs } from "@/pages/login";
import { AxiosInstance } from "axios";
import axiosInstance from "../../axios/axios.client";
import ENDPOINTS from "../endpoints";

type SuccessfulEntry = {
    token: string;
}

type IAccountRepository = {
    loginUser: (body: IFormInputs) => Promise<SuccessfulEntry>;
}

function AccountRepository(axios: AxiosInstance): IAccountRepository {
    return {
        loginUser: async (body: IFormInputs) => (await axios.post(ENDPOINTS.ACCOUNT.LOGIN, body)).data,
    }
}

export default AccountRepository(axiosInstance);