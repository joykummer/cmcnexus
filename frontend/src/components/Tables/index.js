import React, {useEffect} from "react";
import {useFilters, useSortBy, useTable} from 'react-table';
import matchSorter from 'match-sorter';
import {useDispatch, useSelector} from 'react-redux';
import {casesFunction} from '../../store/actions/Cases/casesAction';
import {useHistory} from 'react-router-dom';
import {
	Table,
	TableBody,
	ReactTableData,
	TableHeader,
	TableHeaderRow,
	TableHeaderWrapper,
	TableRow,
} from "../../styles/Tables";
import {categoriesFunction} from '../../store/actions/Categories/categoriesAction';
import styled from 'styled-components';
import {FilterInput} from "../../styles/Inputs";

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
		<FilterInput
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
		const options = new Set();
		preFilteredRows.forEach(row => {
			options.add(row.values[id])
		})
		return [...options.values()]
	}, [id, preFilteredRows]);

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

function SelectCategoriesFilter({
																	column: { filterValue, setFilter, preFilteredRows, id },
																}) {
	// Calculate the options for filtering
	// using the preFilteredRows
	const options = useSelector(state => state.categories).filter((c) => c.id !== 0).map(cat => cat.name);

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

function SelectStatusFilter({
																	column: { filterValue, setFilter, preFilteredRows, id },
																}) {
	// Calculate the options for filtering
	// using the preFilteredRows

	const user = useSelector(state => state.auth.user);
	const partnerships = Boolean(user && user.organisation)
		? user.organisation.partnered_cases : null;

	const case_statuses = useSelector(state => state.cases).map(casee => casee.status);
	const partnership_statuses = partnerships.map(partnership => partnership.status);

	const statuses = partnerships ? partnership_statuses : case_statuses;

	const options = React.useMemo(() => {
		const options = new Set(statuses);
		return [...options.values()]
	}, [id, preFilteredRows]);

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

function getSafe(fn, defaultVal) {
    try {
        return fn();
    } catch (e) {
        return defaultVal;
    }
}

export default () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const cases = useSelector(state => state.cases);
	const user = useSelector(state => state.auth.user);
  	const partnerships = Boolean(user && user.organisation)
      ? user.organisation.partnered_cases : null;
  const getStatus = singleCase => partnerships ?
	  getSafe(() => partnerships.find(cse => cse.case === singleCase.id).status)
	  : singleCase.status;
	const tableCases = React.useMemo(() => {
		return cases.map(singleCase => ({
			...singleCase,
			status: getStatus(singleCase),
			categories: ("categories" in singleCase) ? singleCase.categories.map(cat => cat.name).join(', ') : "",
		}))
	}, [cases])

	useEffect(() => {
		dispatch(casesFunction())
		dispatch(categoriesFunction())
	}, [dispatch])


	const columns = React.useMemo(
		() => [
			{
				Header: 'Id',
				accessor: 'id',
				filter: 'fuzzyText',
				Filter: SelectColumnFilter,
				width: 20,
			},
			{
				Header: 'Title',
				accessor: 'title',
				filter: 'fuzzyText',
			},
			{
				Header: 'Status',
				accessor: 'status',
				filter: 'fuzzyText',
				Filter: SelectStatusFilter,
			},
			{
				Header: 'Country',
				accessor: 'country',
				filter: 'fuzzyText',
			},
			{
				Header: 'Categories',
				accessor: 'categories',
				Filter: SelectCategoriesFilter,
			},
		],
		[]
	)

	const data = React.useMemo(() => Array.from(Array(20)).map(() => ({
		'one': Math.floor(Math.random() * 100),
		'two': Math.floor(Math.random() * 100),
		'three': Math.floor(Math.random() * 100),
		'four': "word".repeat(Math.floor(Math.random() * 3)),
	})), [])

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
		data: tableCases,
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
					<TableRow {...row.getRowProps({onClick: () => history.push(`details/${row.values.id}/`)})}>
						{row.cells.map(cell => {
							return <ReactTableData  {...cell.getCellProps()} >{cell.render('Cell')}</ReactTableData>
						})}
					</TableRow>
				)
			})}
			</TableBody>
		</Table>
	</div>
}