import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../Home';

const RouteComponent = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    );
};

export default RouteComponent;