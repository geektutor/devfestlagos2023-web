import Head from "next/head";

export default function ApplyToSpeak() {
  return (
    <>
      <Head>
        <title>Apply to Volunteer | Devfest Lagos 2023</title>
      </Head>
      <main className='c-home'>
        {/* Form Section */}
        <section className='c-home__apply__form__section'>
          <iframe
            src='https://docs.google.com/forms/u/3/d/e/1FAIpQLSdKpWDUUpXlYhmaJPo6JoWvrwXF2oN8s1uqJtf1qmuANgf9CQ/viewform?embedded=true'
            width='640'
            height='900'
            frameBorder='0'
            marginHeight={0}
            marginWidth={0}
          >
            Loading…
          </iframe>
        </section>
      </main>
    </>
  );
}
