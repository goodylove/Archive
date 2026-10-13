# SYSTEM DIRECTIVE: ARCHIVE PROJECT

## 1. Project Overview
You are assisting in designing and building "ARCHIVE," a fictional digital museum dedicated to documenting and celebrating Nigeria's creative history. 
* **Core Directive:** "Make the past feel impossible to ignore."
* **Focus Area:** Nigerian Music History (Afrobeat, Highlife, Afro-Jùjú, Reggae).
* **Vibe/Aesthetic:** Editorial, analog-meets-digital, physical archive, brutalist but refined. It should feel like an interactive, high-end coffee-table book featuring "specimen cards" of historical artists.

## 2. Winning Criteria (Always evaluate your output against these)
To win this challenge, every component you generate must strictly adhere to the following rubrics:

* **[CRITERIA 1] Design (Visual Polish):** 
  - Flawless typography and hierarchy. 
  - Mix oversized editorial serif fonts with utilitarian, mono-spaced fonts for metadata (BPM, Catalog Numbers, Dates). 
  - Maintain a consistent art direction using the specific `accentColor` and `secondaryColor` provided in the data objects.
* **[CRITERIA 2] Creativity (Inventiveness):** 
  - Do NOT use standard SaaS, generic portfolio, or typical dashboard layouts. 
  - Break the grid safely. Use overlapping elements, marquee scrolling text, and distinct hover states (e.g., revealing duotone images). 
  - Interpret the brief with bold originality rather than following familiar web trends.
* **[CRITERIA 3] Usability (Functionality):** 
  - The site must be intuitive and accessible. 
  - Ensure AAA color contrast. 
  - Great visuals must not break the UX. Animations should enhance storytelling, not cause motion sickness or block navigation.
* **[CRITERIA 4] Content (Storytelling):** 
  - Treat text as a design element. 
  - Seamlessly integrate quotes, news headlines, and pressing plant locations from the data objects into the layout. 
  - The UI must communicate the cultural weight and legacy of the Nigerian artists.

## 3. Data Structure Context
The application relies on a rich JSON array of historical "specimens" (e.g., Sir Shina Peters, Fela Kuti, Oliver De Coque). 
* Each object contains metadata: `honorific`, `hitTrack`, `bpm`, `catalogNumber`, `quote`, `collage.newsHeadline`, etc.
* **Your Rule:** When building components, always utilize this metadata to create dense, information-rich UI elements rather than just relying on generic titles and descriptions. 

## 4. Coding Rules for this Agent
* **Tech Stack:** Nextjs, Tailwind CSS, Framer Motion.
* **Responsiveness:** All layouts must be stunning on both 4K desktop screens and mobile devices. 
* **Animations:** Default to Framer Motion for smooth, physical-feeling interactions (spring physics, subtle parallax, staggered text reveals).
* When asked to build a section, always think: "Does this look like an award-winning Awwwards/FWA site?" If no, push the design further before outputting the code.

## THE Challange:
Design & build a landing page for ARCHIVE, a fictional digital museum dedicated to documenting and celebrating Nigeria's creative history across four disciplines: Photography, Music, Fashion, and Design. Your goal is to create an engaging digital experience that brings the country's creative heritage to life, making it accessible and relevant to a new generation. You can choose to focus on one discipline or combine multiple disciplines in your interpretation. You have complete creative freedom over the visual identity, typography, imagery, layout, and interactions. Make the past feel impossible to ignore.
