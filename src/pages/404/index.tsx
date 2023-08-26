import Fisherman from "@/components/fisherman";
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
        <div className='c-404__fisherman'>
          <Fisherman />
        </div>
      </main>
    </>
  );
}
