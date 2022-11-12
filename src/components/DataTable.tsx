import React, { useEffect, useState } from "react";
import { useTable } from 'react-table'
import { FunctionComponent } from "react";
import { Post } from "../interface/Post.object";

import "./Table.css"

interface DataTableProps {
    datas: any[]
    columnsDefine: any[]
}

const DataTable: FunctionComponent<DataTableProps> = (props) => {
    const [data, setData] = useState<any[]>([])


    useEffect(() => {
        setData(props.datas)
        // eslint-disable-next-line
    })

    // eslint-disable-next-line
    const columns = React.useMemo(() => props.columnsDefine, []) 

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data })
    return (
        <>
            <table {...getTableProps()} className="table table-hover">
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th
                                    {...column.getHeaderProps()}
                                >
                                    {column.render('Header')}

                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    );
}

export default DataTable;