import React, { FC, PropsWithChildren } from "react";
import ErrorIcon from "@/images/alert/error.svg";
import SuccessIcon from "@/images/alert/success.svg";
import styles from "./alert.module.scss";
import { classNames } from "@/utils/classNames";

type Props = {
  variant: "success" | "error";
};

const stylingClasses = {
  success: styles.success,
  error: styles.error,
};

const icons = {
  success: SuccessIcon,
  error: ErrorIcon,
};

const Alert: FC<PropsWithChildren<Props>> = ({ children, variant }) => {
  const Icon = icons[variant];

  return (
    <div className={classNames(styles.alert, stylingClasses[variant])}>
      <Icon className={styles.icon} />
      <span className={styles.text}>{children}</span>
    </div>
  );
};

export const SuccessAlert: FC<PropsWithChildren> = ({ children }) => {
  return <Alert variant='success'>{children}</Alert>;
};

export const ErrorAlert: FC<PropsWithChildren> = ({ children }) => {
  return <Alert variant='error'>{children}</Alert>;
};
