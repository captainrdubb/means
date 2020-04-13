import React from 'react';
import Typography from '@material-ui/core/Typography';

//LOGO IS AT THE ROOT OF SOURCE TO AVOID PULLING IN EXTRANEOUS DEPENDENCIES DURING AUTH APP BUILD
const Logo = () => {
  return (
    <Typography color='textSecondary' variant='h3'>
      MEANS
    </Typography>
  );
};

export default Logo;
