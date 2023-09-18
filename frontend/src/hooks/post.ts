import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from 'hooks';
import { queries, ROWS_PER_PAGES } from 'resources/constants';
import { getPosts as getPostsThunk } from 'store/post';

function usePost(): { dependencyArray: Array<string | number | null>, getPosts: (() => void) } {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const [defaultSize] = ROWS_PER_PAGES;

  const ownerId = Number(searchParams.get(queries.OWNER_ID)) || null;
  const offset = Number(searchParams.get(queries.PAGE)) || 0;
  const limit = Number(searchParams.get(queries.SIZE)) || defaultSize;

  const dependencyArray = [
    ownerId,
    offset,
    limit,
  ];

  const getPosts = useCallback(
    () => dispatch(getPostsThunk({
      limit,
      offset,
      ownerId,
    }))
      .unwrap(),
    [...dependencyArray],
  );

  return { dependencyArray, getPosts };
}

export { usePost };
