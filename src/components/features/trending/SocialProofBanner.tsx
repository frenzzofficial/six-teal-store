import { Icon, type IconName } from "@/components/ui";

const STATS = [
  { icon: "package", value: "1.5K", label: "Product Saves" },
  { icon: "shopping-bag", value: "1.2K", label: "Shares" },
  { icon: "star", value: "4.8", label: "Average Rating" },
];

const POSTS = [
  {
    handle: "@karanv",
    quote: "This fragrance is just wow! Long lasting and premium feel.",
  },
  {
    handle: "@priya.fit",
    quote: "My everyday wellness essentials. Highly recommend!",
  },
  {
    handle: "@tech.with.rahul",
    quote: "Best earbuds in this price range. Sound quality is next level!",
  },
];

export function SocialProofBanner() {
  return (
    <section className="social-proof">
      <div className="social-proof__inner section-bleed__inner">
        <div className="social-proof__intro">
          <h2 className="social-proof__title">People Are Talking About It</h2>
          <p className="social-proof__subtitle">
            Real stories. Real love. Real trends.
          </p>
          <dl className="social-proof__stats">
            {STATS.map((stat) => (
              <div key={stat.label} className="social-proof__stat">
                <Icon name={stat.icon as IconName} />
                <div>
                  <dt className="social-proof__stat-value">{stat.value}</dt>
                  <dd className="social-proof__stat-label">{stat.label}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
        <div className="social-proof__posts">
          {POSTS.map((post) => (
            <div key={post.handle} className="social-proof__post">
              <p className="social-proof__post-quote">"{post.quote}"</p>
              <p className="social-proof__post-handle">{post.handle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
