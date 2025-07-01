import type { ComponentProps } from "react";
import { Spinner } from "@radix-ui/themes";
import { tv, type VariantProps } from "tailwind-variants";

import "@radix-ui/themes/styles.css";

const buttonVariants = tv({
  base: "flex relative items-center justify-center bg-blue-base text-white text-md font-medium rounded-lg hover:bg-blue-dark disabled:opacity-50 disabled:pointer-events-none aria-disabled:opacity-50 aria-disabled:pointer-events-none",

  variants: {
    variant: {
      default: "px-5 py-4 w-full",
      secondary:
        "p-2 bg-gray-200 text-gray-500 border border-gray-200 hover:bg-gray-200 hover:border-blue-dark",
    },
  },

  defaultVariants: {
    variant: "default",
  },
});

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    children: React.ReactNode;
    icon?: React.ReactNode;
    isLoading?: boolean;
  };

export function Button({
  variant,
  className,
  children,
  icon,
  isLoading = false,
  ...props
}: ButtonProps) {
  return (
    <button className={buttonVariants({ variant, className })} {...props}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner size="3" />
        </div>
      )}

      {icon && (
        <div
          className={`text-lg pr-2 text-gray-600 ${isLoading && "opacity-0"}`}
        >
          {icon}
        </div>
      )}
      <div className={`${isLoading && "opacity-0"}`}>{children}</div>
    </button>
  );
}
