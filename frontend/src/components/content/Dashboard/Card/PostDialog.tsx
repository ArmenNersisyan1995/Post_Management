import { useCallback, useMemo } from 'react';
import {
  Box,
  Grid,
  Theme,
  Avatar,
  Button,
  Container,
  TextField,
  CssBaseline,
  CircularProgress,
  DialogTitle,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Formik, FormikHelpers } from 'formik';

import { RootState } from 'store';
import { Post } from 'resources/types';
import { updatePost, createPost } from 'store/post';
import DialogSlide from 'components/shared/Dialog';
import { updatePostSchema } from 'resources/scheme';
import { useAppDispatch, useAppSelector, usePost } from 'hooks';

interface PostDialogProps {
  open: boolean,
  onClose: () => void,
  post?: Post
}

interface PostForm {
  title: string,
  description: string,
}

function PostDialog(props: PostDialogProps) {
  const { open, onClose, post } = props;
  const dispatch = useAppDispatch();
  const { getPosts } = usePost();
  const postState = useAppSelector((state: RootState) => state.post);
  const { data } = postState;
  const { rows } = data;

  const postFields = useMemo(
    () => (
      rows.find((row: Post) => row.id === post?.id)
    ),
    [rows],
  );

  const initialValues: PostForm = {
    title: postFields?.title || '',
    description: postFields?.description || '',
  };

  const onSubmit = useCallback(
    (values: PostForm, helpers: FormikHelpers<PostForm>) => {
      (post ? (
        dispatch(updatePost({ id: post.id, data: values }))
      ) : (
        dispatch(createPost(values))
      ))
        ?.unwrap()
        .finally(() => {
          onClose();
          getPosts();
          helpers.resetForm();
          helpers.setSubmitting(false);
        });
    },
    [post],
  );

  return (
    <Grid>
      <DialogSlide open={open} onClose={onClose}>
        <DialogTitle sx={(theme: Theme) => ({
          color: theme.palette.secondary.main,
          display: 'flex',
          justifyContent: 'center',
        })}
        >
          {post ? 'Edit Post' : 'Create Post'}
        </DialogTitle>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'success.light' }}>
              {post ? <EditIcon /> : <AddCircleIcon />}
            </Avatar>
            <Formik
              onSubmit={onSubmit}
              initialValues={initialValues}
              validationSchema={updatePostSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit} noValidate>
                  <Grid container>
                    <TextField
                      required
                      color="info"
                      sx={{ marginTop: 3 }}
                      fullWidth
                      name="title"
                      label="Title"
                      onBlur={handleBlur}
                      value={values.title}
                      onChange={handleChange}
                      helperText={touched.title && errors.title}
                      error={touched.title && Boolean(errors.title)}
                    />
                    <TextField
                      required
                      color="info"
                      sx={{ marginTop: 3 }}
                      fullWidth
                      name="description"
                      label="Description"
                      onBlur={handleBlur}
                      value={values.description}
                      onChange={handleChange}
                      helperText={touched.description && errors.description}
                      error={touched.description && Boolean(errors.description)}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      color="success"
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      endIcon={isSubmitting && (
                        <CircularProgress
                          size={18}
                          sx={(theme: Theme) => ({ color: theme.palette.info.contrastText })}
                        />
                      )}
                    >
                      Submit
                    </Button>
                  </Grid>
                </form>
              )}
            </Formik>
          </Box>
        </Container>
      </DialogSlide>
    </Grid>
  );
}

export default PostDialog;

PostDialog.defaultProps = {
  post: null,
};
