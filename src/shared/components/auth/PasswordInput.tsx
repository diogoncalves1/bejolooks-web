"use client";

import { useState } from "react";
import type { InputHTMLAttributes } from "react";

export function PasswordInput({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        {...props}
        type={visible ? "text" : "password"}
        className={`w-full rounded border p-3 pr-16 ${className}`}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-800"
        tabIndex={-1}
      >
        {visible ? "Ocultar" : "Mostrar"}
      </button>
    </div>
  );
}
