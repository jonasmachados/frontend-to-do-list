import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../Home';
import Project from '../Project';
import Error404 from '../Errors/Error404';

const RouteComponent = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/project/:id" element={<Project />} />
                <Route path="/*" element={<Error404 />} />
            </Routes>
        </Router>
    );
};

export default RouteComponent;