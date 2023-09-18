import Card, { CardProps } from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Post, User } from 'resources/types';
import { useAppSelector } from 'hooks';
import { RootState } from 'store';
import formatDate from 'utils';
import CardMenu from './CardMenu';

export interface RecipeReviewCardProps extends CardProps {
  post: Post,
}

function RecipeReviewCard(props: RecipeReviewCardProps) {
  const { post } = props;
  const { profile } = useAppSelector((state: RootState) => state.user);
  const profileId = profile?.id || null;
  const { name, surname } = profile as User;
  const {
    title, description, createdAt, userId,
  } = post;
  return (
    <Card
      sx={{
        minHeight: 200,
        maxHeight: 220,
        background: '#FFFFF5',
      }}
    >
      <CardHeader
        avatar={(
          <Avatar sx={{ bgcolor: 'primary.light' }} aria-label="recipe">
            {name.charAt(0).concat(surname.charAt(0))}
          </Avatar>
        )}
        action={profileId === userId ? <CardMenu post={post} /> : null}
        title={title}
        subheader={formatDate(createdAt)}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default RecipeReviewCard;
