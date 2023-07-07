import { Box, Typography, Pagination } from '@mui/material'
import React, { useState } from 'react'
import { MetaData } from '../models/pagination'

interface Props {
    metaData: MetaData;
    onPageChange: (page: number) => void;
}

const AppPagination = ({ metaData, onPageChange }: Props) => {
    const { currentPage, pageSize, totalCount, totalPages } = metaData;
    const [pageNumber, setPageNumber] = useState(currentPage);

    function handlePageChange(page:number) {
        setPageNumber(page);
        onPageChange(page);
    }
    
    return (
        <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Typography>
                Displaying {(currentPage - 1) * pageSize + 1} - 
                {currentPage * pageSize > totalCount 
                ? totalCount 
                : currentPage * pageSize} of {totalCount} items
            </Typography>
            <Pagination
                color='secondary'
                size='large'
                count={totalPages}
                page={pageNumber}
                onChange={(e,page)=>handlePageChange(page)}
            />
        </Box>
    )
}

export default AppPagination