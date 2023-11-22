import React, { useMemo, useState } from "react";
import { findPath, LOCATION_TO_STRING_MAP, STRING_TO_LOCATION_MAP } from "@/utils/map";
import LandmarkMap from "@/components/event-map";
import Head from "next/head";
import PinIcon from "@/images/map/pin.svg";
import DownIcon from "@/images/map/caret-down.svg";
import { classNames } from "@/utils/classNames";
import { PrimaryButton } from "@/components/button";

type DropdownProps = {
  value: string | null;
  onChange: (newValue: StringToLocation) => void;
  placeholder: string;
  otherValue: string | null;
  isStart?: boolean;
};

type StringToLocation = keyof typeof STRING_TO_LOCATION_MAP;

const Dropdown = ({ value, onChange, placeholder, otherValue, isStart }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  //todo: if there's free time close on window click
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const _onChange = (newValue: StringToLocation) => {
    setIsOpen(false);
    onChange(newValue);
  };

  const options = useMemo(() => {
    return Object.entries(LOCATION_TO_STRING_MAP).filter(([value]) => {
      // Explain: You can't start from the exit
      if (isStart && value === "EXIT") return false;

      return value !== otherValue;
    });
  }, [isStart, otherValue]);

  return (
    <div className='map__form__dropdown'>
      <button className='map__form__dropdown__inner' onClick={toggleOpen}>
        <PinIcon className='map__form__dropdown__pin-icon' />
        <span className={classNames("map__form__dropdown__text", !value && "is-placeholder")}>
          {value || placeholder}
        </span>
        <DownIcon />
      </button>
      <div className={classNames("map__form__dropdown__options", isOpen && "is-open")}>
        {options.map(([key, value]) => (
          <button
            className='map__form__dropdown__option'
            key={key}
            onClick={() => _onChange(value as StringToLocation)}
          >
            <PinIcon /> {value}
          </button>
        ))}
      </div>
    </div>
  );
};

const Map = () => {
  const [currentLocation, setCurrentLocation] = useState<StringToLocation | null>(null);
  const [destination, setDestination] = useState<StringToLocation | null>(null);

  const onClickDirectMe = () => {
    if (!currentLocation || !destination) return;

    const currentLocationKey = STRING_TO_LOCATION_MAP[currentLocation];
    const destinationKey = STRING_TO_LOCATION_MAP[destination];

    console.log(findPath(currentLocationKey, destinationKey));
  };

  return (
    <>
      <Head>
        <title>Event Layout Map</title>
        <meta name='description' content='Find your way around the event' />
      </Head>
      <main className='map'>
        <div className='map__form'>
          <h1 className='map__form__header'>Map</h1>
          <p className='map__form__subtitle'>
            Let us help you find your way around Landmark Center
          </p>
          <Dropdown
            isStart
            value={currentLocation}
            onChange={setCurrentLocation}
            placeholder='Your current location'
            otherValue={destination}
          />
          <span className='map__form__divider' />
          <Dropdown
            value={destination}
            onChange={setDestination}
            placeholder='Your destination'
            otherValue={currentLocation}
          />
          <PrimaryButton
            className='map__form__button'
            isDisabled={!currentLocation || !destination}
            onClick={onClickDirectMe}
          >
            Direct Me
          </PrimaryButton>
        </div>
        <div className='map__map-wrapper'>
          <LandmarkMap />
        </div>
      </main>
    </>
  );
};

export default Map;
