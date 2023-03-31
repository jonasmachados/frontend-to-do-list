import ImgMain from '../SVGs/ImgMain';
import './styles.css';
import ToDoLists from '../ToDoLists';

const Home = () => {
    return (
        <div className='container-home'>
            <ToDoLists />
            <ImgMain />
        </div>
    )
}

export default Home;