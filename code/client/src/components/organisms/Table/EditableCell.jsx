import React from 'react';
import PropTypes from 'prop-types';

function EditableCell({
   value: initialValue,
   row: { index },
   column: { id },
   updateMyData,
}) {
   const [value, setValue] = React.useState(initialValue);

   const onChange = (e) => {
      setValue(e.target.value);
   };

   const onBlur = () => {
      updateMyData(index, id, value);
   };

   // If the initialValue is changed externally, sync it up with our state
   React.useEffect(() => {
      setValue(initialValue);
   }, [initialValue]);

   return (
      <input
         value={value}
         onChange={onChange}
         onBlur={onBlur}
      />
   );
};

EditableCell.propTypes = {
   cell: PropTypes.shape({
      value: PropTypes.any.isRequired,
   }),
   row: PropTypes.shape({
      index: PropTypes.number.isRequired,
   }),
   column: PropTypes.shape({
      id: PropTypes.string.isRequired,
   }),
   updateMyData: PropTypes.func.isRequired,
};

export default EditableCell;
export {EditableCell};