import parse from "html-react-parser";
import { marked } from "marked";

// Configure marked for safe rendering
marked.setOptions({
  breaks: true,
  gfm: true,
});

/**
 * Renders content that could be either HTML (from TinyMCE) or Markdown (from fallback editor)
 * @param {string} content - The content to render
 * @returns {JSX.Element} - Rendered content
 */
export function renderContent(content) {
  if (!content) return null;

  // Check if content looks like HTML (contains HTML tags)
  const hasHtmlTags = /<[^>]*>/g.test(content);
  
  if (hasHtmlTags) {
    // Content is HTML (from TinyMCE)
    return parse(content);
  } else {
    // Content is likely Markdown (from fallback editor)
    const htmlContent = marked(content);
    return parse(htmlContent);
  }
}

/**
 * Converts Markdown to HTML for storage
 * @param {string} markdown - Markdown content
 * @returns {string} - HTML content
 */
export function markdownToHtml(markdown) {
  if (!markdown) return "";
  return marked(markdown);
}

/**
 * Checks if content is Markdown
 * @param {string} content - Content to check
 * @returns {boolean} - True if content appears to be Markdown
 */
export function isMarkdown(content) {
  if (!content) return false;
  
  // Check for common Markdown patterns
  const markdownPatterns = [
    /\*\*.*?\*\*/g,  // Bold
    /\*.*?\*/g,      // Italic
    /^#+\s/m,        // Headers
    /^[-*+]\s/m,     // Bullet lists
    /^\d+\.\s/m,     // Numbered lists
    /\[.*?\]\(.*?\)/g, // Links
  ];
  
  return markdownPatterns.some(pattern => pattern.test(content));
} 