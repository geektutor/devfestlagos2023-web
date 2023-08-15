import React, { FC, PropsWithChildren } from "react";
import { useEffectOnce } from "@/hooks/useEffectOnce";
import PreloaderAnimation from "@/animations/components/Preloader";
import Bami from "@/images/preloader/bami.svg";
import Akin from "@/images/preloader/akin.svg";
import Logo from "@/images/preloader/logo.svg";
import Google from "@/images/preloader/google.svg";
import Developer from "@/images/preloader/developer.svg";
import Groups from "@/images/preloader/groups.svg";
import Devfest from "@/images/preloader/devfest.svg";
import TwennyThree from "@/images/preloader/twennythree.svg";
import Lagos from "@/images/preloader/lagos.svg";

export const Preloader: FC<PropsWithChildren<object>> = ({ children }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hasLoadedContent, setHasLoadedContent] = React.useState(false);

  useEffectOnce(() => {
    new PreloaderAnimation();
  });

  //todo: we're actually going to animate the preloader out lol but for now we'll just hide it
  if (hasLoadedContent) {
    return children;
  }

  return (
    <div className='c-preloader'>
      <Bami className='c-preloader__bami' />
      <Akin className='c-preloader__akin' />
      <figure className='c-preloader__top-logo'>
        <Logo className='c-preloader__top-logo__svg' />
      </figure>
      <div className='c-preloader__middle-content'>
        <div className='c-preloader__gdg'>
          <Logo className='c-preloader__gdg__logo' />
          {/*todo: use ratio to scale down these svgs on smaller screens*/}
          <Google className='c-preloader__gdg__google' />
          <Developer className='c-preloader__gdg__developer' />
          <Groups className='c-preloader__gdg__groups' />
        </div>
        <div className='c-preloader__devfest'>
          <div className='c-preloader__devfest__text'>
            <Devfest />
          </div>
          <div className='c-preloader__devfest__side-content'>
            <div className='c-preloader__devfest__twennythree'>
              <TwennyThree />
            </div>
            <div className='c-preloader__devfest__lagos'>
              <Lagos />
            </div>
          </div>
        </div>
      </div>
      <p className='c-preloader__loading'>
        <span>Loading</span>
      </p>
      <div className='c-preloader__progress'>
        <div className='c-preloader__progress__inner'>
          {Array.from({ length: 3 }).map((_, i) => (
            <div className='c-preloader__progress__column' key={i} data-column>
              {Array.from({ length: 10 }).map((_, i) => (
                <span key={i}>{9 - i}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
