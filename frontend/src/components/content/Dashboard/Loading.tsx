import { Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function Loading() {
  return (
    <Stack spacing={1} minHeight="200" maxHeight="220">
      <Grid container display="flex" flexDirection="row" flexWrap="nowrap" padding="16px">
        <Skeleton
          variant="circular"
          width={40}
          height={40}
          sx={{
            marginRight: '16px',
            minWidth: 40,
            minHeight: 40,
          }}
        />
        <Skeleton variant="rectangular" height={40} width="inherit" />
      </Grid>
      <Grid padding="0 16px 16px 16px" minWidth={140} minHeight={140}>
        <Skeleton
          variant="rounded"
          width="inherit"
          height="inherit"
          sx={{
            minWidth: 140,
            minHeight: 140,
          }}
        />
      </Grid>
    </Stack>
  );
}
