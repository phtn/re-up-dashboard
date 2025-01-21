import { cn } from "@/lib/utils";
import { type ComponentProps, forwardRef, useId } from "react";

interface InputProps extends ComponentProps<"input"> {
  label?: string;
}

export const Input_ = forwardRef<HTMLInputElement, ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input_.displayName = "Input_";

export const Input = ({ ref, ...props }: InputProps) => {
  return (
    <input
      type={props.type}
      className={cn(
        "flex h-9 w-full font-bold rounded-none border bg-transparent px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        props.className,
      )}
      ref={ref}
      {...props}
    />
  );
};

export function InputOrigin(props: InputProps) {
  const id = useId();
  return (
    <div className="group relative">
      <label
        htmlFor={id}
        className="absolute start-2 border-[0.33px] border-muted-foreground top-0 z-10 block -translate-y-1/2 bg-background px-1.5 text-xs font-medium text-foreground group-has-[:disabled]:opacity-50"
      >
        {props.label}
      </label>
      <Input
        id={id}
        className={cn(
          "px-3 pt-1.5 h-12 border-muted-foreground border-[0.33px] font-semibold w-full",
          props.className,
        )}
        placeholder={props.placeholder}
        type={props.type}
        {...props}
      />
    </div>
  );
}
