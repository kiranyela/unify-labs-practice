(() => {
  const API_URL = "/api/posts";
  const state = {
    posts: [],
    isLoading: false,
    theme: "light",
  };
  const DOM = {
    themeToggle: document.getElementById("themeToggle"),
    newPostBtn: document.getElementById("newPostBtn"),
    postsGrid: document.getElementById("postsGrid"),
    loadingIndicator: document.getElementById("loadingIndicator"),
    gridView: document.getElementById("gridView"),
    singleView: document.getElementById("singleView"),
    singlePostContent: document.getElementById("singlePostContent"),
    backToGridBtn: document.getElementById("backToGridBtn"),
    editorModal: document.getElementById("editorModal"),
    editorForm: document.getElementById("editorForm"),
    cancelEditBtn: document.getElementById("cancelEditBtn"),
  };
  async function fetchPosts() {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Network response was not ok");
      state.posts = await response.json();
      renderGrid();
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      DOM.postsGrid.innerHTML =
        '<p class="error">Failed to load posts. Please try again later.</p>';
    } finally {
      setLoading(false);
    }
  }
  async function handleCreatePost(e) {
    e.preventDefault();
    const formData = new FormData(DOM.editorForm);
    const postData = Object.fromEntries(formData.entries());
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });
      if (!response.ok) throw new Error("Failed to create post");
      DOM.editorModal.close();
      DOM.editorForm.reset();
      await fetchPosts();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to publish post. Please check console for details.");
    }
  }
  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete");
      await fetchPosts();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to delete post.");
    }
  }
  function renderGrid() {
    DOM.postsGrid.innerHTML = "";
    const fragment = document.createDocumentFragment();
    if (state.posts.length === 0) {
      DOM.postsGrid.innerHTML = "<p>No posts found. Write the first one!</p>";
      return;
    }
    state.posts.forEach((post) => {
      const card = document.createElement("article");
      card.className = "post-card";
      const title = document.createElement("h3");
      title.textContent = post.title;
      const meta = document.createElement("p");
      meta.className = "post-meta";
      meta.textContent = `${post.category} 2 ${new Date(
        post.createdAt
      ).toLocaleDateString()}`;
      const excerpt = document.createElement("p");
      excerpt.className = "post-excerpt";
      excerpt.textContent = post.content.substring(0, 100) + "...";
      const actions = document.createElement("div");
      actions.className = "card-actions";
      const readBtn = document.createElement("button");
      readBtn.textContent = "Read More";
      readBtn.className = "btn-text";
      readBtn.onclick = () => renderSingleView(post);
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "btn-text danger";
      deleteBtn.onclick = () => handleDelete(post._id);
      actions.append(readBtn, deleteBtn);
      card.append(title, meta, excerpt, actions);
      fragment.appendChild(card);
    });
    DOM.postsGrid.appendChild(fragment);
  }
  function renderSingleView(post) {
    DOM.singlePostContent.innerHTML = "";
    const title = document.createElement("h2");
    title.textContent = post.title;
    const meta = document.createElement("p");
    meta.className = "post-meta";
    meta.textContent = `Published in ${post.category} on ${new Date(
      post.createdAt
    ).toLocaleDateString()}`;
    const body = document.createElement("div");
    body.className = "post-body";
    post.content.split("\n").forEach((paragraph) => {
      if (paragraph.trim()) {
        const p = document.createElement("p");
        p.textContent = paragraph;
        body.appendChild(p);
      }
    });
    DOM.singlePostContent.append(title, meta, body);
    DOM.gridView.classList.replace("view-active", "view-hidden");
    DOM.singleView.classList.replace("view-hidden", "view-active");
  }
  function setLoading(isLoading) {
    state.isLoading = isLoading;
    DOM.loadingIndicator.classList.toggle("hidden", !isLoading);
  }
  function setupEventListeners() {
    DOM.themeToggle.addEventListener("click", () => {
      state.theme = state.theme === "light" ? "dark" : "light";
      document.body.setAttribute("data-theme", state.theme);
      DOM.themeToggle.textContent =
        state.theme === "light" ? "\ud83c\udf19" : "\u2600\ufe0f";
    });
    DOM.newPostBtn.addEventListener("click", () => DOM.editorModal.showModal());
    DOM.cancelEditBtn.addEventListener("click", () => {
      DOM.editorModal.close();
      DOM.editorForm.reset();
    });
    DOM.backToGridBtn.addEventListener("click", () => {
      DOM.singleView.classList.replace("view-active", "view-hidden");
      DOM.gridView.classList.replace("view-hidden", "view-active");
    });
    DOM.editorForm.addEventListener("submit", handleCreatePost);
  }
  function init() {
    setupEventListeners();
    fetchPosts();
  }
  init();
})();
