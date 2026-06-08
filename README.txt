ADARSH YASA — VIDEO EDITOR PORTFOLIO
=====================================

Stack: HTML5 + CSS3 + Vanilla JS + Bootstrap 5 (CDN) + AOS + Font Awesome.

Structure:
  portfolio/
    index.html
    css/style.css
    js/script.js
    assets/
      images/  (profile photos)
      videos/  (drop your edits here & link in js/script.js)
      cv/      (CV file used by the Download CV button)

How to run:
  Just open index.html in any browser. No build step, no server required.
  (For best results with the modal & some browsers, serve via:
   python3 -m http.server 8080  then visit http://localhost:8080)

Customize:
  - Replace photos in assets/images/.
  - Add real project thumbnails into assets/images/ and edit the
    `projects` array in js/script.js (change the `img` to your file path).
  - Update text in index.html (About, Contact, Experience).
  - Swap Unsplash placeholder thumbnails for your own work.
  - Replace the CV PNG in assets/cv/ with your real CV/Resume PDF and
    update the href in the Hero + About "Download CV" buttons.

Sections:
  Hero · About · Skills · Experience · Projects (filterable) ·
  Services · Software · Testimonials · Contact · Footer

Color palette:
  bg #0A0A0A · primary #7C3AED · secondary #06B6D4 · accent #FF6B35
