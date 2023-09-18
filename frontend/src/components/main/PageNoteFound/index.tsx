import { Box, Theme, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import NotFoundImage from 'assets/note_found.png';

function PageNoteFound() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
    >
      <Typography
        sx={(theme: Theme) => ({
          fontSize: 200,
          lineHeight: 1,
          fontWeight: 'bold',
          color: `${theme.palette.secondary.main}`,
        })}
      >
        404
      </Typography>
      <Typography
        sx={(theme: Theme) => ({
          fontSize: 50,
          fontWeight: 'bold',
          color: `${theme.palette.secondary.main}`,
        })}
      >
        Page note found
      </Typography>
      <Box
        sx={{
          width: 200,
          height: 300,
          marginBottom: 10,
          backgroundImage: `url(${NotFoundImage})`,
        }}
      />
      <Link to=".">
        Back
      </Link>
    </Box>
  );
}

export default PageNoteFound;
