import { ReactNode, SyntheticEvent } from "react";

import { Image, StyledButton } from "./styled";

type ButtonProps = {
  icon?: string;
  children?: ReactNode;
  type?: "submit" | "button" | "reset";
  variant: "primary" | "outlined" | "secondary";
  size: "extra-small" | "small" | "medium" | "large";
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: SyntheticEvent<HTMLButtonElement>) => void;
};

export function Button({
  icon,
  children,
  type,
  variant,
  size,
  className,
  style,
  onClick,
}: ButtonProps) {
  return (
    <StyledButton
      type={type}
      $variant={variant}
      $size={size}
      style={style}
      onClick={onClick}
      className={className}
    >
      {icon && <Image src={icon} alt="button icon" />}
      {children}
    </StyledButton>
  );
}
