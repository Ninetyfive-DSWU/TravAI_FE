import React, { useState, useEffect, useRef } from "react";
import { Modal, AutoComplete } from "antd";
import usePlanStore from "@store/usePlanStore";
import { API_KEY } from "../../../../config";

interface AddPlanProps {
  modalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

const loadScript = (url: string, callback: () => void) => {
  if (window.google && window.google.maps) {
    callback();
    return;
  }
  const script = document.createElement("script");
  script.src = url;
  script.async = true;
  script.onload = callback;
  document.head.appendChild(script);
};

const AddPlan: React.FC<AddPlanProps> = ({ modalOpen, handleOk, handleCancel }) => {
  const { plans } = usePlanStore();
  const city = plans[0].city;
  const [inputValue, setInputValue] = useState<string>("");
  const [predictions, setPredictions] = useState<google.maps.places.AutocompletePrediction[]>([]);
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
          if (status === google.maps.GeocoderStatus.OK && results[0]) {
            const location = results[0].geometry.location;
            const request = {
              input: inputValue,
              location: location,
              radius: 5000,
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

  // 주소 넣기
  // 타이머 (O)
  // plans
  return (
    <Modal title="일정 추가" open={modalOpen} onOk={handleOk} onCancel={handleCancel} centered>
      <AutoComplete
        placeholder="추가할 일정"
        value={inputValue}
        onChange={handleInputChange}
        options={predictions.map((p) => ({
          value: p.structured_formatting.main_text,
        }))}
        style={{ width: "100%", display: "flex" }}
      />
    </Modal>
  );
};

export default AddPlan;
