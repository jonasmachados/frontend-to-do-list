import ImgMain from '../SVGs/ImgMain';
import './styles.css';
import ToDoLists from '../ToDoLists';

const MainBody = () => {
    return (
        <div className='container-main-body'>
            <ToDoLists />
            <ImgMain />
        </div>
    )
}

export default MainBody;