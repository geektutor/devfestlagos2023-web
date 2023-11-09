import React, { FC, PropsWithChildren } from "react";
import { classNames } from "@/utils/classNames";
import ArrowRight from "@/images/arrow-right-bg-light.svg";
import Link from "next/link";

type Props = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  variant: "primary" | "secondary" | "tertiary";
  href?: string;
  isExternal?: boolean;
  type?: "button" | "submit" | "reset";
  isDisabled?: boolean;
  icon?: React.ReactNode;
  isLeftIcon?: boolean;
};

const Button: FC<PropsWithChildren<Props>> = ({
  children,
  variant,
  href,
  isExternal,
  type,
  isDisabled,
  icon,
  isLeftIcon,
  ...props
}) => {
  const className = classNames("c-button", `c-button--${variant}`, props.className);

  const { onClick, ...linkProps } = props;

  if (href && isExternal) {
    return (
      <a {...linkProps} href={href} className={className} target='_blank'>
        {children}
      </a>
    );
  }

  if (href && !isExternal) {
    return (
      <Link {...linkProps} href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button
      {...props}
      onClick={onClick}
      disabled={isDisabled}
      className={classNames("c-button", `c-button--${variant}`, props.className)}
      type={type}
    >
      {icon && isLeftIcon && <figure className='c-button__icon-wrapper is-left'>{icon}</figure>}
      {children}
      {icon && !isLeftIcon && <figure className='c-button__icon-wrapper'>{icon}</figure>}
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
    <Button {...props} variant='tertiary' icon={props.icon || <ArrowRight />}>
      {props.children}
    </Button>
  );
};

export default Button;
