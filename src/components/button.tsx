import { FC, PropsWithChildren } from "react";
import { classNames } from "@/utils/classNames";
import ArrowRight from "@/images/arrow-right-bg-light.svg";
import Link from "next/link";

type Props = {
  onClick?: () => void;
  className?: string;
  variant: "primary" | "secondary" | "tertiary";
  href?: string;
  isExternal?: boolean;
};

const Button: FC<PropsWithChildren<Props>> = ({
  children,
  variant,
  href,
  isExternal,
  ...props
}) => {
  const className = classNames("c-button", `c-button--${variant}`, props.className);

  if (href && isExternal) {
    return (
      <a {...props} href={href} className={className} target='_blank'>
        {children}
      </a>
    );
  }

  if (href && !isExternal) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button {...props} className={classNames("c-button", `c-button--${variant}`, props.className)}>
      {children}
    </button>
  );
};

export const PrimaryButton: FC<PropsWithChildren<Omit<Props, "variant">>> = (props) => {
  return <Button {...props} variant='primary' />;
};

export const SecondaryButton: FC<PropsWithChildren<Omit<Props, "variant">>> = (props) => {
  return <Button {...props} variant='secondary' />;
};

export const TertiaryButton: FC<PropsWithChildren<Omit<Props, "variant">>> = (props) => {
  return (
    <Button {...props} variant='tertiary'>
      <span>{props.children}</span>
      <ArrowRight />
    </Button>
  );
};

export default Button;
