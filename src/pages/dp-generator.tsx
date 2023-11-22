import Logo from "@/images/logo.svg";
import { socialMediaLinks } from "@/utils/social-media";
// import UploaderIcon from "@/images/dp-generator/bytesize_upload.png";
import Image from "next/image";
import * as React from "react";
import { PrimaryButton } from "@/components/button";
import { DpGen } from "@/components/dp-gen/dp-gen";
import Avatar1 from "@/images/speakers-page/avatars/sp_avatar_1.png";
import Avatar2 from "@/images/speakers-page/avatars/sp_avatar_2.png";
import RefreshDoodle from "@/images/repeat-doodle.png";
import Cup from "@/images/cup-code.png";
import Globe from "@/images/globe-doodle.png";
import CropImage from "@/components/crop-image/crop-image";
import { SEO } from "@/components/seo";
// import SeoImage from "@/images/dp-generator/pepper_dem_dp.png";

export default function DpGenerator() {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [name, setName] = React.useState("");
  const [selectedColor, setSelectedColor] = React.useState("");
  const [profilePicture, setProfilePicture] = React.useState<string | null>("");
  const [isPreview, setIsPreview] = React.useState<boolean>(false);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(event.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    setIsPreview(!isPreview);
  };

  const getCroppedImage = (cropped_img: string) => {
    setProfilePicture(cropped_img);
  };

  return (
    <>
      <SEO
        title='Generate Your DevFest Lagos 2023 DP'
        description='Create and Share your DevFest Lagos 2023 DP with friends and on your socials'
        keywords='gdg lagos, devfest, devfest lagos, devfest lagos 2023'
        image='/og-images/home-page.png'
      />
      <nav className='c-home__nav'>
        <Logo className='c-home__nav__logo' />
      </nav>
      <main className='dp_gen_page'>
        <header className='dp_gen_page__header'>
          <h2 className='dp_gen_page__header_title'>Pepper demmm!🥳</h2>
          <p className='dp_gen_page__header_details'>
            Generate and share your unique Devfest Lagos 2023 DP
          </p>

          <figure className='dp_gen_page__header_avatar1'>
            <Image src={Avatar1} alt='Meemoji devfest' quality={100} />
          </figure>
          <figure className='dp_gen_page__header_avatar2'>
            <Image src={Avatar2} alt='Meemoji devfest' quality={100} />
          </figure>

          <figure className={"dp_gen_page__header_doodle_1"}>
            <Image src={RefreshDoodle} alt='Doodle' quality={100} />
          </figure>
          <figure className={"dp_gen_page__header_doodle_2"}>
            <Image src={Globe} alt='Move' quality={100} />
          </figure>
          <figure className={"dp_gen_page__header_doodle_3"}>
            <Image src={Cup} alt='Cup' quality={100} />
          </figure>
        </header>

        {!isPreview ? (
          <section className='dp_gen_page__customize'>
            <div className='dp_gen_page__customize_container'>
              <h4 className='dp_gen_page__customize_title'>Customise your Devfest DP</h4>
              <form className='dp_gen_page__customize_form'>
                <div className='dp_gen_page__customize_form_group'>
                  <label className='dp_gen_page__customize_form_group_label'>
                    <div>Name</div>
                    <div>Nickname, first name, how you want it</div>
                  </label>
                  <input
                    className='dp_gen_page__customize_form_group_input'
                    type='text'
                    placeholder='Enter name'
                    value={name}
                    name='name'
                    maxLength={15}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className='dp_gen_page__customize_form_group'>
                  <label className='dp_gen_page__customize_form_group_label'>
                    <div>Photo</div>
                    <div>Preferrably in a square resolution</div>
                  </label>

                  <input
                    className='dp_gen_page__customize_form_group_input'
                    placeholder='Enter name'
                    type='file'
                    ref={inputRef}
                    onChange={handleFileChange}
                    accept='image/*'
                  />

                  <CropImage onCroppedImage={getCroppedImage} />
                </div>

                <div className='dp_gen_page__customize_form_group'>
                  <label className='dp_gen_page__customize_form_group_label'>
                    Select preferred color
                  </label>

                  <div className='dp_gen_page__customize_form_group_radio_group'>
                    <div className='form-check green'>
                      <input
                        className='form-check-input'
                        id='radio1'
                        type='radio'
                        onChange={handleRadioChange}
                        name='radioGroup'
                        checked={selectedColor === "green"}
                        value='green'
                      />
                      <span className='radio-button'></span>
                      <label className='form-check-label' htmlFor='radio1'>
                        Green
                      </label>
                    </div>
                    <div className='form-check blue'>
                      <input
                        className='form-check-input'
                        id='radio2'
                        type='radio'
                        onChange={handleRadioChange}
                        name='radioGroup'
                        checked={selectedColor === "blue"}
                        value='blue'
                      />
                      <span className='radio-button'></span>
                      <label className='form-check-label' htmlFor='radio2'>
                        Blue
                      </label>
                    </div>
                    <div className='form-check yellow'>
                      <input
                        className='form-check-input'
                        id='radio3'
                        type='radio'
                        onChange={handleRadioChange}
                        name='radioGroup'
                        checked={selectedColor === "yellow"}
                        value='yellow'
                      />
                      <span className='radio-button'></span>
                      <label className='form-check-label' htmlFor='radio3'>
                        Yellow
                      </label>
                    </div>
                    <div className='form-check red'>
                      <input
                        className='form-check-input'
                        id='radio4'
                        type='radio'
                        onChange={handleRadioChange}
                        name='radioGroup'
                        checked={selectedColor === "red"}
                        value='red'
                      />
                      <span className='radio-button'></span>
                      <label className='form-check-label' htmlFor='radio4'>
                        Red
                      </label>
                    </div>
                  </div>
                </div>

                <PrimaryButton
                  onClick={handleSubmit}
                  className='speakers_page__info_cards_details_button'
                  type='button'
                  isDisabled={!name || !selectedColor || !profilePicture}
                >
                  Generate your dp
                  {/* <ArrowRight /> */}
                </PrimaryButton>
              </form>
            </div>
          </section>
        ) : (
          <DpGen
            handleRegenerate={setIsPreview}
            name={name}
            theme={selectedColor}
            photo={profilePicture}
          />
        )}
      </main>

      <footer className='c-home__footer'>
        <ul className='c-home__footer__links'>
          <li className='c-home__footer__links__link'>
            <a href='https://gdg.community.dev/gdg-lagos/' target='_blank'>
              Join the community
            </a>
          </li>
          <li className='c-home__footer__links__link'>
            <a href='https://policies.google.com/privacy' target='_blank'>
              Privacy policy
            </a>
          </li>
        </ul>
        <Logo className='c-home__footer__logo' />
        <div className='c-home__footer__social-media'>
          <p className='c-home__footer__social-media__title'>Follow us on:</p>
          <ul className='c-home__footer__social-media__links'>
            {socialMediaLinks.map((link) => (
              <li key={link.link}>
                <a href={link.link} target='_blank' className='c-home__footer__social-media__link'>
                  {link.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </>
  );
}
