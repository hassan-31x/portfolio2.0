export type ArticleMathBlock = { blockType: 'articleMath'; source: string; html: string }
export type ArticleTableBlock = { blockType: 'articleTable'; headers: string[]; rows: string[][] }

export function ArticleMath({ html }: ArticleMathBlock) {
  // Generated from reviewed Markdown by KaTeX with trust disabled, never raw user HTML.
  return (
    <div
      className="not-prose my-8 max-w-full overflow-x-auto py-2"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export function ArticleTable({ headers, rows }: ArticleTableBlock) {
  return (
    <div className="not-prose my-8 max-w-full overflow-x-auto rounded-md border border-neutral-200 dark:border-neutral-800">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-neutral-100 dark:bg-neutral-900">
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col" className="px-4 py-3 font-semibold text-primary">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-t border-neutral-200 dark:border-neutral-800">
              {row.map((cell, column) =>
                column === 0 ? (
                  <th key={column} scope="row" className="px-4 py-3 font-medium text-primary">
                    {cell}
                  </th>
                ) : (
                  <td key={column} className="px-4 py-3 tabular-nums text-secondary">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
