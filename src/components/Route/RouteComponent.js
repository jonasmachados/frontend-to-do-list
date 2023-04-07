import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../Home';
import Project from '../Project';

const RouteComponent = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/project/:id" element={<Project />} />
            </Routes>
        </Router>
    );
};

export default RouteComponent;