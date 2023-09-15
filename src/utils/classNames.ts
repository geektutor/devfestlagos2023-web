export const classNames = (...classes: (string | undefined | false)[]): string =>
  classes.filter(Boolean).join(" ");
