"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

interface CheckBoxProps {
  isChecked: boolean;
  onToggle: () => void;
}

export const CheckBoxIsSubTitle: React.FC<CheckBoxProps> = ({
  isChecked,
  onToggle,
}) => {
  return (
    <div className="items-top flex space-x-2">
      <Checkbox id="terms1" onCheckedChange={onToggle} checked={isChecked} />
      <div className="gap-1.5 leading-none">
        <label
          htmlFor="terms1"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Is SubTitle
        </label>
      </div>
    </div>
  );
};

export const CheckBoxIsImportant: React.FC<CheckBoxProps> = ({
  isChecked,
  onToggle,
}) => {
  return (
    <div className="items-top flex space-x-2">
      <Checkbox id="terms1" onCheckedChange={onToggle} checked={isChecked} />
      <div className="gap-1.5 leading-none">
        <label
          htmlFor="terms1"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Is Important
        </label>
      </div>
    </div>
  );
};
