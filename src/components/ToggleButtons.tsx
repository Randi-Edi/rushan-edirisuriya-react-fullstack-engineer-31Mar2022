import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { openDayTypeList } from "../enums/OpenDayTypes.enum";

interface ToggleButtonsProps {
  label: string;
  onChange?: (e: React.MouseEvent<HTMLElement>) => void;
  openDay: string | null;
}

export default function ToggleButtons({ label, onChange, openDay }: ToggleButtonsProps) {
  return (
    <>
      {label && <div className="label">{label} </div>}
      <ToggleButtonGroup size="small" value={openDay} exclusive onChange={onChange} aria-label="text openDay">
        {openDayTypeList.map((item, index) => {
          return (
            <ToggleButton value={item} key={index} aria-label="left aligned" color="primary" sx={{ fontWeight: 600 }}>
              {item}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
    </>
  );
}
