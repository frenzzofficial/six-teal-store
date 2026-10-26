interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  noun: string;
  onChange: (page: number) => void;
}

const Pagination = ({
  page,
  totalPages,
  total,
  limit,
  noun,
  onChange,
}: PaginationProps) => {
  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <nav className="dash-pagination" aria-label={`${noun} pages`}>
      <span>
        Showing {from}–{to} of {total} {noun}
      </span>
      <span className="dash-pagination__controls">
        <button
          type="button"
          className="dash-btn dash-btn--sm"
          disabled={page <= 1}
          onClick={() => onChange(page - 1)}
        >
          Previous
        </button>
        <span className="dash-pagination__page" aria-current="page">
          {page} / {totalPages}
        </span>
        <button
          type="button"
          className="dash-btn dash-btn--sm"
          disabled={page >= totalPages}
          onClick={() => onChange(page + 1)}
        >
          Next
        </button>
      </span>
    </nav>
  );
};

export default Pagination;
