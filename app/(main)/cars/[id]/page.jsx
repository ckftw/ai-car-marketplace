

const CarPage = async ({params})=>{
    //GET ID TO FETCH CAR DETAILS
    const {id} = await params;
    return(
        <div>
            Car PAge {id}
        </div>
    )
}

export default CarPage;