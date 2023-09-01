import DynamicLakeBackground from "@/components/dynamic-lake-background";
import { SEO } from "@/components/seo";

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
          <h1>I ❤️ Geek Tutor</h1>
        </div>
      </main>
    </>
  );
}
