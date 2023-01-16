import React, { useEffect } from 'react'
import st from './ProductsList.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { editProductActiveProp, getClothesAdmin } from '../../../redux/actions'
import { DataGrid } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'
import formulario from "../Assets/formulario.png"


export default function ProductsList({setLoad, load}) {
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getClothesAdmin())
    }, [getClothesAdmin])

    const allItems = useSelector((state) => state.allClothes)

    function handleActive (e, product) {
        dispatch(editProductActiveProp(product.idProd, !product.active))
        console.log(product)
        setLoad(!load)
    }
    


    // console.log('SOY TODOS LOS PRODUCTOS: ', allItems)

    const columns = [
        { field: 'id', headerName: 'ID', width: 92 },
        // { field: 'image', headerName: 'Image', width: 120, renderCell: (params)=>{
        //   return (
        //     <div className={st.productListItem}>
        //       <img classname={st.productListImg} src={params.row.pic} alt='' />
        //       {params.row.name}
        //     </div>
        //   )
        // }},
        { field: 'idProd', headerName: 'Prod. ID', width: 135 },
        { field: 'name', headerName: 'Name', width: 180 },
        { field: 'brand', headerName: 'Brand', width: 130 },
        { field: 'category', headerName: 'Category', width: 135 },
        { field: 'active', headerName: 'Active', width: 117 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 125,
            renderCell: (params) => {
                return (
                    <>
                        <button  className={st.productListEdit} onClick={(e) => handleActive(e, params.row)}>
                            Enable/Disable
                        </button>
                        
                    </>
                )
            },
        },
    ]

    const itemsRows = allItems.map((it, index) => ({
        id: index + 1,
        idProd: it._id,
        name: it.name,
        brand: it.brand,
        category: it.category,
        active: it.active,
    }))

    // <div className={st.userTitleContainer}>
    //   <Link to='/adminView/newUser'>
    //     <button className={st.userAddButton}>Create</button>
    //   </Link>
    // </div>

    return (
        <div className={st.productList}>

            <DataGrid
                rows={itemsRows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                disableSelectionOnClick
            />
            <div className={st.productButtonContainer}>
                <Link to="/admin/newproduct">
                    <img src={formulario} className={st.IconFormulario} alt='Logo'/>
                </Link>
            </div>
        </div>
    )
}