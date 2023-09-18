import { useSearchParams } from 'react-router-dom';
import {
  MouseEvent, ChangeEvent, useCallback, useMemo,
} from 'react';
import { Grid, TablePagination, Theme } from '@mui/material';

import { queries, ROWS_PER_PAGES } from 'resources/constants';

const [defaultSize] = ROWS_PER_PAGES;

function Pagination(props: { count: number }) {
  const { count } = props;
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, size] = useMemo(() => ([
    Number(searchParams.get(queries.PAGE)) || 0,
    Number(searchParams.get(queries.SIZE)) || defaultSize,
  ]), [searchParams]);

  const onPageChange = useCallback(
    (_: MouseEvent<HTMLButtonElement, globalThis.MouseEvent> | null, selectedPage: number) => {
      searchParams.set(queries.PAGE, String(selectedPage));
      setSearchParams(searchParams);
    },
    [searchParams],
  );

  const onRowsPerPageChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;
      searchParams.delete(queries.PAGE);
      searchParams.set(queries.SIZE, value);
      setSearchParams(searchParams);
    },
    [searchParams],
  );

  return (
    <Grid
      px={2}
      py={0.5}
      sx={(theme: Theme) => ({
        borderTopWidth: 1,
        borderTopStyle: 'solid',
        borderTopColor: theme.palette.grey[300],
        width: 'inherit',
      })}
    >
      <TablePagination
        page={page}
        count={count}
        rowsPerPage={size}
        component="div"
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={ROWS_PER_PAGES}
      />
    </Grid>
  );
}

export default Pagination;
