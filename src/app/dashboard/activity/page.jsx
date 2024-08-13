'use client'

import { useAuth } from '@/context/AuthContext';
import { useTransaction } from '@/context/TransactionContext';
import { formatDate } from '@/utils/funcionalidades';
import { formatCurrency } from '@/utils/funcionalidades';
import React, { useEffect, useState, useMemo } from 'react'
import { BiTransfer } from "react-icons/bi";
import Skeleton from 'react-loading-skeleton';
import ReactPaginate from 'react-paginate';

const MovementsPage = () => {
    const { getMoves, moves } = useTransaction();
    const { loading } = useAuth()
    const [filterPeriod, setFilterPeriod] = useState('');
    const [filterType, setFilterType] = useState('');
    const [selectedButton, setSelectedButton] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [buttonDate, setButtonDate] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [rangeValue, setRangeValue] = useState(90000);
    const itemsPerPage = 10;

    const [expandedId, setExpandedId] = useState(null);

    const handleDetails = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    useEffect(() => {
        getMoves();
    }, []);

    const handleFilterPeriod = (period, index) => {
        if (filterPeriod === period) {
            setFilterPeriod('');
            setSelectedButton(null);
        } else {
            setFilterPeriod(period);
            setSelectedButton(index);
        }
    };

    const handleFilterType = (e) => {
        setFilterType(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchText(e.target.value.toLowerCase());
    };

    const handleButton = () => {
        setButtonDate(!buttonDate);
    };

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const handleRangeChange = (e) => {
        setRangeValue(Number(e.target.value));
    };

    const resetFilters = () => {
        setFilterPeriod('');
        setFilterType('');
        setSelectedButton(null);
        setSearchText('');
        setButtonDate(true);
        setCurrentPage(0);
        setRangeValue(90000);
    };

    const filteredMovements = useMemo(() => {
        return moves
            .filter(mov => {
                const now = new Date();
                const movDate = new Date(mov.date);

                let periodMatch = true;
                switch (filterPeriod) {
                    case 'hoy':
                        periodMatch = movDate.toDateString() === now.toDateString();
                        break;
                    case 'ayer':
                        const yesterday = new Date(now);
                        yesterday.setDate(now.getDate() - 1);
                        periodMatch = movDate.toDateString() === yesterday.toDateString();
                        break;
                    case 'última semana':
                        const lastWeek = new Date(now);
                        lastWeek.setDate(now.getDate() - 7);
                        periodMatch = movDate >= lastWeek;
                        break;
                    case 'últimos 15 días':
                        const last15Days = new Date(now);
                        last15Days.setDate(now.getDate() - 15);
                        periodMatch = movDate >= last15Days;
                        break;
                    case 'último mes':
                        const lastMonth = new Date(now);
                        lastMonth.setMonth(now.getMonth() - 1);
                        periodMatch = movDate >= lastMonth;
                        break;
                    case 'últimos 3 meses':
                        const last3Months = new Date(now);
                        last3Months.setMonth(now.getMonth() - 3);
                        periodMatch = movDate >= last3Months;
                        break;
                    default:
                        break;
                }

                let typeMatch = true;
                if (filterType) {
                    if (filterType === 'Ingresos') {
                        typeMatch = ['transfer_received', 'payment_received', 'deposit_completed'].includes(mov.type);
                    } else if (filterType === 'Egresos') {
                        typeMatch = ['transfer_sent', 'payment_sent'].includes(mov.type);
                    }
                }

                let searchMatch = true;
                if (searchText) {
                    searchMatch = mov.details.toLowerCase().includes(searchText);
                }

                let rangeMatch = mov.amount <= rangeValue;

                return periodMatch && typeMatch && searchMatch && rangeMatch;
            })
            .sort((a, b) => {
                if (buttonDate) {
                    return new Date(b.date) - new Date(a.date); // Ordenar de más reciente a más antiguo
                }
                return new Date(a.date) - new Date(b.date); // Ordenar de más antiguo a más reciente
            });
    }, [moves, filterPeriod, filterType, searchText, buttonDate, rangeValue]);

    const paginatedMovements = useMemo(() => {
        const startIndex = currentPage * itemsPerPage;
        return filteredMovements.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredMovements, currentPage]);

    return (
        <div className='text-white pb-8'>
            <h2 className='text-center text-2xl font-semibold mt-3 mb-1 lg:my-3'> Movimientos </h2>

            <section className='flex flex-row gap-2 py-2 w-full '>
                <input
                    placeholder='Buscar movimiento'
                    onChange={handleSearchChange}
                    value={searchText}
                    className='p-2 rounded-md bg-slate-950 border border-gray-700 w-[80%] mx-auto'
                />
            </section>

            <section className=' w-[80%] mx-auto flex flex-row flex-wrap justify-center gap-2 py-2'>
                {['hoy', 'ayer', 'última semana', 'últimos 15 días', 'último mes', 'últimos 3 meses'].map((period, index) => (
                    <h6
                        key={index}
                        className={`text-greenlime  text-sm md:text-base rounded-md w-[160px] text-center cursor-pointer ${selectedButton === index ? 'bg-greenlime text-lime-950' : 'bg-slate-950'} border border-greenlime py-1 transition-all duration-500`}
                        onClick={() => handleFilterPeriod(period, index)}
                    >
                        {period.charAt(0).toUpperCase() + period.slice(1)}
                    </h6>
                ))}
            </section>

            <section className='flex flex-row gap-x-2 w-[90%] mx-auto justify-center mt-2 '>
                <select name="typeFilter" id="typeFilter" className='bg-gray-950 border rounded-lg text-xs md:text-base border-greenlime text-greenlime p-2 outline-none' onChange={handleFilterType}>
                    <option value="">Elije una opción</option>
                    <option value="Ingresos">Ingresos</option>
                    <option value="Egresos">Egresos</option>
                </select>

                <div onClick={handleButton} className={`flex flex-row items-center rounded-lg gap-x-2 ${buttonDate ? "bg-slate-950 text-greenlime" : " bg-greenlime text-lime-950"} text-greenlime cursor-pointer border border-lime-500 py-1 px-3`} >
                    <BiTransfer className={` text-2xl ${buttonDate ? "-rotate-90 text-greenlime" : "rotate-90"} transition-all duration-200`} />
                    <h3 className='text-xs md:text-base'> {buttonDate ? "Más recientes" : "Mas Antiguos"} </h3>
                </div>
            </section>

            <div className='w-full flex flex-col justify-center items-center'>
                <input
                    type="range"
                    min="0"
                    max="90000"
                    step="1000"
                    value={rangeValue}
                    onChange={handleRangeChange}
                    className='range w-[80%] mx-auto my-2 md:my-4 bg-red-500 '
                />
                <span className='text-greenlime text-xs mb-2 md:text-lg'>{`Movimientos menores a  $${rangeValue}`}</span>
                <button className='bg-greenlime p-2 rounded-md text-lime-950 font-semibold border border-transparent hover:bg-slate-300 hover:text-gray-950 hover:border-gray-950 transition-all duration-100 text-sm ' onClick={resetFilters}> Resetear Filtros </button>
            </div>
            {loading ? <Skeleton variant="rect" width={"100%"} height={400} animation="wave" baseColor="#111827" highlightColor="#374151" borderRadius="0.25rem" /> : (
                <section className='w-[90%] mx-auto flex flex-col gap-y-2 h-[400px] overflow-hidden overflow-y-scroll py-2 mt-4 relative pt-4'>
                    {paginatedMovements.map((movimiento, i) => (
                        <article
                            key={i}
                            className={`flex flex-col bg-slate-800 p-3 rounded-md transition-all duration-200 text-xs md:text-sm ${expandedId === movimiento._id ? "pb-2" : ""}`}
                            onClick={() => handleDetails(movimiento._id)}
                        >
                            <div className='flex flex-row justify-between items-center w-full'>
                                <div className='flex flex-row items-center gap-x-2'>
                                    <div className={`h-3 w-3 ${['deposit_completed', 'transfer_received', 'payment_received'].includes(movimiento.type) ? "bg-lime-500" : "bg-red-500"} rounded-full `} />
                                    <h6 className={`transition-all duration-300 ${(expandedId === movimiento._id) ? "text-greenlime" : ""}`}>{movimiento?.details}</h6>
                                </div>
                                <div className='flex flex-col'>
                                    <h6>{formatDate(movimiento?.date)}</h6>
                                    <h6>${formatCurrency(movimiento?.amount)}</h6>
                                </div>
                            </div>

                            {expandedId === movimiento._id && (
                                <div>
                                    <h4>{movimiento?.type}</h4>
                                    <h4>Numero de operacion: {movimiento._id}</h4>
                                </div>
                            )}
                        </article>
                    ))}
                </section>
            )}


            <div className='w-[90%] mx-auto flex flex-row justify-center mt-4'>
                <ReactPaginate
                    previousLabel={'Anterior'}
                    nextLabel={'Siguiente'}
                    breakLabel={'...'}
                    pageCount={Math.ceil(filteredMovements.length / itemsPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                    disabledClassName={'disabled'}
                    className='flex flex-row gap-x-3'
                />
            </div>
        </div>
    )
}

export default MovementsPage;