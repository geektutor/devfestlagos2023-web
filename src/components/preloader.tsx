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
          <Google />
          <Developer className='c-preloader__gdg__developer' />
          <Groups />
        </div>
        <div className='c-preloader__devfest'>
          <div className='c-preloader__devfest__text'>
            <Devfest />
          </div>
          <div className='c-preloader__devfest__side-content'>
            <TwennyThree className='c-preloader__devfest__twennythree' />
            <Lagos />
          </div>
        </div>
      </div>
      <p className='c-preloader__loading'>Loading</p>
      <p className='c-preloader__progress'>
        <span>0</span>
        <span>0</span>
        <span>0</span>
      </p>
    </div>
  );
};
