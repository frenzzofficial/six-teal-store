import Image from "next/image";
import Link from "next/link";
import { LucideLibrary } from "@/components/ui";
import { buttonVariants } from "@/components/ui/button/Button";
import appConfig from "@/packages/configs/app.config";
import { imagesConfig } from "@/packages/configs/images.config";

const NotFoundPage = () => {
  return (
    <section className="not-found">
      <div className="not-found__content">
        <p className="not-found__code" aria-hidden="true">
          404
        </p>
        <h1 className="not-found__title">
          This page seems to be <span>lost.</span>
        </h1>
        <p className="not-found__description">
          We couldn&apos;t find the page you&apos;re looking for. Maybe it
          moved, was removed, or never existed in our collection.
        </p>

        <div className="not-found__actions">
          <Link
            href={appConfig.routes.home}
            className={buttonVariants({ variant: "primary", size: "lg" })}
          >
            <LucideLibrary name="home" />
            Back to Home
          </Link>
          <Link
            href="/products"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Explore Products
          </Link>
        </div>

        <div className="not-found__tagline">
          <LucideLibrary name="sparkles" className="not-found__tagline-icon" />
          <span>
            Good Products
            <br />
            Better You
          </span>
        </div>
      </div>

      <div className="not-found__aside" aria-hidden="true">
        <Image
          src={imagesConfig.notFoundAside.src}
          alt={imagesConfig.notFoundAside.alt}
          priority
          sizes="(min-width: 1024px) 40vw, 80vw"
          className="not-found__aside-image"
        />
      </div>
    </section>
  );
};

export default NotFoundPage;
