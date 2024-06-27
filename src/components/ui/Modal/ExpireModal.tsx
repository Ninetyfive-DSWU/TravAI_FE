import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../enums/CommonEnum";

interface UseExpireModalProps {
  title: string;
}

const useExpireModal = ({ title }: UseExpireModalProps) => {
  const [modal, contextHolder] = Modal.useModal();
  const nav = useNavigate();

  const showCountDownModal = () => {
    let secondsToGo = 5;

    const instance = modal.success({
      title: title,
      content: `${secondsToGo}초 후에 메인 화면으로 이동합니다.`,
    });

    const timer = setInterval(() => {
      secondsToGo -= 1;
      instance.update({
        content: `${secondsToGo}초 후에 메인 화면으로 이동합니다.`,
      });
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      instance.destroy();
      nav(ROUTES.HOME);
    }, secondsToGo * 1000);
  };

  return { showCountDownModal, contextHolder };
};

export default useExpireModal;
