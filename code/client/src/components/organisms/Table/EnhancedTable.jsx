import React from 'react';
import PropTypes from 'prop-types';
import {
   useGlobalFilter,
   usePagination,
   useRowSelect,
   useSortBy,
   useTable,
   useFlexLayout,
} from 'react-table';

import {
   Checkbox,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   TableSortLabel,
} from '@mui/material';
import { EnhancedTableToolbar, EnhancedTableFooter, EditableCell, NormalCell } from 'components/organisms';

const IndeterminateCheckbox = React.forwardRef(
   ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef();
      const resolvedRef = ref || defaultRef;

      React.useEffect(() => {
         resolvedRef.current.indeterminate = indeterminate;
      }, [resolvedRef, indeterminate]);

      return (
         <>
            <Checkbox ref={resolvedRef} {...rest} />
         </>
      );
   }
);

// Set our editable cell renderer as the default Cell renderer

const EnhancedTable = ({
   columns,
   data,
   setData,
   updateMyData,
   skipPageReset = true,
   addButton,
   headding,
}) => {
   const tableProps = useTable(
      {
         columns,
         data,
         autoResetPage: !skipPageReset,
         updateMyData,
      },
      useGlobalFilter,
      useSortBy,
      usePagination,
      useRowSelect,
      useFlexLayout,
      (hooks) => {
         if (addButton) {
            hooks.allColumns.push((columns) => [
               {
                  id: 'selection',
                  noSortToggle: true,
                  Header: ({ getToggleAllRowsSelectedProps }) => (
                     <div>
                        <IndeterminateCheckbox
                           {...getToggleAllRowsSelectedProps()}
                        />
                     </div>
                  ),
                  // to the render a checkbox (good for some types of tables)
                  Cell: ({ row }) => (
                     <div>
                        <IndeterminateCheckbox
                           {...row.getToggleRowSelectedProps()}
                        />
                     </div>
                  ),
               },
               ...columns,
            ]);
         }
      }
   );

   const {
      getTableProps,
      headerGroups,
      prepareRow,
      page,
      preGlobalFilteredRows,
      setGlobalFilter,
      state: { selectedRowIds, globalFilter = "" },
   } = tableProps;

   const removeByIndexs = (array, indexs) =>
      array.filter((_, i) => !indexs.includes(i));

   const deleteUserHandler = (event) => {
      const newData = removeByIndexs(
         data,
         Object.keys(selectedRowIds).map((x) => parseInt(x, 10))
      );
      setData(newData);
   };

   const addUserHandler = (user) => {
      const newData = data.concat([user]);
      setData(newData);
   };

   // Render the UI for your table
   return (
      <TableContainer className="enhanced-table">
         <EnhancedTableToolbar
            numSelected={Object.keys(selectedRowIds).length}
            deleteUserHandler={deleteUserHandler}
            addUserHandler={addUserHandler}
            preGlobalFilteredRows={preGlobalFilteredRows}
            setGlobalFilter={setGlobalFilter}
            globalFilter={globalFilter}
            headding={headding}
            addButton={addButton}
         />
         <Table {...getTableProps()}>
            <TableHead>
               {headerGroups.map((headerGroup) => (
                  <TableRow {...headerGroup.getHeaderGroupProps()}>
                     {headerGroup.headers.map((column) => (
                        <TableCell
                           {...(column.noSortToggle
                              ? column.getHeaderProps()
                              : column.getHeaderProps(
                                   column.getSortByToggleProps()
                                ))}
                        >
                           {column.render('Header')}
                           {column.noSortToggle ? null : (
                              <TableSortLabel
                                 active={column.isSorted}
                                 // react-table has a unsorted state which is not treated here
                                 direction={
                                    column.isSortedDesc ? 'desc' : 'asc'
                                 }
                              />
                           )}
                        </TableCell>
                     ))}
                  </TableRow>
               ))}
            </TableHead>
            <TableBody>
               {page.map((row, i) => {
                  prepareRow(row);
                  return (
                     <TableRow {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                           return (
                              <TableCell {...cell.getCellProps()}>
                                 {cell.render('Cell')}
                              </TableCell>
                           );
                        })}
                     </TableRow>
                  );
               })}
            </TableBody>
         </Table>
         <EnhancedTableFooter tableProps={tableProps}/>
      </TableContainer>
   );
};

EnhancedTable.propTypes = {
   columns: PropTypes.array.isRequired,
   data: PropTypes.array.isRequired,
   updateMyData: PropTypes.func.isRequired,
   setData: PropTypes.func.isRequired,
};

export default EnhancedTable;
export {EnhancedTable}