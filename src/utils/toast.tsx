import { IAlertProps, IToastProps, Toast as ToastBase } from 'native-base';
import { ReactNode } from 'react';

function index(
  // type: IAlertProps['status'],
  title: ReactNode,
  custom: IToastProps | undefined,
) {
  return ToastBase.show({
    title,
    // status: type,
    duration: 5000,
    ...custom,
  });
}


export default index;
