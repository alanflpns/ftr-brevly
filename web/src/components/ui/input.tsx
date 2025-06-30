import { WarningIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import type { ComponentProps } from "react";

type InputProps = ComponentProps<"input"> & {
  label: string;
  error?: string;
};

export function Input({ label, error, ...props }: InputProps) {
  const inputClass = clsx(
    "peer text-md text-gray-600 p-4 rounded-lg border-[1.5px] focus:outline-none",
    error
      ? "border-danger focus:border-danger"
      : "border-gray-300 focus:border-blue-base"
  );

  const labelClass = clsx(
    "text-xs peer-focus:font-bold",
    error
      ? "text-danger font-bold peer-focus:text-danger"
      : "text-gray-500 peer-focus:text-blue-base"
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col-reverse gap-2">
        <input id="input" className={inputClass} {...props} />
        <label className={labelClass}>{label}</label>
      </div>

      {error && (
        <div className="flex items-center gap-2">
          <WarningIcon className="text-danger" />
          <span className="text-sm text-gray-500">{error}</span>
        </div>
      )}
    </div>
  );
}
