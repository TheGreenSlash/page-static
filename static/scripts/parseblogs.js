const GITHUB_USER = "TheGreenSlash";
const REPO_NAME = "blog-content";
const REPO_PATH = "";
const BRANCH = "main";

const titleEl = document.getElementById("blog-title");
const dateEl = document.getElementById("blog-date");
const contentEl = document.getElementById("blog-content");

/*
=========================================
GET SLUG
=========================================
*/
function getSlug() {
  return new URLSearchParams(window.location.search).get("slug");
}

/*
=========================================
FETCH FILES
=========================================
*/
async function getFiles() {
  const url = REPO_PATH
    ? `https://api.github.com/repos/${GITHUB_USER}/${REPO_NAME}/contents/${REPO_PATH}?ref=${BRANCH}`
    : `https://api.github.com/repos/${GITHUB_USER}/${REPO_NAME}/contents?ref=${BRANCH}`;

  const res = await fetch(url);
  const data = await res.json();

  return data.filter((f) => f.name.endsWith(".md"));
}

/*
=========================================
FETCH MARKDOWN
=========================================
*/
async function fetchMarkdown(url) {
  const res = await fetch(url);
  return await res.text();
}

/*
=========================================
PARSE FRONTMATTER
=========================================
*/
function parseMarkdown(md) {
  const regex = /^---\n([\s\S]*?)\n---/;
  const match = md.match(regex);

  let data = {};
  let content = md;

  if (match) {
    match[1].split("\n").forEach((line) => {
      const [k, ...v] = line.split(":");
      if (!k) return;
      data[k.trim()] = v.join(":").trim();
    });

    content = md.replace(regex, "").trim();
  }

  return {
    title: data.title || "Untitled",
    date: data.date || "",
    slug: data.slug || "",
    content,
  };
}

/*
=========================================
MARKDOWN → HTML
=========================================
*/
function mdToHTML(md) {
  return md
    .replace(/^### (.*)$/gim, "<h3>$1</h3>")
    .replace(/^## (.*)$/gim, "<h2>$1</h2>")
    .replace(/^# (.*)$/gim, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/gim, "<em>$1</em>")
    .replace(/\n/gim, "<br>");
}

/*
=========================================
FIND POST
=========================================
*/
async function findPost(slug) {
  const files = await getFiles();

  for (const file of files) {
    const md = await fetchMarkdown(file.download_url);
    const post = parseMarkdown(md);

    if (post.slug === slug) return post;
  }

  return null;
}

/*
=========================================
RENDER UI
=========================================
*/
function render(post) {
  titleEl.textContent = post.title;
  dateEl.textContent = post.date;
  contentEl.innerHTML = mdToHTML(post.content);
}

/*
=========================================
INIT
=========================================
*/
async function init() {
  const slug = getSlug();

  if (!slug) {
    contentEl.innerHTML = "<p>No blog selected</p>";
    return;
  }

  const post = await findPost(slug);

  if (!post) {
    contentEl.innerHTML = "<p>Blog not found</p>";
    return;
  }

  render(post);
}

window.addEventListener("DOMContentLoaded", init);
