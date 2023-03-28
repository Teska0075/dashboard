import { useContext } from 'react';
// import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';
import { TravelContext } from '../../../context/travelContext';

// ----------------------------------------------------------------------

// ProductList.propTypes = {
//   products: PropTypes.array.isRequired,
// };

export default function ProductList({ filteredTravel }) {
  // const { filteredTravel } = useContext(TravelContext);

  return (
    <Grid container spacing={3}>
      {filteredTravel?.map((travel) => (
        <Grid key={travel.id} item xs={12} sm={6} md={3}>
          <ShopProductCard travel={travel} />
        </Grid>
      ))}
    </Grid>
  );
}
