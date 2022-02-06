import React from 'react';

import Slider from '@mui/material/Slider';
import styled from 'styled-components';
import { AppData, Context } from '../index'
import { calculateTotal, calculateData } from '../helperFiles/sliderCalculator';

const SliderTool = styled(Slider)`
  margin-right: 20px;
  width: 225px;
`;

let maxVal: number;

interface PropTypes {
  row: AppData
}
/**
 * Manages value changes from Slider
 * @identifier { Event } event - mouse Event
 * @identifier { object } row - data for slider instance
 * @param { number } newVal - the new slider value
 */
function Slide(props: PropTypes) {
  const {  row  } = props;
  const [ total, data, changeData, changeTotal ] = React.useContext(Context);
  let [ value, setValue ] = React.useState(0);

  // this condition reflects a reset state
  if (value > 0 && total === 0) {
    setValue(0);
  }

  const handleChange = ( event: Event, newVal: number ) => {
    // Slider shouldn't move right if grand total has reached 100
    // thus, we create a max value born of the following:
    // value - previous slider value
    // total - sum of all slider values
    maxVal = 100 - total + value;

    // Only update the slider value & total value if: 
    // - the new value has not already been updated
    //    (the slider is able to fire multiple unchanged values)
    // - AND the new value is less than the max value OR
    // - the new value is lower than the current value
    //    (occurs when slide moves to the left) 
    if ( newVal !== value && (maxVal >= newVal || newVal < value) ) {
      setValue(newVal);
      // Calculate the total for all 5 entities in light of new value
      const newTotal = calculateTotal(newVal, row.id);
      // If new total is less than 100
      if ( newTotal <= 100 ) {
        // calculate the new table data state
        const newData = calculateData(data, row, newVal)
        // change state
        changeData(newData);
        changeTotal(newTotal);
      }
    }
  };

  return (
    <SliderTool
      aria-label="Volume"
      step={1}
      value={value}
      onChange={handleChange}
    />
  );
}
export default Slide;
