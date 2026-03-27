/**
 * Renders a TinaCMS rich-text AST to an HTML string.
 * No React required.
 */

function escape(str: string): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderNode(node: any): string {
  if (!node) return "";

  // Leaf / text node
  if (node.type === "text") {
    let text = escape(node.text ?? "");
    if (node.bold) text = `<strong>${text}</strong>`;
    if (node.italic) text = `<em>${text}</em>`;
    if (node.underline) text = `<u>${text}</u>`;
    if (node.code) text = `<code>${text}</code>`;
    return text;
  }

  const children = (node.children ?? []).map(renderNode).join("");

  switch (node.type) {
    case "root":
      return children;
    case "p":
      return `<p>${children}</p>`;
    case "h1":
      return `<h1>${children}</h1>`;
    case "h2":
      return `<h2>${children}</h2>`;
    case "h3":
      return `<h3>${children}</h3>`;
    case "h4":
      return `<h4>${children}</h4>`;
    case "h5":
      return `<h5>${children}</h5>`;
    case "h6":
      return `<h6>${children}</h6>`;
    case "ul":
      return `<ul>${children}</ul>`;
    case "ol":
      return `<ol>${children}</ol>`;
    case "li":
      return `<li>${children}</li>`;
    case "lic": // list item content
      return children;
    case "blockquote":
      return `<blockquote>${children}</blockquote>`;
    case "code_block":
      return `<pre><code>${children}</code></pre>`;
    case "hr":
      return `<hr />`;
    case "break":
      return `<br />`;
    case "a": {
      const href = escape(node.url ?? "");
      return `<a href="${href}" target="_blank" rel="noopener noreferrer">${children}</a>`;
    }
    case "img": {
      const src = escape(node.url ?? "");
      const alt = escape(node.alt ?? "");
      const caption = node.caption ? `<figcaption>${escape(node.caption)}</figcaption>` : "";
      return `<figure><img src="${src}" alt="${alt}" />${caption}</figure>`;
    }
    default:
      // Unknown node — just render children
      return children;
  }
}

export function renderRichText(ast: any): string {
  if (!ast) return "";
  return renderNode(ast);
}
