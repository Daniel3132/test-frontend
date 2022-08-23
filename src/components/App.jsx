import React, { useEffect, useState } from 'react'
import './App.scss'
import arrowDown from '../assets/chevron-down.png'
import arrowUp from '../assets/chevron-up.png'

const App = () => {
    const url = 'http://127.0.0.1:8888/api/fruits';

    const [Frutas, setFrutas] = useState([]); //Array de frutas completo
    const [FrutasFilter, setFrutasFilter] = useState([]); //Array de frutas filtrado para no perder el completo al hacer filter
    const [Arrow, setArrow] = useState(arrowDown); //cambiar la flecha (arriba - abajo)
    const [Titulo, setTitulo] = useState(''); //titulo dinamico cargado desde la Api
    const [Busqueda, setBusqueda] = useState(''); //input de busqueda
    const [HideList, setHideList] = useState(true); //controlar si se muestra o no, la lista


    const handleInputChange = (e) => {
        const busqueda = e.target.value;
        setBusqueda(busqueda); //controlar el input
        if (busqueda !== '') {
            //filtrar segun la busqueda 
            const filtro = Frutas.filter(fruta => fruta.toLowerCase().includes(busqueda.toLowerCase())); 
            setFrutasFilter(filtro)
        }
    }

    useEffect(() => {
        const getData = async () => { //peticion a la api para cargar los datos
            const resp = await fetch(url);
            const data = await resp.json();
            setTitulo(data.data.description);
            setFrutas(data.data.fruits);
            setFrutasFilter(data.data.fruits)
        }
        getData();
    }, [])


    const displayList = () => {
        setHideList(!HideList) // cambiar entre ocultar y mostrar la lista
        Arrow === arrowDown ? setArrow(arrowUp) : setArrow(arrowDown); //cambiar la posicion de la flecha
    }

    const capitalize = (string) => { //devolver el string con la primera letra mayuscula
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    return (
        <>
            <h1 id='title'>{Titulo}</h1>
            <div className='mainCont'>
                <div className='searchCont'>
                    <input onChange={handleInputChange} onClick={() => setHideList(false)} value={Busqueda} type="text" placeholder='Select an item' />
                    <button onClick={displayList}>
                        <img src={Arrow} alt="" />
                    </button>
                </div>
                {
                    <div className='fruitsCont' hidden={HideList}>
                        {FrutasFilter.map((fruta, index) =>
                            index < 7 ? //desplegar maximo 7 elementos
                                <option onClick={() => setBusqueda(capitalize(fruta))} name='fruta' key={index}>{capitalize(fruta)}</option>
                                : ''
                        )}
                        {/* si no hay elementos entonces mostrar el mensaje de no encontrado */}
                        {FrutasFilter.length === 0 ? <option disabled>No items were found.</option> : ''}
                    </div>
                }
            </div>
        </>
    )
}

export default App