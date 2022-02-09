import React from 'react';
import GoogleMapReact from 'google-map-react';

// useMediaQuery for more mobile responsive
import { Paper, Typography, useMediaQuery} from "@material-ui/core";
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';

const Map = ({ setCoordinates, setBounds, coordinates, places }) => {
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width: 600px)');

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyBiFnUb-gpE8v5sTEpLF6rr_yOXY8ltCFs' }}
                defaultCenter={{ lat: 0, lng: 0 }}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={''}
                onChange={(e) => {
                    console.log(e);
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng })
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
                }}
                onChildClick={''}
            >
                {places?.map((place, index) => (
                    <div
                        className={classes.markerContainer}
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}
                        key={index}
                    >
                        {
                            isDesktop ? (
                                    <Paper elevation={3} className={classes.paper}>
                                        <Typography gutterBottom className={classes.typography} variant="subtitle2">
                                            {place.name}
                                        </Typography>
                                        <img
                                            className={classes.pointer}
                                            src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                                            alt={place.name}
                                        />
                                        <Rating size="small" value={Number(place.rating)} readOnly />
                                    </Paper>
                                )
                                : (
                                <LocationOnOutlinedIcon color="primary" fonsSize="large" />
                                )

                        }
                    </div>
                ))}
            </GoogleMapReact>
        </div>
    );
}

export default Map;