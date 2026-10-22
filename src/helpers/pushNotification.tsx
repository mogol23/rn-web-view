import {apiInstance} from '../utils';
import {PUSH_NOTIFICATION_STORE_TOKEN_API_URL} from '@env';

/** Store the device FCM token against the authenticated session. */
export function storeFcmToken(user_id: string, token: string) {
  return apiInstance.post(
    `${PUSH_NOTIFICATION_STORE_TOKEN_API_URL}/${user_id}/${token}`,
  );
}
