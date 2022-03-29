import React from 'react';
import PropTypes from 'prop-types';
import {
   useGlobalFilter,
   usePagination,
   useRowSelect,
   useSortBy,
   useTable,
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
         // updateMyData isn't part of the API, but
         // anything we put into these options will
         // automatically be available on the instance.
         // That way we can call this function from our
         // cell renderer!
         updateMyData,
      },
      useGlobalFilter,
      useSortBy,
      usePagination,
      useRowSelect,
      (hooks) => {
         if (addButton) {
            hooks.allColumns.push((columns) => [
               // Let's make a column for selection
               {
                  id: 'selection',
                  // The header can use the table's getToggleAllRowsSelectedProps method
                  // to render a checkbox.  Pagination is a problem since this will select all
                  // rows even though not all rows are on the current page.  The solution should
                  // be server side pagination.  For one, the clients should not download all
                  // rows in most cases.  The client should only download data for the current page.
                  // In that case, getToggleAllRowsSelectedProps works fine.
                  Header: ({ getToggleAllRowsSelectedProps }) => (
                     <div>
                        <IndeterminateCheckbox
                           {...getToggleAllRowsSelectedProps()}
                        />
                     </div>
                  ),
                  // The cell can use the individual row's getToggleRowSelectedProps method
                  // to the render a checkbox
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
                           {...(column.id === 'selection'
                              ? column.getHeaderProps()
                              : column.getHeaderProps(
                                   column.getSortByToggleProps()
                                ))}
                        >
                           {column.render('Header')}
                           {column.id !== 'selection' ? (
                              <TableSortLabel
                                 active={column.isSorted}
                                 // react-table has a unsorted state which is not treated here
                                 direction={
                                    column.isSortedDesc ? 'desc' : 'asc'
                                 }
                              />
                           ) : null}
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