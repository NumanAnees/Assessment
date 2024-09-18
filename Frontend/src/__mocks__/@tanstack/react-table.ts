export const useReactTable = jest.fn(() => ({
  getHeaderGroups: jest.fn(() => []),
  getRowModel: jest.fn(() => ({ rows: [] })),
  getState: jest.fn(() => ({ pagination: { pageIndex: 0, pageSize: 10 } })),
  setPageIndex: jest.fn(),
  getCanPreviousPage: jest.fn(() => true),
  getCanNextPage: jest.fn(() => true),
  getPageCount: jest.fn(() => 5),
  nextPage: jest.fn(),
  previousPage: jest.fn(),
  setPageSize: jest.fn(),
}));

export const getCoreRowModel = jest.fn();
export const getPaginationRowModel = jest.fn();
export const getSortedRowModel = jest.fn();
