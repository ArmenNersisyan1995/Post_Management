import { useSearchParams } from 'react-router-dom';
import {
  ChangeEvent, useEffect, useMemo, useState,
} from 'react';
import { PostAdd } from '@mui/icons-material';
import {
  FormControlLabel, Grid, IconButton, Switch, Theme,
} from '@mui/material';

import { RootState } from 'store';
import { usePost } from 'hooks/post';
import { useAppSelector } from 'hooks';
import { Post } from 'resources/types';
import Pagination from 'components/main/Pagination';
import RecipeReviewCard from 'components/content/Dashboard/Card';
import { queries } from 'resources/constants';
import PostDialog from './Card/PostDialog';
import CardLoading from './Loading';

function Dashboard() {
  const { dependencyArray, getPosts } = usePost();
  const [searchParams, setSearchParams] = useSearchParams();
  const postState = useAppSelector((state: RootState) => state.post);
  const profile = useAppSelector((state: RootState) => state.user)?.profile;
  const { loading, data } = postState;
  const { rows, count } = data;
  const [openPostDialog, setOpenPostDialog] = useState(false);

  useEffect(
    () => {
      getPosts();
    },
    [...dependencyArray],
  );

  const checked = useMemo(() => (
    Boolean(Number(searchParams.get(queries.OWNER_ID)) || null)
  ), [searchParams]);

  const handleOpenEditDialog = () => {
    setOpenPostDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenPostDialog(false);
  };

  const handleChangeSwitch = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target?.checked) {
      searchParams.set(queries.OWNER_ID, String(profile?.id));
      setSearchParams(searchParams);
    } else {
      searchParams.delete(queries.OWNER_ID);
      setSearchParams(searchParams);
    }
  };

  return (
    <Grid
      container
      height="100%"
      display="flex"
      direction="column"
    >
      <Grid
        item
        container
        xs={10}
        overflow="auto"
        sx={(theme: Theme) => ({
          backgroundColor: theme.palette.secondary.light,
        })}
        spacing={2}
      >
        {loading ? (
          Array(20).fill('').map((_, index) => (
            <Grid
              item
              p={1}
              sm={6}
              md={4}
              lg={4}
              xl={3}
              xs={12}
              // eslint-disable-next-line react/no-array-index-key
              key={index}
            >
              <CardLoading />
            </Grid>
          ))
        ) : (
          rows.map((post: Post) => (
            <Grid
              item
              p={1}
              sm={6}
              md={4}
              lg={4}
              xl={3}
              xs={12}
              key={post.id}
            >
              <RecipeReviewCard post={post} />
            </Grid>
          ))
        )}

      </Grid>
      <Grid xs={2} item container alignItems="center" flexWrap="nowrap">
        <IconButton color="success" onClick={handleOpenEditDialog}>
          <PostAdd fontSize="large" />
        </IconButton>
        <FormControlLabel
          control={(
            <Switch
              checked={checked}
              onChange={handleChangeSwitch}
              name="userPosts"
            />
          )}
          label="User Posts"
          sx={{
            '.MuiFormControlLabel-label': {
              width: 'max-content',
            },
          }}
        />
        {!!count && <Pagination count={count} />}
      </Grid>

      {openPostDialog && (
        <PostDialog
          open={openPostDialog}
          onClose={handleCloseEditDialog}
        />
      )}
    </Grid>
  );
}

export default Dashboard;
