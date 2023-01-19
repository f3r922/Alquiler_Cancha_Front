import Pagination from 'react-bootstrap/Pagination';


function AdvancedExample(props) {

	const{alquileres, alquileresPerPage, currentPage, setCurrentPage, totalAlquileres} = props

	const pages = Math.ceil(totalAlquileres/alquileresPerPage)
	console.log(`${totalAlquileres}/${alquileresPerPage} = ${pages}`)

	

	const pageNumbers = []
	for(let i = 1; i <= pages; i++ ){
		pageNumbers.push(i)
	}

	const onPreviusPage = () => {
		setCurrentPage(currentPage - 1 )
	}

	const onNextPage = () => {
		setCurrentPage(currentPage + 1 )
	}

	const onSpecificPage = (number) => {
		setCurrentPage(number)
	}


  return (
  <Pagination className='pagination_size'>
		{currentPage === 1? 
    	<Pagination.Prev onClick={onPreviusPage} disabled/> :
			<Pagination.Prev onClick={onPreviusPage} /> 
		}
			{pageNumbers.map((page) => (
				currentPage === page? 
				<Pagination.Item key={page} active onClick={() => onSpecificPage(page)}>{page}</Pagination.Item> :
				<Pagination.Item key={page} onClick={() => onSpecificPage(page)}>{page}</Pagination.Item>
			))}
		{ currentPage >= pages?
		<Pagination.Next onClick={onNextPage} disabled/>  :
		<Pagination.Next onClick={onNextPage}/>
		}
  </Pagination>
  );
}

export default AdvancedExample;