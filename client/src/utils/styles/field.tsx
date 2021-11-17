import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        // without !important margin not working
        margin: '10px 0 !important',
        '& label.Mui-focused': {
            color: 'black'
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'rgb(122, 122, 122);'
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'grey'
            },
            '&:hover fieldset': {
                borderColor: 'black'
            },
            '&.Mui-focused fieldset': {
                borderColor: 'black'
            }
        },
        '& input[type="date"]::-webkit-calendar-picker-indicator': {
            background: 'transparent',
            bottom: '0',
            color: 'transparent',
            cursor: 'pointer',
            height: 'auto',
            left: '0',
            position: 'absolute',
            right: '0',
            top: '0',
            width: 'auto'
        }
    }
}));
