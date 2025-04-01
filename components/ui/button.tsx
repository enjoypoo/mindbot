// components/ui/button.tsx
import React from "react";

export function Button({ children, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`rounded px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 ${className}`}
    >
      {children}
    </button>
  );
}
