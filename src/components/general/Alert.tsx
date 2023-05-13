import React, { useEffect, useState } from "react";

type Props = {
  children: string;
  severity: "error" | "success" | "info" | "warning";
};

const Alert = ({ children, severity = "info" }: Props) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => setVisible(false), 3000);
  }, []);

  let cn = "";
  switch (severity) {
    case "success":
      cn = "bg-green-200 text-green-800 dark:bg-gray-800 dark:text-green-400";
      break;
    case "warning":
      cn =
        "bg-orange-200 text-orange-800 dark:bg-gray-800 dark:text-orange-400";
      break;
    case "error":
      cn = "bg-red-200 text-red-800 dark:bg-gray-800 dark:text-red-400";
      break;
    default:
      cn = "bg-blue-200 text-blue-800 dark:bg-gray-800 dark:text-blue-400";
  }

  if (!visible) return null;

  return (
    <div
      className={`fixed left-[50vw] top-2 mb-4 max-w-lg -translate-x-1/2 rounded-lg p-4 text-sm ${cn}`}
      role="alert"
    >
      {children}
    </div>
  );
};

export default Alert;
