import React, { useEffect, useState } from "react";
import { Dropdown } from "antd";
import styled from "styled-components";
// import { ROUTES } from "../../../enums/CommonEnum";
// import { useNavigate } from "react-router-dom";
import { successNotification } from "@utils/Notification";

const HeaderDropdown: React.FC = () => {
  // const nav = useNavigate();
  const [username, setUsername] = useState<string>("");

  const handleLogout = () => {
    const message = "로그아웃되었습니다.";
    successNotification(message);
    localStorage.clear();
    setTimeout(() => {
      window.location.replace("/");
    }, 1000);
  };

  useEffect(() => {
    const storedUsername: string | null = localStorage.getItem("userId");
    setUsername(storedUsername);
  }, []);

  const handleMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case "myPage":
        console.log("마이페이지로 이동");
        // nav(ROUTES.MYPAGE, { state: userId });
        break;
      case "logout":
        handleLogout();
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
          <UserName>{username}님</UserName>
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
