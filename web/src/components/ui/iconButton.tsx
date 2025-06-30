/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentProps, ReactElement } from "react";

type IconButtonProps = ComponentProps<"button"> & {
  children: ReactElement<any, any>;
};

export function IconButton({ children, ...props }: IconButtonProps) {
  return (
    <button
      className={
        "flex items-center p-2 bg-gray-200 text-gray-500 text-lg rounded-sm border border-gray-200 hover:border-blue-dark disabled:opacity-50 disabled:pointer-events-none aria-disabled:opacity-50 aria-disabled:pointer-events-none"
      }
      {...props}
    >
      {children}
    </button>
  );
}
