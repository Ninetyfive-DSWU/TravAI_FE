import { Dropdown } from "antd";
import styled from "styled-components";
// import { ROUTES } from "../../../enums/CommonEnum";
// import { useNavigate } from "react-router-dom";

const HeaderDropdown: React.FC = () => {
  // const nav = useNavigate();
  const handleMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case "myPage":
        console.log("마이페이지로 이동");
        // nav(ROUTES.MYPAGE, { state: userId });
        break;
      case "logout":
        console.log("로그아웃 이동");
        //handleLogout();
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Dropdown
        menu={{
          items: [
            {
              label: "마이 페이지",
              key: "myPage",
            },
            {
              label: "로그아웃",
              key: "logout",
              danger: true,
            },
          ],
          onClick: handleMenuClick,
        }}
        trigger={["hover"]}
      >
        <a onClick={(e) => e.preventDefault()}>
          <UserName>OOO님</UserName>
        </a>
      </Dropdown>
    </>
  );
};

export default HeaderDropdown;

const UserName = styled.div`
  cursor: pointer;
  font-size: 1.61vw;
`;
