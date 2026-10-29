# Lecture markdown

A lecture is markdown stored on the lecture row. The YouTube video and the exercise button are commands in that markdown. The page turns those commands into HTML when it renders the lecture. The database keeps the markdown.

The table shapes for courses, lectures, users, and comments are decided in a separate schema discussion. This spec is the constraint that discussion and the later migration have to satisfy. It does not add tables.

## Lecture list

The course outline in `README.md` stays as written. These are the lecture titles, in order:

1. The main challenge of any visual artist
2. Composition and Measuring
3. Light, Shadow & Value
4. Light, Shadow & Value: Multiple Objects
5. Light, Shadow & Value: Simplifying Real Images
6. Studying old masters

The bullets under those titles in the README are author notes. They are not the lecture body. Each body is written later as markdown.

Each lecture page shows that markdown: the video where the author placed it, the prose, one exercise, and one button that opens the app on a gallery image. The YouTube description links to the lecture URL below, so a viewer from YouTube lands on that lecture.

## Storage

The lecture body is the markdown string. Rendered HTML is not stored.

A command is one whole line:

```
::youtube dQw4w9WgXcQ
::open data/image_gallery/simple_shapes/sphere.jpg
```

`::youtube` takes a YouTube video id. `::open` takes the gallery image `file_path` from `frontend/js/gallery.js`. That path is the image's identifier. The same filename exists under more than one gallery group, so a short name is not an identifier.

The writing convention is one `::youtube` line and one `::open` line per lecture. The renderer does not count them. A later widget is another command, added to the allowlist below. Anything else stays text.

## Slug

On create, the lecture slug is the title in lowercase, with every run of non-alphanumeric characters replaced by one hyphen, and hyphens trimmed from the ends.

`Light, Shadow & Value: Multiple Objects` becomes `light-shadow-value-multiple-objects`.

Changing the title does not change the slug. The YouTube description points at the slug.

## Lecture URL

The public lecture URL is `/?lecture=<slug>` on the site origin. Opening it shows the course and loads that lecture. An unknown slug shows the course with a short missing-lecture message.

The course nav link is commented out today. Implementing this URL makes the course reachable, and the nav link is shown as part of that work.

## Rendering

The API returns the markdown. The browser renders it. The gallery list lives in `frontend/js/gallery.js`, so the image command is resolved there, next to the markdown converter in `frontend/js/course.js`.

Order:

1. Find command lines in the markdown.
2. Replace each recognized command with a placeholder that the markdown converter leaves untouched.
3. Run the markdown converter on the remaining text.
4. Replace each placeholder with HTML.

A line is recognized only when it is exactly `::` plus an allowlisted name, one space, and the argument. No other punctuation.

`::youtube` accepts an argument of eleven characters from `A–Z`, `a–z`, `0–9`, `_`, and `-`. The HTML is an iframe whose `src` is `https://www.youtube.com/embed/` plus that id. The id is the only part of the command inserted into the URL.

`::open` accepts an argument that equals one image `file_path` in the gallery. The HTML is a link labeled "Open in the app". Its href is `/?image=` plus that path, URL-encoded. The path written into the href is the path from the gallery entry, after the match.

A command line that fails these checks is shown as text. It is not turned into an element, and the raw argument is not concatenated into HTML.

## Opening an image

`/?image=<file_path>` opens the app and loads that gallery image. Every processing module is turned off, then the image is rendered. Turning modules on is the exercise.

An unknown path opens the app with no image and leaves the modules off.

## Later, and not this work

Flip and rotate, the luminance value scale, color grading, and drawing shapes stay notes in the README. Comments and accounts stay out until the schema discussion. This spec does not seed lecture bodies from the README bullets.
