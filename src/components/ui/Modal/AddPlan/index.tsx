import React, { useState, useEffect, useRef } from "react";
import { Modal, AutoComplete } from "antd";
import usePlanStore from "@store/usePlanStore";
import { API_KEY } from "../../../../config";
import styled from "styled-components";
import Typography from "@components/ui/Typography/Typography";
import { loadScript } from "@utils/LoadScript";

interface AddPlanProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleCancel: () => void;
}

interface PlanProps {
  id: number;
  time: string;
  place: string;
  address: string;
  city: string;
  day: string;
  endday: string;
  startday: string;
  move: null | string;
  order: number;
  session_id: string;
}

const AddPlan: React.FC<AddPlanProps> = ({ modalOpen, setModalOpen, handleCancel }) => {
  const { plans, setPlans, currentDay } = usePlanStore();
  const city = plans[0].city;
  const [inputValue, setInputValue] = useState<string | undefined>("");
  const [predictions, setPredictions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [newPlan, setNewPlan] = useState<PlanProps>();
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
  const geocoder = useRef<google.maps.Geocoder | null>(null);
  const timerId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&language=ko`, () => {
      if (!autocompleteService.current) {
        autocompleteService.current = new google.maps.places.AutocompleteService();
        geocoder.current = new google.maps.Geocoder();
      }
    });
  }, []);

  useEffect(() => {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }

    timerId.current = setTimeout(() => {
      if (inputValue && autocompleteService.current && geocoder.current) {
        geocoder.current.geocode({ address: city }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
            const location = results[0].geometry.location;
            const bounds = results[0].geometry.viewport; // 지역 경계 설정
            const request = {
              input: inputValue,
              location: location,
              radius: 50000,
              bounds: bounds,
              types: ["geocode", "establishment"],
            };
            if (autocompleteService.current) {
              autocompleteService.current.getPlacePredictions(request, (newPredictions, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && newPredictions) {
                  setPredictions(newPredictions.slice(0, 4));
                  console.log("검색완료");
                } else {
                  setPredictions([]);
                }
              });
            }
          }
        });
      } else {
        setPredictions([]);
      }
    }, 1000);

    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
    };
  }, [inputValue, city]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleSelect = (value: string) => {
    const selected = predictions.find((p) => p.description === value);
    setInputValue(selected?.structured_formatting.main_text);
    setNewPlan({
      id: new Date().getTime(),
      time: "",
      place: selected?.structured_formatting.main_text || "",
      address: selected?.structured_formatting.secondary_text || "",
      city,
      day: currentDay.toString(),
      endday: plans[0].endday,
      startday: plans[0].startday,
      move: "",
      order: 1,
      session_id: plans[0].session_id,
    });
  };

  const handleOk = () => {
    if (newPlan) {
      // 현재 plans 배열에서 가장 큰 order 값에 1을 더해 새로운 order 값으로 설정
      const maxOrder = plans.reduce((max, plan) => Math.max(max, plan.order), 0);
      const updateOrder = {
        ...newPlan,
        order: maxOrder + 1,
      };
      // setPlans((prevPlans) => [...prevPlans, newPlan]);
      const addedPlans = [...plans, updateOrder];
      setPlans(addedPlans);
    }
    setModalOpen(false);
  };

  return (
    <Modal title="일정 추가" open={modalOpen} onOk={handleOk} onCancel={handleCancel} centered>
      <AutoComplete
        placeholder="추가할 일정"
        value={inputValue}
        onChange={handleInputChange}
        options={predictions.map((p) => ({
          value: p.description,
          label: (
            <DropdownConatiner>
              <Typography content={p.structured_formatting.main_text} size={20} fontWeight={600} />
              <Typography content={p.structured_formatting.secondary_text} size={16} />
            </DropdownConatiner>
          ),
        }))}
        onSelect={handleSelect}
        style={{ width: "100%", display: "flex" }}
      />
    </Modal>
  );
};

export default AddPlan;

const DropdownConatiner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
