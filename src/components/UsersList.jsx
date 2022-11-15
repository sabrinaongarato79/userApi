import UserItem from './UserItem'

const UsersList = ({data, setInfoUpdate, setShowForm, getListUser}) => {

    return <div className='user-list'>
        {
            data.map( item => {
                return <UserItem key={item.id} 
                info={item} 
                setInfoUpdate={setInfoUpdate} 
                setShowForm={setShowForm} 
                getListUser={getListUser}
                />
            })
        }
</div> 
}

export default UsersList;