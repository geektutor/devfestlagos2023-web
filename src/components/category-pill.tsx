import React from "react";

interface ICategoryPillProps {
  text: string;
  active: boolean;
}

export default function Categorypill(prop: ICategoryPillProps) {
  return <div className={prop.active ? "c-category active" : "c-category"}>{prop.text}</div>;
}
