// Single place where GSAP and its plugins are registered.
// Import `gsap`, `useGSAP`, `ScrollTrigger` and `SplitText` from here, never from the packages
// directly, so registration is guaranteed to have happened. Requires gsap >= 3.13 (all plugins are free).

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, SplitText, ScrambleTextPlugin, ScrollTrigger);

export { gsap, ScrollTrigger, SplitText, useGSAP };
