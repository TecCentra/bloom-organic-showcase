const allowedTags = new Set([
  "a",
  "b",
  "blockquote",
  "br",
  "div",
  "em",
  "h1",
  "h2",
  "h3",
  "h4",
  "hr",
  "i",
  "li",
  "ol",
  "p",
  "span",
  "strong",
  "u",
  "ul",
]);

const removedTags = new Set(["iframe", "math", "object", "script", "style", "svg", "template"]);
const alignments = new Set(["left", "center", "right", "justify"]);

const isBoldFontWeight = (fontWeight: string): boolean =>
  /^(bold|bolder|[6-9]00)$/i.test(fontWeight.trim());

const isSafeLink = (href: string): boolean => {
  const trimmedHref = href.trim();
  if (/^(https?:|mailto:|tel:)/i.test(trimmedHref)) return true;
  return /^(#|\/|\.\/|\.\.\/)/.test(trimmedHref) && !trimmedHref.startsWith("//");
};

const sanitizeNode = (node: Node, output: HTMLElement): void => {
  if (node.nodeType === Node.TEXT_NODE) {
    output.appendChild(document.createTextNode(node.textContent || ""));
    return;
  }
  if (!(node instanceof Element)) return;

  const tagName = node.tagName.toLowerCase();
  if (removedTags.has(tagName)) return;

  if (!allowedTags.has(tagName)) {
    node.childNodes.forEach((child) => sanitizeNode(child, output));
    return;
  }

  const isBold = tagName === "b" || tagName === "strong" ||
    (tagName === "span" && isBoldFontWeight(node.style.fontWeight));
  const cleanElement = document.createElement(isBold ? "strong" : tagName);
  if (tagName === "a") {
    const href = node.getAttribute("href");
    if (href && isSafeLink(href)) {
      cleanElement.setAttribute("href", href);
      cleanElement.setAttribute("rel", "noopener noreferrer");
    }
  }

  const alignment = node.style.textAlign.toLowerCase();
  if (alignments.has(alignment)) {
    cleanElement.style.textAlign = alignment;
  }

  node.childNodes.forEach((child) => sanitizeNode(child, cleanElement));
  output.appendChild(cleanElement);
};

export const sanitizeBlogHtml = (content: string): string => {
  const trimmedContent = content.trim();
  if (!trimmedContent) return "";

  const parsed = new DOMParser().parseFromString(trimmedContent, "text/html");
  const sanitized = document.createElement("div");
  const hasHtml = /<\/?[a-z][^>]*>/i.test(trimmedContent);

  if (hasHtml) {
    parsed.body.childNodes.forEach((child) => sanitizeNode(child, sanitized));
    return sanitized.innerHTML;
  }

  trimmedContent.split(/\r?\n\s*\r?\n/).forEach((paragraph) => {
    const text = paragraph.trim();
    if (!text) return;
    const element = document.createElement("p");
    text.split(/\r?\n/).forEach((line, index) => {
      if (index > 0) element.appendChild(document.createElement("br"));
      element.appendChild(document.createTextNode(line));
    });
    sanitized.appendChild(element);
  });
  return sanitized.innerHTML;
};

export const blogContentToText = (content: string): string =>
  new DOMParser().parseFromString(sanitizeBlogHtml(content), "text/html").body.textContent?.trim() || "";
