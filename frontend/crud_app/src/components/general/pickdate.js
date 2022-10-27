import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import { addDays } from 'date-fns';

export default function PickDate() {
  const [value, onChange] = useState(addDays(new Date(), 1));
  
  // console.log(value.getDate());
  // console.log(value.getMonth() + 1);
  // console.log(value.getFullYear());

  return (
    <div>
      {value.getDate()}
      {value.getMonth() + 1}
      {value.getFullYear()}
      <DatePicker 
      onChange={onChange} 
      value={value} 
      minDate={addDays(new Date(), 1)} 
      maxDate={addDays(new Date(), 8*7)}
      />
      
    </div>
    
  );
}