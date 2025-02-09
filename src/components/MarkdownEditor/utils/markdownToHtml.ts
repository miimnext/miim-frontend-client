// utils/markdownToHtml.ts
export const markdownToHtml = (
  markdown: string,
  styles: { [key: string]: string }
): string => {
  return markdown
    .replace(/^##### (.*$)/gim, "<h5 class='text-lg font-semibold'>$1</h5>")
    .replace(/^#### (.*$)/gim, "<h4 class='text-xl font-semibold'>$1</h4>")
    .replace(/^### (.*$)/gim, "<h3 class='text-2xl font-semibold'>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2 class='text-3xl font-semibold'>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1 class='text-4xl font-semibold'>$1</h1>")
    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
    .replace(/\*(.*?)\*/g, "<i>$1</i>")
    .replace(/```([\s\S]*?)```/g, (match, p1) => {
      return `<pre class="${styles.customCodeBlock}"><code>${p1}</code></pre>`;
    })
    .replace(/`(.*?)`/g, "<code>$1</code>")
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/^- (.*$)/gim, "<ul><li>$1</li></ul>")
    .replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>")
    .replace(/\n/g, "<br>");
};
