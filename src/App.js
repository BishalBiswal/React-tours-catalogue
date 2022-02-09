import React, { useState, useEffect } from 'react'
import Loading from './loading';
import Tours from './Tours';
import './App.css';
const url = 'https://course-api.com/react-tours-project';

const App = () => {
    const [loading, setLoading] = useState(false);
    const [tours, setTours] = useState([]);
    const removeTour = (id) => {
        const newTours = tours.filter((tour) => tour.id !== id);
        setTours(newTours);
    };
    const fetchTours = async () => {
        setLoading(true);
        try {
            const response = await fetch(url);
            const tours = await response.json();
            setLoading(false)
            setTours(tours)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }

    }
    useEffect(() => {
        fetchTours();
    }, []);
    if (loading) {
        return (
            <main>
                <Loading />
            </main>
        )
    }
    if (tours.length === 0) {
        return (
            <>
                <div className='title'>
                    <h2>No tours left</h2>
                    <button onClick={fetchTours} className="btn">Refresh</button>
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <Tours tours={tours} removeTour={removeTour} />
            </>
        )
    }
}

export default App;
