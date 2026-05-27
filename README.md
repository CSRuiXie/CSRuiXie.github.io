# Rui Xie Academic Homepage

This is a simple static academic homepage that can be hosted directly with
GitHub Pages.

## Edit Your Information

Open `index.html` and replace the placeholder content:

- `your.email@example.com`
- `Your University or Lab`
- `City, Country`
- Google Scholar, GitHub, LinkedIn, and CV links
- Biography, publications, and project descriptions

If you want to add a real CV, create an `assets` folder and place your PDF at:

```text
assets/cv.pdf
```

## Preview Locally

From this folder, run:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Deploy With GitHub Pages

Option A: user site, recommended if this is your main personal homepage.

1. Create a GitHub repository named `<your-github-username>.github.io`.
2. Upload all files in this folder to that repository.
3. Open `https://<your-github-username>.github.io` after GitHub finishes
   publishing.

Option B: project site.

1. Create any GitHub repository, for example `academic-homepage`.
2. Upload all files in this folder.
3. Go to repository `Settings` -> `Pages`.
4. Set `Source` to `Deploy from a branch`.
5. Select branch `main` and folder `/root`.
6. Open the GitHub Pages URL shown on that page.

## File Structure

```text
academic-homepage/
  index.html
  styles.css
  script.js
  README.md
```
