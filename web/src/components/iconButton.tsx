/* eslint-disable @typescript-eslint/no-explicit-any */
import { Spinner } from "@radix-ui/themes";
import type { ComponentProps, ReactElement } from "react";

type IconButtonProps = ComponentProps<"button"> & {
  children: ReactElement<any, any>;
  isLoading?: boolean;
};

export function IconButton({
  children,
  isLoading = false,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={
        "flex relative items-center p-2 bg-gray-200 text-gray-500 text-lg rounded-sm border border-gray-200 hover:border-blue-dark disabled:opacity-50 disabled:pointer-events-none aria-disabled:opacity-50 aria-disabled:pointer-events-none"
      }
      {...props}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner size="3" />
        </div>
      )}
      <div className={`${isLoading && "opacity-0"}`}>{children}</div>
    </button>
  );
}
