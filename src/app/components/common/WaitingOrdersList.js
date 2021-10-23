import React from 'react';

import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

const WaitingOrdersList = ({ order }) => {
    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar/>
            </ListItemAvatar>
            <ListItemText
                primary={ 'Mobile# ' + order.Mobile }
                secondary={
                    <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary">
                            Diners: { order.Diners }
                        </Typography>
                    </React.Fragment>
                }
            />
        </ListItem>
    );
};

export default WaitingOrdersList;