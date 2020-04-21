import React, {useEffect} from "react";
import {useFilters, useSortBy, useTable} from 'react-table';
import matchSorter from 'match-sorter';
import {useDispatch, useSelector} from 'react-redux';

import {
	Table,
	TableBody,
	TableData,
	TableHeader,
	TableHeaderRow,
	TableHeaderWrapper,
	TableRow,
} from "../../styles/Tables";
import {categoriesFunction} from '../../store/actions/Categories/categoriesAction';
import styled from 'styled-components';
import {organisationsFunction} from '../../store/actions/Organisations/organisationsAction';

const Title = styled.div`
padding: 10px;
`;

function fuzzyTextFilterFn(rows, id, filterValue) {
	return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Define a default UI for filtering
function DefaultColumnFilter({
															 column: { filterValue, preFilteredRows, setFilter },
														 }) {
	const count = preFilteredRows.length

	return (
		<input
			value={filterValue || ''}
			onChange={e => {
				setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
			}}
			// placeholder={`Search ${count} records...`}
		/>
	)
}


function SelectColumnFilter({
															column: { filterValue, setFilter, preFilteredRows, id },
														}) {
	// Calculate the options for filtering
	// using the preFilteredRows
	const options = React.useMemo(() => {
		const options = new Set()
		preFilteredRows.forEach(row => {
			options.add(row.values[id])
		})
		return [...options.values()]
	}, [id, preFilteredRows])

	// Render a multi-select box
	return (
		<select
			value={filterValue}
			onChange={e => {
				setFilter(e.target.value || undefined)
			}}
		>
			<option value="">All</option>
			{options.sort((a, b) => a - b).map((option, i) => (
				<option key={i} value={option}>
					{option}
				</option>
			))}
		</select>
	)
}

export default () => {
	const dispatch = useDispatch()
	const organisations = useSelector(state => state.organisations)
	const tableOrganisations = React.useMemo(() => {
		return organisations.map(org => ({
			...org,
			categories: ("categories" in org) ? org.categories.map(cat => cat.name).join(', ') : "",
		}))
	}, [organisations])

	useEffect(() => {
		dispatch(organisationsFunction())
		dispatch(categoriesFunction())
	}, [dispatch])


	const columns = React.useMemo(
		() => [
			{
				Header: 'Id',
				accessor: 'id',
				filter: 'fuzzyText',
				Filter: SelectColumnFilter,
				width: 20
			},
			{
				Header: 'Name',
				accessor: 'name',
				filter: 'fuzzyText',
			},
			{
				Header: 'Categories',
				accessor: 'categories',
			},
			{
				Header: 'Tag',
				accessor: 'tag',
				filter: 'fuzzyText',
			},
		],
		[]
	)

	const filterTypes = React.useMemo(
		() => ({
			// Add a new fuzzyTextFilterFn filter type.
			fuzzyText: fuzzyTextFilterFn,
			// Or, override the default text filter to use
			// "startWith"
			text: (rows, id, filterValue) => {
				return rows.filter(row => {
					const rowValue = row.values[id]
					return rowValue !== undefined
						? String(rowValue)
							.toLowerCase()
							.startsWith(String(filterValue).toLowerCase())
						: true
				})
			},
		}),
		[]
	)

	const defaultColumn = React.useMemo(
		() => ({
			// Let's set up our default Filter UI
			Filter: DefaultColumnFilter,
		}),
		[]
	)
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = useTable({
		columns,
		data: tableOrganisations,
		defaultColumn, // Be sure to pass the defaultColumn option
		filterTypes,
	},
		useFilters,
		useSortBy);

	return <div>

		<Table {...getTableProps()}>
			<TableHeaderWrapper>
			{headerGroups.map(headerGroup => (
				<TableHeaderRow {...headerGroup.getHeaderGroupProps()}>
					{headerGroup.headers.map(column => (
						<TableHeader>
						<Title {...column.getHeaderProps(column.getSortByToggleProps())}>
							{column.render('Header')}
						</Title>
							{column.canFilter ? column.render('Filter') : null}
						</TableHeader>
					))}
				</TableHeaderRow>
			))}
			</TableHeaderWrapper>
			<TableBody {...getTableBodyProps()}>
			{rows.map((row, i) => {
				prepareRow(row)
				return (
					<TableRow {...row.getRowProps({onClick: () => console.log(row.values.id)})}>
						{row.cells.map(cell => {
							return <TableData  {...cell.getCellProps()}>{cell.render('Cell')}</TableData>
						})}
					</TableRow>
				)
			})}
			</TableBody>
		</Table>
	</div>
}