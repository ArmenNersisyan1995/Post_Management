import { useRef, useState } from 'react';
import { Button, Grid, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch, usePost } from 'hooks';
import { deletePost } from 'store/post/thunk';
import { Post } from 'resources/types';
import PostDialog from './PostDialog';

interface CardMenuProps {
  post: Post
}

export default function CardMenu(props: CardMenuProps) {
  const dispatch = useAppDispatch();
  const buttonRef = useRef(null);
  const { getPosts } = usePost();
  const { post } = props;
  const [anchorEl, setAnchorEl] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const handleClick = () => {
    setAnchorEl(!anchorEl);
  };

  const handleDelete = () => {
    dispatch(deletePost(post.id))
      .unwrap()
      .then(() => getPosts());
  };

  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  return (
    <Grid>
      <IconButton
        aria-label="settings"
        ref={buttonRef}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Popper
        placement="bottom-end"
        open={Boolean(anchorEl)}
        anchorEl={buttonRef?.current}
      >
        <Paper>
          <Grid container>
            <Grid item width="inherit" display="flex" justifyContent="end">
              <IconButton onClick={handleClick}>
                <CloseIcon />
              </IconButton>
            </Grid>
            <Grid
              container
              item
              padding={2}
              display="flex"
              spacing={2}
              justifyContent="space-around"
            >
              <Button
                color="error"
                onClick={handleDelete}
                startIcon={<DeleteIcon color="error" />}
              >
                Delete
              </Button>
              <Button
                color="success"
                onClick={handleOpenEditDialog}
                startIcon={(
                  <EditIcon
                    color="success"
                  />
                )}
              >
                Edit
              </Button>
              {openEditDialog && (
                <PostDialog
                  open={openEditDialog}
                  onClose={handleCloseEditDialog}
                  post={post}
                />
              )}
            </Grid>
          </Grid>
        </Paper>
      </Popper>
    </Grid>
  );
}
