import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './card.css'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function JobDescriptionCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width:"auto"}}>
      <CardHeader
        title="UI/UX Developer"
        subheader="July, 2023"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
Skills Required for a UI/UX Designer Job Soft Skills:
• Ability to work both in a group and independently
• Outstanding verbal and written communication abilities
• Multitasking
• Time administration
• A bachelor's degree in design, computer science, or a related field is required.
• Work experience as a UI/UX designer or in a related role is required.
• Portfolio of work in UI/UX design for mobile and web platforms.
• Excellent knowledge of Sketch, InVision, HTML, Visio, iOS, Android, Adobe Creative Suite, and other software.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Weights:</Typography>
          <Typography >
          Education: 0.4
          </Typography>
          <Typography>
          Experience:0.2
          </Typography>
          <Typography >
          Skills:0.5
          </Typography>
          <Typography >
          Projects:0.5
          </Typography>
          <Typography >
          Achievements:0.5
          </Typography>
          <Typography >
          Coding Profile(s):0.5
          </Typography>
          <Typography >
          Test Score:0.5
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
