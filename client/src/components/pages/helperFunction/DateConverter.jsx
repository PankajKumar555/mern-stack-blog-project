import React from "react";

export const DateConverter = (values) => {
  const timestamp = values.values.createdAt;
  const date = new Date(timestamp);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);

  const formattedDate = `${day}/${month}/${year}`;

  return (
    <div style={{ fontSize: "14px", color: "gray" }}>
      <strong>Date: </strong> {formattedDate}
    </div>
  );
};

export default DateConverter;
