import { Button } from '@mui/material';
import { CircularProgress } from '@material-ui/core';

export const Loader = {
    LoaderCircularButton: (
        <Button size="large" color="inherit" variant="contained" type="button">
            <CircularProgress color="inherit" size={30} />
        </Button>
    )
};
