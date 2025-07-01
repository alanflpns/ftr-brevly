import { WarningIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import type { ComponentProps } from "react";

type InputProps = ComponentProps<"input"> & {
  label: string;
  prefix?: string;
  error?: string;
};

export function Input({ label, prefix, error, ...props }: InputProps) {
  const containerClass = clsx(
    "flex items-center text-md text-gray-600 rounded-lg border-[1.5px] relative mt-5",
    error ? "border-danger" : "border-gray-300 focus-within:border-blue-base"
  );
  const inputClass = clsx(
    "flex-1 outline-none peer",
    prefix ? "py-4 pr-4" : "p-4"
  );

  const labelClass = clsx(
    "text-xs absolute top-[-16px] left-0 transform -translate-y-1/2",
    error
      ? "text-danger font-bold peer-focus:text-danger"
      : "text-gray-500 peer-focus:text-blue-base peer-focus:font-bold"
  );

  return (
    <div className="flex flex-col gap-2">
      <div className={containerClass}>
        {prefix && <span className="text-gray-400 pl-4">{prefix}</span>}
        <input className={inputClass} {...props} />
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
