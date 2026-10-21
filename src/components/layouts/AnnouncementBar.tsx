import {
  FREE_SHIPPING_THRESHOLD,
  RETURN_WINDOW_DAYS,
} from "@/packages/configs/commerce.config";
import { formatPrice } from "@/packages/utils/format";
import Icon from "../ui/icon/IconsLibrary";

/**
 * Thin promo strip above the header. Server component — it's static copy
 * driven by commerce.config, so it ships no JavaScript. It scrolls away
 * with the page (only the header below it is sticky).
 */
const AnnouncementBar = () => (
  <div className="announcement-bar" role="note">
    <p className="announcement-bar__text">
      <Icon name="truck" className="announcement-bar__icon" size={16} />
      <span>
        Free shipping on orders above{" "}
        <strong>{formatPrice(FREE_SHIPPING_THRESHOLD)}</strong>
      </span>
      <span className="announcement-bar__divider" aria-hidden="true" />
      <span className="announcement-bar__secondary">
        {RETURN_WINDOW_DAYS}-day easy returns
      </span>
    </p>
  </div>
);

export default AnnouncementBar;
