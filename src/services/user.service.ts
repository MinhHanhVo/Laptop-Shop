import getConnection from "config/database";

// create user
const handleCreateUser = async (
    name: string,
    email: string,
    address: string
) => {
    //  connect database
    const connection = await getConnection();
    // insert user vao database
    try {
        const sql = 'INSERT INTO `users`(`name`, `email`, `address`) VALUES (?, ?, ?)';
        const values = [name, email, address];

        const [result, fields] = await connection.execute(sql, values);
        return result;
    } catch (err) {
        console.log(err);
        return [];
    }
}
// delete user

const handleDeleteUser = async (id: string) => {
    //  connect database
    const connection = await getConnection();
    try {

        const sql = 'DELETE FROM `users` WHERE `id` = ? LIMIT 1';
        const values = [id];

        const [result, fields] = await connection.execute(sql, values);

        return result;
    } catch (err) {
        console.log(err);
        return [];
    }
}

// view user

const getUserById = async (id: string) => {
    //  connect database
    const connection = await getConnection();
    try {
        const sql = 'SELECT * FROM `users` WHERE `id` = ?';
        const values = [id];

        const [result, fields] = await connection.execute(sql, values);
        return result[0];
    } catch (err) {
        console.log(err);
        return [];
    }
}

// update user

const updateUserById = async (id: string, name: string, email: string, address: string) => {
    const connection = await getConnection();
    try {
        const sql = 'UPDATE `users` SET `name` = ?, `email` = ?,`address` = ? WHERE `id` = ?';
        const values = [name, email, address, id];

        const [result, fields] = await connection.execute(sql, values);
        return result;
    } catch (err) {
        console.log(err);
        return [];
    }
}

const getAllUsers = async () => {
    const connection = await getConnection();
    // A simple SELECT query
    try {
        const [results, fields] = await connection.query(
            'SELECT * FROM `users`'
        );
        return results;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export { handleCreateUser, getAllUsers, handleDeleteUser, getUserById, updateUserById };