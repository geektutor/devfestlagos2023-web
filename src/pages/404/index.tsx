import Image from "next/image";
import DynamicLakeBackground from "@/components/dynamic-lake-background";
import { SEO } from "@/components/seo";

import animePerson from "./anime-person.png";
import { PrimaryButton } from "@/components/button";

export default function Custom404() {
  return (
    <>
      <SEO
        title='Page Not Found - Devfest Lagos 2023 | Early Bird Tickets'
        description='Page not found'
        keywords='404, page not found'
      />
      <main className='c-404'>
        <DynamicLakeBackground />
        <div className='c-404__content'>
          <div className='c-404__content__header'>
            <div className='c-404__content__header__information'>
              <h1>Only God know wetin carry you reach here</h1>
              <p>
                Because how you take find this page?
                <br />
                Use link, you go dey experiment.
                <br />
                Oshey, Marie Curie 🙌🏽
              </p>
              <PrimaryButton href='/'>
                <span>Go to Home Page</span>
              </PrimaryButton>
            </div>

            <div className='c-404__content__header__anime-person'>
              <Image src={animePerson} alt='anime person' fill />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
