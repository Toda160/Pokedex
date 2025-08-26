type PaginationProps = {
  page: number;
  total: number;
  pageSize?: number;
  onChange: (nextPage: number) => void;
};

export default function Pagination({
  page,
  total,
  pageSize = 20,
  onChange,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  if (totalPages <= 1) return null;

  const goTo = (p: number) => {
    const next = Math.min(totalPages, Math.max(1, p));
    if (next !== page) onChange(next);
  };

  return (
    <div className="pagination">
      <button
        className="page-btn"
        onClick={() => goTo(1)}
        disabled={page === 1}
      >
        «
      </button>
      <button
        className="page-btn"
        onClick={() => goTo(page - 1)}
        disabled={page === 1}
      >
        ‹
      </button>

      <span className="page-info">
        Page {page} of {totalPages}
      </span>

      <button
        className="page-btn"
        onClick={() => goTo(page + 1)}
        disabled={page === totalPages}
      >
        ›
      </button>
      <button
        className="page-btn"
        onClick={() => goTo(totalPages)}
        disabled={page === totalPages}
      >
        »
      </button>
    </div>
  );
}
