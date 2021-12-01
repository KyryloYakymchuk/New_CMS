import { FC, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import { FieldProps } from 'formik';
import { containerMapStyle } from './styled';

interface IProps extends FieldProps {
    coordinates: {
        lat: number;
        lng: number;
    };
}

export const MapFormik: FC<IProps> = ({ form, field, coordinates }) => {
    const { lat, lng } = coordinates;
    const [currentMarker, setCurrentMarker] = useState<number[]>([lat, lng ]);
    const [center] = useState({ lat, lng });

    const onChangeMarker = (e: google.maps.MapMouseEvent) => {
        const coordinateX = e.latLng?.lat();
        const coordinateY = e.latLng?.lng();
        if (coordinateX && coordinateY) {
            setCurrentMarker([coordinateX, coordinateY]);
            form.setFieldValue(field.name, [coordinateX, coordinateY]);
        }
    };
    
    return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string}>
            <GoogleMap
                mapContainerStyle={containerMapStyle}
                center={center}
                zoom={8}
                onClick={onChangeMarker}
            >
                <Marker
                    position={{
                        lat: currentMarker[0],
                        lng: currentMarker[1]
                    }}
                />
            </GoogleMap>
        </LoadScript>
    );
};
