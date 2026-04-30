// static/scripts/parsetitle.js
var GITHUB_USER = "TheGreenSlash";
var REPO_NAME = "blog-content";
var REPO_PATH = "";
var BRANCH = "main";
var blogContainer = document.querySelector(".mt-5");
async function getMarkdownFiles() {
  const url = REPO_PATH ? `https://api.github.com/repos/${GITHUB_USER}/${REPO_NAME}/contents/${REPO_PATH}?ref=${BRANCH}` : `https://api.github.com/repos/${GITHUB_USER}/${REPO_NAME}/contents?ref=${BRANCH}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`GitHub API Error: ${response.status}`);
  }
  const files = await response.json();
  if (!Array.isArray(files)) {
    throw new Error("GitHub API did not return an array");
  }
  return files.filter((file) => file.name.endsWith(".md"));
}
async function fetchMarkdown(downloadUrl) {
  const response = await fetch(downloadUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch markdown file");
  }
  return await response.text();
}
function parseFrontmatter(markdown) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = markdown.match(frontmatterRegex);
  if (!match) {
    return {
      title: "Untitled",
      date: "",
      slug: ""
    };
  }
  const frontmatter = match[1];
  const lines = frontmatter.split("\n");
  const data = {};
  lines.forEach((line) => {
    const [key, ...valueParts] = line.split(":");
    if (!key) return;
    data[key.trim()] = valueParts.join(":").trim();
  });
  return {
    title: data.title || "Untitled",
    date: data.date || "",
    slug: data.slug || ""
  };
}
function renderBlogs(posts) {
  blogContainer.innerHTML = "";
  posts.forEach((post) => {
    const wrapper = document.createElement("div");
    wrapper.className = "mt-8";
    wrapper.innerHTML = `
      <a href="blog-detail.html?slug=${post.slug}">
        <h1 class="text-2xl font-bold underline hover:opacity-80 transition">
          ${post.title}
        </h1>
      </a>

      <p class="opacity-70">
        ${post.date}
      </p>
    `;
    blogContainer.appendChild(wrapper);
  });
}
async function initBlogsPage() {
  try {
    const files = await getMarkdownFiles();
    const posts = [];
    for (const file of files) {
      const markdown = await fetchMarkdown(file.download_url);
      const frontmatter = parseFrontmatter(markdown);
      posts.push(frontmatter);
    }
    posts.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    renderBlogs(posts);
  } catch (error) {
    console.error(error);
    blogContainer.innerHTML = `
      <p class="text-error">
        Failed to load blogs.
      </p>
    `;
  }
}
window.addEventListener("DOMContentLoaded", initBlogsPage);
