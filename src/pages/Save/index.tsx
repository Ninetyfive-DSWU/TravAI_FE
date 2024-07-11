import React from "react";
import styled from "styled-components";
import { Button } from "antd";
import PlanFile from "@pages/Save/PlanFile";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import usePlanStore from "@store/usePlanStore";

const Save: React.FC = () => {
  const {plans, nights} = usePlanStore();

  const handleDownload = async () => {
    const input = document.getElementById("plan-file") as HTMLElement;

    if (input) {
      const canvas = await html2canvas(input, { scale: 5 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      const padding_width = 60;
      const padding_height = 30;

      let position = 0;

      if (pdfHeight > pdf.internal.pageSize.getHeight()) {
        while (position < pdfHeight) {
          pdf.addImage(imgData, "PNG", padding_width, padding_height, pdfWidth - padding_width * 2, pdf.internal.pageSize.getHeight() - padding_height * 2);
          position += pdf.internal.pageSize.getHeight();
        }
      } else {
        pdf.addImage(imgData, "PNG", padding_width, padding_height, pdfWidth, pdfHeight);
      }

      pdf.save(`${plans[0].city}여행일정.pdf`);
    }
  };

  return (
    <SaveContainer>
      <div id="plan-file">
        <PlanFile />
      </div>
      <DownloadButton onClick={handleDownload}>다운로드</DownloadButton>
    </SaveContainer>
  );
};

export default Save;

const SaveContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20mm 0;
  overflow: inherit;
`;

const DownloadButton = styled(Button)`
  width: 100px;
`;
