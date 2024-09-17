import { FormHTMLAttributes, ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  otherCSS?: string;
} & Omit<FormHTMLAttributes<HTMLFormElement>, "className">;
// The line above make sure that the "classname" prop will be omited for rewriting

export function Card({ children, otherCSS, ...rest }: CardProps) {
  return (
    <form
      className={`flex flex-col items-center justify-center rounded-lg mx-4 ${otherCSS}`}
      // rest operator to collect others props passed through the: Card! <3
      {...rest}
    >
      {children}
    </form>
  );
}
