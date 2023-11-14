import React, { FC } from "react";
import { TertiaryButton } from "@/components/button";
import { classNames } from "@/utils/classNames";
import styles from "./rsvp-button.module.scss";
import StarIcon from "@/images/star.svg";
import { Session } from "@/types/Session";
import { useMutation } from "react-query";
import { firebaseAuth } from "@/firebase/app";
import { removeRSVP } from "@/requests/rsvp";

type Props = {
  onSelectTicket: () => void;
  isSelected: boolean;
  isSecured?: boolean;
  onRemoveSession: () => void;
  session: Session | null;
  isFullWidth?: boolean;
};

const RsvpButton: FC<Props> = ({
  session,
  isSelected,
  onSelectTicket,
  isSecured,
  onRemoveSession,
  isFullWidth,
}) => {
  const onClickAction = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    if (isSecured) {
      removeRSVPMutation.mutate();
    } else {
      onSelectTicket();
    }
  };
  const removeRSVPMutation = useMutation({
    mutationFn: async () => {
      const user = firebaseAuth.currentUser;

      if (!user || !session) return;

      const token = await user.getIdToken();

      return removeRSVP({
        sessionId: session.sessionId,
        token: token,
      });
    },
    onSuccess: () => {
      onRemoveSession();
    },
  });

  const isBlueButton = isSelected || isSecured;

  let buttonText;

  if (isSecured) {
    buttonText = "Session Secured";
  } else if (isSelected) {
    buttonText = "Session Selected";
  } else {
    buttonText = "Select Session";
  }
  return (
    <TertiaryButton
      className={classNames(
        styles.bookASeat,
        isFullWidth && styles.fullWidth,
        !isBlueButton && styles.notSelected,
        isSecured && styles.secured,
      )}
      onClick={onClickAction}
      isDisabled={removeRSVPMutation.isLoading}
      icon={
        isBlueButton ? (
          <div className={styles.bookASeatIcon}>
            <StarIcon />
          </div>
        ) : undefined
      }
    >
      <span className={styles.normalText}>{buttonText}</span>
      {isSecured && <span className={styles.hoverText}>Remove Session</span>}
    </TertiaryButton>
  );
};

export default RsvpButton;
