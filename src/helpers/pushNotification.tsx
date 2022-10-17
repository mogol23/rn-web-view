import axios from "axios";
import { PUSH_NOTIFICATION_STORE_TOKEN_API_URL } from '@env';

const axiosInstance = axios.create({
    timeout: 5000,
    headers: {
        "Accept": "application/json"
    },
});

export function storeFcmToken(user_id: string, token: string) {
    axiosInstance.post(`${PUSH_NOTIFICATION_STORE_TOKEN_API_URL}/${user_id}/${token}`);
}
