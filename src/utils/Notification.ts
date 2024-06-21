import { notification } from 'antd';

export const infoNotification = (message: string) => {
  notification.info({
    message: 'Info',
    description: message,
    duration: 2,
  });
};

export const successNotification = (message: string) => {
  notification.success({
    message: 'Success',
    description: message,
    duration: 2,
  });
};

export const warningNotification = (message: string) => {
  notification.warning({
    message: 'Warning',
    description: message,
    duration: 2,
  });
};

export const errorNotification = (message: string) => {
  notification.error({
    message: 'Error',
    description: message,
    duration: 2,
  });
};
