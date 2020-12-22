import { Modal, notification } from 'antd';

export const confirmAction = (action: () => Promise<unknown>) => {
  Modal.confirm({
    visible: true,
    title: 'Xác nhận',
    content: 'Lưu ý, hành động này không thể hoàn tác',
    onOk: async () => {
      try {
        await action();
      } catch (error) {
        notification.error({
          message: error.message
        });
      }
    }
  });
};